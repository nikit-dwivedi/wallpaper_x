const { validationResult } = require('express-validator')
const { generateMerchantToken, checkEncryption, parseJwt } = require('../middleware/authToken')
const { badRequest, success, unknownError } = require('../helpers/response.helper')
const { clientById, addClient, checkLogin, editClient, clientByEmail } = require('../helpers/client.helpers')


module.exports = {
    registerClient: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const checker = await clientByEmail(req.body.email);
            if (checker) {
                return badRequest(res, "client already registered")
            }
            const token = await addClient(req.body);
            return token ? success(res, "user created successfully", token) : badRequest(res, "bad request");
        } catch (error) {
            unknownError(res, "unknown error");
        }
    },
    clientLogin: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const { email, password } = req.body;
            const token = await checkLogin(email, password);
            return token ? success(res, "login success", token) : badRequest(res, "invalid credentials")
        } catch (error) {
           return unknownError(res, "unknown error");
        }
    },
    getClientById: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const tokenData = parseJwt(req.headers.authorization);
            const clientData = await clientById(tokenData.clientId);
            return clientData ? success(res, "success", clientData) : badRequest(res, "bad request");
        } catch (error) {
            return badRequest(res, "bad request");
        }
    },
    editClientInfo: async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return badRequest(res, "bad request");
            }
            const tokenData = parseJwt(req.headers.authorization);
            const updatedInfo = await editClient(tokenData.clientId, req.body);
            return updatedInfo ? success(res, "profile updated") : badRequest(res, "bad request");
        } catch (error) {
            return unknownError(res, "unknown error");
        }
    },
}