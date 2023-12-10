const { Message } = require('../../db/models');

exports.createMessage = async (messageData) => {
  try {
    const newMessage = await Message.create(messageData);
    return { success: true, data: newMessage };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error creating the message',
    };
  }
};

exports.getMessagesByRequestId = async (requestId) => {
  const messages = await Message.findAll({
    where: {
      serviceRequestId: requestId,
    },
  });
  if (messages) {
    return { success: true, data: messages };
  }
  return {
    success: false,
    statusCode: 404,
    message: 'Messages not found',
  };
};
