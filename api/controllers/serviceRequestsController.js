const serviceRequestService = require('../services/serviceRequestService');

exports.createRequest = async (req, res) => {
  try {
    const request = req.body;
    const result = await serviceRequestService.createRequest(request);

    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating service request' });
  }
};

exports.getRequestById = async (req, res) => {
  const requestId = req.params.id;
  try {
    const result = await serviceRequestService.findRequestById(requestId);

    if (result.success) {
      res.status(200).json({ info: result.data });
    } else {
      console.error('Error getting Service request information:', result.error);
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Unexpected error' });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const result = await serviceRequestService.findRequests();

    if (result.success) {
      res.status(200).json({ info: result.data });
    } else {
      console.error('Error getting Services requestinformation:', result.error);
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Unexpected error' });
  }
};

exports.updateRequestById = async (req, res) => {
  const requestId = req.params.id;
  const updateRequest = req.body;
  try {
    const result = await serviceRequestService.updateRequestById(
      requestId,
      updateRequest,
    );

    if (result.success) {
      res.status(200).json({ info: result.data });
    } else {
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Unexpected error' });
  }
};

exports.deleteRequestById = async (req, res) => {
  const requestId = req.params.id;
  try {
    const result = await serviceRequestService.deleteRequestById(requestId);

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Unexpected error' });
  }
};

exports.getRequestsByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await serviceRequestService.findRequestsByUserId(userId);

    if (result.success) {
      res.status(200).json({ info: result.data });
    } else {
      console.error('Error getting Service request information:', result.error);
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Unexpected error' });
  }
};

exports.getRequestsByProviderId = async (req, res) => {
  const providerId = req.params.id;
  try {
    const result = await serviceRequestService.findRequestsByProviderId(
      providerId,
    );

    if (result.success) {
      res.status(200).json({ info: result.data });
    } else {
      console.error('Error getting Service request information:', result.error);
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Unexpected error' });
  }
};
