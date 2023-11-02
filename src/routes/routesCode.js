const express = require('express');
const router = express.Router();
const whatsAppController = require('../controllers/whatsappControllers');

router
      .post('/', whatsAppController.sendCode);

module.exports = router;