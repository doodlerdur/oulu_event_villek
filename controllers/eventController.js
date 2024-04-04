// Import pg library
const { Pool } = require('pg');

// Initialize PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'event_management',
  port: 5432,
});

// Function to add a user to an event
const joinEvent = async (req, res) => {
  // Check if req.body is defined and contains the expected properties
  if (!req.body || !req.body.userId || !req.body.eventId) {
    return res.status(400).json({ success: false, message: 'Request body is missing userId or eventId' });
  }

  // Destructure userId and eventId from req.body
  const { userId, eventId } = req.body;
  
  try {
    // Add user to event participants array
    await pool.query('UPDATE events SET participants = array_append(participants, $1) WHERE id = $2', [userId, eventId]);
    res.status(200).json({ success: true, message: 'User joined event successfully' });
  } catch (error) {
    console.error('Error joining event:', error);
    res.status(500).json({ success: false, message: 'Failed to join event' });
  }
}

// Function to remove a user from an event
const leaveEvent = async (req, res) => {
  // Check if req.body is defined and contains the expected properties
  if (!req.body || !req.body.userId) {
    return res.status(400).json({ success: false, message: 'Request body is missing userId' });
  }

  const { userId } = req.body;
  const eventId = req.params.eventId;

  try {
    // Remove user from event participants array
    await pool.query('UPDATE events SET participants = array_remove(participants, $1) WHERE id = $2', [userId, eventId]);
    res.status(200).json({ success: true, message: 'User left event successfully' });
  } catch (error) {
    console.error('Error leaving event:', error);
    res.status(500).json({ success: false, message: 'Failed to leave event' });
  }
}

module.exports = {
  joinEvent,
  leaveEvent,
};