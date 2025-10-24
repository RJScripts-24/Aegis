const mongoose = require('mongoose');

/**
 * GeoJSON Schema for the 'location' field.
 * This ensures that the 'location' field conforms to the GeoJSON Point specification.
 */
const geoJsonPointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true,
  },
});

const incidentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: {
      values: ['Flood', 'Fire', 'Traffic', 'Medical', 'Other'], // Added a few more common types
      message: '{VALUE} is not a supported incident type.',
    },
    required: [true, 'Incident type is required.'],
    trim: true,
  },
  location: {
    type: geoJsonPointSchema,
    required: [true, 'A GeoJSON location is required.'],
  },
  status: {
    type: String,
    enum: ['Pending', 'Acknowledged', 'Resolved'],
    default: 'Pending',
  },
  photoURL: {
    type: String, // URL from Cloudinary or Twilio
    trim: true,
    default: null,
  },
}, {
  // Automatically add 'createdAt' and 'updatedAt' fields
  timestamps: true,
});

// Create a 2dsphere index on the location field for efficient geospatial queries
incidentSchema.index({ location: '2dsphere' });

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;