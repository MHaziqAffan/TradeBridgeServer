const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/messageController');

// Route to fetch messages between sender and receiver IDs
router.get('/:senderId/:receiverId', async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    // Call the controller function to fetch messages
    const messages = await messageController.getMessages(senderId, receiverId);
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

module.exports = router;
