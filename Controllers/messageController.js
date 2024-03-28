const Message = require('../Models/Message');
const User = require('../Models/User'); // Import the User model if not already imported

const getMessages = async (senderId, receiverId) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    })
    .sort({ createdAt: 1 }) // Sort messages by createdAt timestamp
    .populate('senderId', 'companyName'); 
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Error fetching messages');
  }
};

module.exports = {
  getMessages
};
