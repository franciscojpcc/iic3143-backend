const { Service } = require('../../db/models');

exports.createService = async (serviceData) => {
  try {
    const newService = await Service.create(serviceData);
    return { success: true, data: newService };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error creating the service',
    };
  }
};

exports.findServiceById = async (serviceId) => {
  const service = await Service.findOne({
    where: {
      id: serviceId,
    },
  });
  if (service) {
    return { success: true, data: service };
  }
  return {
    success: false,
    statusCode: 404,
    message: 'Service not found',
  };
};

exports.findServices = async () => {
  const services = await Service.findAll();
  if (services) {
    return { success: true, data: services };
  }
  return {
    success: false,
    statusCode: 404,
    message: 'Services not found',
  };
};

exports.findServicesByUserId = async (userId) => {
  const services = await Service.findAll({
    where: {
      supplierId: userId,
    },
  });
  if (services.length > 0) {
    return { success: true, data: services };
  }
  return {
    success: false,
    statusCode: 404,
    message: 'Services not found',
  };
};

exports.updateServiceById = async (serviceId, newService) => {
  try {
    const service = await Service.findOne({
      where: {
        id: serviceId,
      },
    });

    if (service) {
      service.name = newService.name;
      service.description = newService.description;
      service.fee = newService.fee;
      service.category = newService.category;
      service.qualification = newService.qualification;
      await service.save();

      return {
        success: true,
        data: service,
      };
    }
    return {
      success: false,
      statusCode: 404,
      message: 'Service not found',
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error updating service',
      error,
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
        message: 'service deleted',
      };
    }
    return {
      success: false,
      statusCode: 404,
      message: 'service not found',
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error deleting service',
      error,
    };
  }
};
