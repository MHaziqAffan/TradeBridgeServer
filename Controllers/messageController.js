const Message = require('../Models/Message');
const User = require('../Models/User'); // Import the User model if not already imported

// Function to fetch messages between sender and receiver IDs
const getMessages = async (senderId, receiverId) => {
  try {
    // Fetch messages from the database based on sender and receiver IDs
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    })
    .sort({ createdAt: 1 }) // Sort messages by createdAt timestamp
    .populate('senderId', 'companyName'); // Populate the receiverId field with companyName from the User model
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Error fetching messages');
  }
};

module.exports = {
  getMessages
};
