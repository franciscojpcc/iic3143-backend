const express = require('express');
const servicesController = require('../controllers/servicesController');

const router = express.Router();

router.post('/', servicesController.createService);
router.get('/:id', servicesController.getServiceById);
router.get('/', servicesController.getServices);
router.put('/:id', servicesController.updateServiceById);
router.delete('/:id', servicesController.deleteServiceById);

module.exports = router;
