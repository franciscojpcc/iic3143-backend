const { ServiceRequest } = require('../../db/models');

exports.createRequest = async (requestData) => {
  try {
    const newrequest = await ServiceRequest.create(requestData);
    return { success: true, data: newrequest };
  } catch (error) {
    console.error('Error creating the request:', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Error creating the request',
    };
  }
};

exports.findRequestById = async (requestId) => {
  const request = await ServiceRequest.findOne({
    where: {
      id: requestId,
    },
  });
  if (request) {
    console.log('Request found');
    return { success: true, data: request };
  }
  console.log('Request not found');
  return {
    success: false,
    statusCode: 404,
    message: 'Request not found',
  };
};

exports.findRequests = async () => {
  const requests = await ServiceRequest.findAll();
  if (requests) {
    console.log('Requests found');
    return { success: true, data: requests };
  }
  console.log('Requests not found');
  return {
    success: false,
    statusCode: 404,
    message: 'requests not found',
  };
};

exports.updateRequestById = async (requestId, newRequest) => {
  try {
    const request = await ServiceRequest.findOne({
      where: {
        id: requestId,
      },
    });

    if (request) {
      request.name = newRequest.name;
      request.date = newRequest.date;
      request.state = newRequest.state;
      await request.save();

      return {
        success: true,
        data: request,
      };
    }
    return {
      success: false,
      statusCode: 404,
      message: 'request not found',
    };
  } catch (error) {
    console.error('Error updating request:', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Error updating request',
      error,
    };
  }
};

exports.deleteRequestById = async (requestId) => {
  try {
    const request = await ServiceRequest.findOne({
      where: {
        id: requestId,
      },
    });

    if (request) {
      await request.destroy();

      return {
        success: true,
        message: 'request deleted',
      };
    }
    return {
      success: false,
      statusCode: 404,
      message: 'request not found',
    };
  } catch (error) {
    console.error('Error deleting request:', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Error deleting request',
      error,
    };
  }
};
