const Incident = require('./incident.model');
const { uploadImage } = require('../../services/cloudinary'); // Assumes cloudinary.js exports 'uploadImage'
const { getSocket } = require('../../services/socket');
const { asyncHandler, ApiResponse, ApiError } = require('../../utils/helpers');
const fs = require('fs'); // To unlink temporary files

/**
 * @desc    Submit a new incident report (with optional photo)
 * @route   POST /api/incidents
 * @access  Public
 */
const createIncident = asyncHandler(async (req, res) => {
  const { type, location } = req.body;

  // --- 1. Validation ---
  if (!type || !location) {
    throw new ApiError(400, 'Incident type and location are required.');
  }

  // --- 2. Parse Location ---
  // A common pattern for multipart/form-data is to send complex
  // objects like GeoJSON as a JSON string.
  let parsedLocation;
  try {
    parsedLocation = JSON.parse(location);
    if (!parsedLocation.type || parsedLocation.type !== 'Point' || !parsedLocation.coordinates) {
      throw new Error(); // Trigger the catch block
    }
  } catch (error) {
    throw new ApiError(400, 'Invalid "location" format. Must be a valid, stringified GeoJSON Point object.');
  }

  // --- 3. Handle File Upload ---
  let photoURL = null;
  if (req.file) {
    try {
      // 'req.file.path' is the temporary path from multer
      const uploadResult = await uploadImage(req.file.path);
      photoURL = uploadResult.secure_url;
      
      // Clean up the temporarily stored file
      fs.unlinkSync(req.file.path);
    } catch (uploadError) {
      // Clean up the file even if upload fails
      if (req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      console.error('Cloudinary upload error:', uploadError);
      throw new ApiError(500, 'Error uploading image. Please try again.');
    }
  }

  // --- 4. Create Incident in DB ---
  const newIncident = await Incident.create({
    type,
    location: parsedLocation,
    photoURL,
    status: 'Pending', // Default status as per spec
  });

  // --- 5. Emit Socket.io Event ---
  const io = getSocket();
  if (io) {
    // Send to the 'Admin' room/namespace
    io.to('Admin').emit('new-incident', newIncident);
  }

  // --- 6. Send Response ---
  return res.status(201).json(
    new ApiResponse(201, newIncident, 'Incident reported successfully.')
  );
});

/**
 * @desc    Get public incidents (Acknowledged or Resolved)
 * @route   GET /api/incidents
 * @access  Public
 */
const getPublicIncidents = asyncHandler(async (req, res) => {
  const incidents = await Incident.find({
    status: { $in: ['Acknowledged', 'Resolved'] }
  }).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, incidents, 'Public incidents retrieved successfully.')
  );
});

/**
 * @desc    Get all incidents for the admin dashboard
 * @route   GET /api/admin/incidents
 * @access  Admin (JWT Protected)
 */
const getAllIncidents = asyncHandler(async (req, res) => {
  // Sort by status first (Pending > Acknowledged > Resolved), then by most recent
  const incidents = await Incident.find({}).sort({ status: 1, createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, incidents, 'All incidents retrieved for admin.')
  );
});

/**
 * @desc    Update an incident's status
 * @route   PUT /api/incidents/:id
 * @access  Admin (JWT Protected)
 */
const updateIncidentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // --- 1. Validation ---
  const validStatuses = ['Pending', 'Acknowledged', 'Resolved'];
  if (!status || !validStatuses.includes(status)) {
    throw new ApiError(400, `Invalid status. Must be one of: ${validStatuses.join(', ')}`);
  }

  // --- 2. Database Update ---
  const updatedIncident = await Incident.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!updatedIncident) {
    throw new ApiError(404, 'Incident not found.');
  }

  // --- 3. Emit Socket.io Event ---
  const io = getSocket();
  if (io) {
    // Send to the 'Public' room/namespace
    io.to('Public').emit('incident-updated', {
      id: updatedIncident._id,
      newStatus: updatedIncident.status,
    });
  }

  // --- 4. Send Response ---
  return res.status(200).json(
    new ApiResponse(200, updatedIncident, 'Incident status updated successfully.')
  );
});

module.exports = {
  createIncident,
  getPublicIncidents,
  getAllIncidents,
  updateIncidentStatus,
};