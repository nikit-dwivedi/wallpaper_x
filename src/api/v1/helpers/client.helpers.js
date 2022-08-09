const clientModel = require('../model/client.model.js');
const { randomBytes } = require('node:crypto');
const { encryption, generateUserToken, checkEncryption } = require('../middleware/authToken');

addClient = async (clientData) => {
    try {
        const encryptedPassword = await encryption(clientData.password)
        const clientId = randomBytes(4).toString('hex')
        const formattedData = {
            clientId: clientId,
            firstName: clientData.firstName,
            lastName: clientData.lastName,
            email: clientData.email,
            mobileNumber: clientData.mobileNumber,
            password: encryptedPassword,
            gender: clientData.gender,
            dob: clientData.dob,
        };
        const token = await generateUserToken(formattedData)
        const saveData = await clientModel(formattedData);
        return saveData.save() ? token : false
    } catch (err) {
        return false
    }
},
    clientByEmail = async (email) => {
        try {
            const clientData = await clientModel.findOne({ email });
            return clientData ? clientData : false;
        } catch (error) {
            return false
        }
    },
    clientById = async (clientId) => {
        try {
            const clientData = await clientModel.findOne({ clientId });
            return clientData ? clientData : false;
        } catch (error) {
            return false
        }
    },
    editClient = async (clientId, clientData) => {
        try {
            const formattedData = {
                firstName: clientData.firstName,
                lastName: clientData.lastName,
                mobileNumber: clientData.mobileNumber,
                gender: clientData.gender,
                dob: clientData.dob,
            };
            const updateData = await clientModel.findOneAndUpdate({ clientId }, formattedData);
            return updateData ? true : false;
        } catch (error) {
            return false
        }
    },
    changeLoginStatus = async (clientId, status) => {
        try {
            const clientData = await clientModel.findOneAndUpdate({ clientId }, { isLogin: status });
            return clientData ? true : false;
        } catch (error) {
            return false
        }
    },
    changeActiveStatus = async (clientId, status) => {
        try {
            const clientData = await clientModel.findOneAndUpdate({ clientId }, { isActive: status });
            return clientData ? true : false;
        } catch (error) {
            return false
        }
    },
    allClient = async () => {
        try {
            const clientData = await clientModel.find();
            return clientData[0] ? clientData : false;
        } catch (error) {
            return false
        }
    },
    checkLogin = async (email, password) => {
        const clientData = await clientModel.findOne({ email });
        if (clientData) {
            const token = await generateUserToken(clientData);
            const passwordCheck = await checkEncryption(password, clientData.password);
            await changeLoginStatus(clientData.clientId, true);
            return passwordCheck ? token : false;
        }
        return false;
    }
module.exports = { checkLogin, allClient, changeActiveStatus, changeLoginStatus, editClient, clientByEmail, addClient, clientById }