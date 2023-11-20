const serviceService = require("../services/serviceService");

exports.createService = async (req, res) => {
  try {
    const serviceData = req.body;
    const result = await serviceService.createService(serviceData);

    if (result.success) {
      res.status(201).json(result.data);
    } else {
      console.log("Service already exists");
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Error creating service" });
  }
};

exports.getServiceById = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const result = await serviceService.findServiceById(serviceId);

    if (result.success) {
      res.status(200).json({ info: result.data });
    } else {
      console.error("Error getting Service information:", result.error);
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Unexpected error" });
  }
};

exports.getServices = async (req, res) => {
  try {
    const result = await serviceService.findServices();

    if (result.success) {
      res.status(200).json({ info: result.data });
    } else {
      console.error("Error getting Services information:", result.error);
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Unexpected error" });
  }
};

exports.updateServiceById = async (req, res) => {
  const serviceId = req.params.id;
  const updateService = req.body;
  try {
    const result = await serviceService.updateSeerviceById(
      serviceId,
      updateService
    );

    if (result.success) {
      res.status(200).json({ info: result.data });
    } else {
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Unexpected error" });
  }
};

exports.deleteServiceById = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const result = await serviceService.deleteServiceById(serviceId);

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(result.statusCode).json({ message: result.message });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Unexpected error" });
  }
};
