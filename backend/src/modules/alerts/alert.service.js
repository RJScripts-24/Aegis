const Alert = require('./alert.model');
const { getSocket } = require('../../services/socket');
const { sendAlertSms } = require('../../services/sms'); // Assuming sms.js exports this function

/**
 * @desc    Fetches all alerts from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of alert documents.
 */
const getAllPublicAlerts = async () => {
  try {
    // Find all alerts, sort by newest first
    const alerts = await Alert.find({}).sort({ createdAt: -1 });
    return alerts;
  } catch (error) {
    // In a real app, you'd have more robust error logging here
    console.error('Error fetching alerts:', error);
    throw new Error('Could not retrieve alerts.');
  }
};

/**
 * @desc    Saves a new alert to the DB, emits it via socket, and triggers an SMS blast.
 * @param {object} alertData - The alert data ({ title, message, area }).
 * @returns {Promise<object>} A promise that resolves to the newly created alert document.
 */
const createAndBroadcastAlert = async (alertData) => {
  try {
    // 1. Save the new Alert to the database
    const newAlert = await Alert.create(alertData);

    // 2. Emit a 'new-alert' event via Socket.io to the 'Public' room
    const io = getSocket();
    if (io) {
      io.to('Public').emit('new-alert', newAlert);
    } else {
      console.warn('Socket.io instance not available.');
    }

    // 3. Asynchronously trigger the Twilio SMS service
    // We don't need to 'await' this. Let it run in the background.
    sendAlertSms(newAlert.message)
      .catch(err => {
        // Log the error if the SMS blast fails, but don't block the HTTP response
        console.error('Error triggering SMS blast:', err);
      });

    return newAlert;

  } catch (error) {
    console.error('Error creating alert:', error);
    if (error.name === 'ValidationError') {
      throw new Error(error.message);
    }
    throw new Error('Could not create alert.');
  }
};

module.exports = {
  getAllPublicAlerts,
  createAndBroadcastAlert,
};