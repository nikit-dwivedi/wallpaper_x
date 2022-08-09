const express = require("express");
const router = express.Router();

const { addAdmin, login, getAllClient, getClientById } = require('../controller/admin.controller');
const { authenticateAdmin } = require('../middleware/authToken')

router.post('/login', authenticateAdmin, login);
router.post('/register', addAdmin);
router.get('/merchant', getAllClient);
router.get('/merchant/:merchantId', getClientById);

module.exports = router;
