const messageService = require('../services/messageService');

exports.createMessage = async (req, res) => {
  try {
    const messageData = req.body;
    const result = await messageService.createMessage(messageData);
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating Message' });
  }
};

exports.getMessagesByRequestId = async (req, res) => {
  const requestId = req.params.id;
  try {
    const result = await messageService.getMessagesByRequestId(requestId);

    if (result.success) {
      res.status(200).json({ info: result.data });
    } else {
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error' });
  }
};
