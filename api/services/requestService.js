const ServiceRequest = require("../db/models/serviceRequest");

exports.createRequest = async (requestData) => {
  try {
    const newRequest = await ServiceRequest.create(requestData);
    return { success: true, data: newRequest };
  } catch (error) {
    console.error("Error creating the service request:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Error creating the service request",
    };
  }
};

exports.findRequestById = async (requestId) => {
  await ServiceRequest.findOne({
    where: {
      id: requestId,
    },
  })
    .then((request) => {
      if (!request) {
        throw new Error("request not found");
      }
      return {
        success: true,
        data: request,
      };
    })
    .catch((error) => {
      console.error("Error finding request:", error);
      return {
        success: false,
        statusCode: 500,
        message: "Error finding request",
        error: error,
      };
    });
};

exports.findRequests = async () => {
  await ServiceRequest.findAll()
    .then((requests) => {
      if (!requests) {
        throw new Error("Servicesrequests not found");
      }
      return {
        success: true,
        data: requests,
      };
    })
    .catch((error) => {
      console.error("Error finding services requests:", error);
      return {
        success: false,
        statusCode: 500,
        message: "Error finding services requests",
        error: error,
      };
    });
};

exports.updateRequestById = async (requesId, newRequest) => {
  try {
    const request = await ServiceRequest.findOne({
      where: {
        id: requesId,
      },
    });

    if (request) {
      request = newRequest;
      await request.save();

      return {
        success: true,
        data: request,
      };
    } else {
      return {
        success: false,
        statusCode: 404,
        message: "Service request not found",
      };
    }
  } catch (error) {
    console.error("Error updating service request:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Error updating service request",
      error: error,
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
        message: "service request deleted",
      };
    } else {
      return {
        success: false,
        statusCode: 404,
        message: "service request not found",
      };
    }
  } catch (error) {
    console.error("Error deleting service request:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Error deleting service request",
      error: error,
    };
  }
};
