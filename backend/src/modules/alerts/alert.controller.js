const alertService = require('./alert.service');
// Assuming you have utility handlers in this location
const { asyncHandler, ApiResponse, ApiError } = require('../../utils/helpers'); 

/**
 * @desc    Get all active alerts for the public map
 * @route   GET /api/alerts
 * @access  Public
 */
const getAlerts = asyncHandler(async (req, res) => {
  // The service handles the database query
  const alerts = await alertService.getAllPublicAlerts();
  
  return res.status(200).json(
    new ApiResponse(200, alerts, 'Active alerts retrieved successfully')
  );
});

/**
 * @desc    Create and broadcast a new alert
 * @route   POST /api/alerts
 * @access  Admin (JWT Protected)
 */
const createAlert = asyncHandler(async (req, res) => {
  const { title, message, area } = req.body;

  // --- Basic Validation ---
  if (!title || !message) {
    throw new ApiError(400, 'Title and message are required.');
  }

  if (!area || !area.type || area.type !== 'Polygon' || !area.coordinates) {
    throw new ApiError(400, 'A valid GeoJSON Polygon object is required for the "area" field.');
  }
  // --- End Validation ---

  // The alertService will handle:
  // 1. Saving the alert to the database
  // 2. Emitting the 'new-alert' event via Socket.io
  // 3. Triggering the Twilio SMS blast via the SmsService
  const newAlert = await alertService.createAndBroadcastAlert({ title, message, area });

  return res.status(201).json(
    new ApiResponse(201, newAlert, 'Alert created and broadcasted successfully')
  );
});

module.exports = {
  getAlerts,
  createAlert,
};