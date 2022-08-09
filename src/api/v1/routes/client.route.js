const express = require("express");
const router = express.Router();

const { registerClient, clientLogin, getClientById, editClientInfo } = require('../controller/client.controller.js');
const { authenticateUser } = require('../middleware/authToken')

router.post('/register', registerClient);
router.post('/login', clientLogin);
router.get('/', authenticateUser, getClientById);
router.post('/update', authenticateUser, editClientInfo)

module.exports = router;
