const express = require('express');
const serviceRequestController = require('../controllers/serviceRequestsController');

const router = express.Router();

router.post('/', serviceRequestController.createRequest);
router.get('/problem', serviceRequestController.getRequestsWithProblem);
router.get('/:id', serviceRequestController.getRequestById);
router.get('/', serviceRequestController.getRequests);
router.put('/:id', serviceRequestController.updateRequestById);
router.delete('/:id', serviceRequestController.deleteRequestById);
router.get('/user/:id', serviceRequestController.getRequestsByUserId);
router.get('/provider/:id', serviceRequestController.getRequestsByProviderId);

module.exports = router;
