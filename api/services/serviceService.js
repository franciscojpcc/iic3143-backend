const Service = require("../db/models/service");

exports.createService = async (serviceData) => {
  try {
    const newService = await Service.create(serviceData);
    return { success: true, data: newService };
  } catch (error) {
    console.error("Error creating the service:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Error creating the service",
    };
  }
};

exports.findServiceById = async (serviceId) => {
  await Service.findOne({
    where: {
      id: serviceId,
    },
  })
    .then((service) => {
      if (!service) {
        throw new Error("Service not found");
      }
      return {
        success: true,
        data: service,
      };
    })
    .catch((error) => {
      console.error("Error finding service:", error);
      return {
        success: false,
        statusCode: 500,
        message: "Error finding service",
        error: error,
      };
    });
};

exports.findServices = async () => {
  await Service.findAll()
    .then((services) => {
      if (!services) {
        throw new Error("Services not found");
      }
      return {
        success: true,
        data: services,
      };
    })
    .catch((error) => {
      console.error("Error finding services:", error);
      return {
        success: false,
        statusCode: 500,
        message: "Error finding services",
        error: error,
      };
    });
};

exports.updateServiceById = async (serviceId, newService) => {
  try {
    const service = await Service.findOne({
      where: {
        id: serviceId,
      },
    });

    if (service) {
      service = newService;
      await service.save();

      return {
        success: true,
        data: service,
      };
    } else {
      return {
        success: false,
        statusCode: 404,
        message: "Service not found",
      };
    }
  } catch (error) {
    console.error("Error updating service:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Error updating service",
      error: error,
    };
  }
};

exports.deleteServiceById = async (serviceId) => {
  try {
    const service = await Service.findOne({
      where: {
        id: serviceId,
      },
    });

    if (service) {
      await service.destroy();

      return {
        success: true,
        message: "service deleted",
      };
    } else {
      return {
        success: false,
        statusCode: 404,
        message: "service not found",
      };
    }
  } catch (error) {
    console.error("Error deleting service:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Error deleting service",
      error: error,
    };
  }
};
