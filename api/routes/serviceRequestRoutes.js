const express = require("express");
const serviceRequestController = require("../controllers/serviceRequestController");

const router = express.Router();

router.post("/", serviceRequestController.createRequest);
router.get("/:id", serviceRequestController.getRequestById);
router.get("/", serviceRequestController.getRequests);
router.put("/:id", serviceRequestController.updateRequestById);
router.delete("/:id", serviceRequestController.deleteRequestById);

module.exports = router;
