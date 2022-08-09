//---------------------------------modules------------------------------//
const { validationResult } = require("express-validator");
//-------------------------------middleware-----------------------------//
const { parseJwt, generateAdminToken, encryption, checkEncryption, } = require("../middleware/authToken");
//--------------------------------helpers-------------------------------//
const { addAdmin, getAdminByEmail } = require("../helpers/admin.helpers");
const { unknownError, success, badRequest, created } = require("../helpers/response.helper");
const { allClient, clientByUniqueId } = require("../helpers/client.helpers");
//------------------------------functions-------------------------------//
module.exports = {

  addAdmin: async (req, res) => {
    const { email, password } = req.body;
    const data = { email: email, userId: "userno1" };
    const token = await generateAdminToken(data);
    created(res, "admin added", token);
  },

  login: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        badRequest(res, "bad request", error);
      }
      const { email, password } = req.body;
      const data = { email: email, userId: "userno1", };
      const token = await generateAdminToken(data);
      success(res, "successfully login", token);
    } catch (error) {
      unknownError(res, "unknown error");
    }
  },

  getAllClient: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        badRequest(res, "bad request", error);
      }
      const userData = await allClient();
      userData ? success(res, "success", userData) : badRequest(res, "bad request");
    } catch (error) {
      unknownError(res, "unknown error");
    }
  },
  
  getClientById: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        badRequest(res, "bad request", error);
      }
      const { ClientId } = req.params;
      const merchantData = await clientByUniqueId(ClientId);
      merchantData ? success(res, "merchant details", merchantData) : badRequest(res, "merchant not found");
    } catch (error) {
      unknownError(res, "Unknown error");
    }
  },
};
