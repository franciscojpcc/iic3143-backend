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
  const pendingPage = parseInt(req.query.pendingPage, 10) || 1;
  const pendingSize = parseInt(req.query.pendingSize, 10) || 10;
  const completedPage = parseInt(req.query.completedPage, 10) || 1;
  const completedSize = parseInt(req.query.completedSize, 10) || 10;
  try {
    const result = await serviceRequestService.findRequestsByUserId(
      userId,
      pendingPage,
      pendingSize,
      completedPage,
      completedSize,
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

exports.getRequestsByProviderId = async (req, res) => {
  const providerId = req.params.id;
  const pendingPage = parseInt(req.query.pendingPage, 10) || 1;
  const pendingSize = parseInt(req.query.pendingSize, 10) || 10;
  const completedPage = parseInt(req.query.completedPage, 10) || 1;
  const completedSize = parseInt(req.query.completedSize, 10) || 10;
  try {
    const result = await serviceRequestService.findRequestsByProviderId(
      providerId,
      pendingPage,
      pendingSize,
      completedPage,
      completedSize,
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

exports.getRequestsWithProblem = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const size = parseInt(req.query.size, 10) || 10;
  try {
    const result = await serviceRequestService.findRequestsWithProblem();

    if (result.success) {
      const offset = (page - 1) * size;
      const requests = result.data.slice(offset, offset + size);
      console.log(requests);
      res.status(200).json({ info: requests, count: result.data.length });
    } else {
      console.error('Error getting Service request information:', result.error);
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Unexpected error' });
  }
};
