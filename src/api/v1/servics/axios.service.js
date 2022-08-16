const axios = require("axios").default;

module.exports = {
    post: async (endpoint, bodyData,authorization) => {
        let config = {
            method: "post",
            url: endpoint,
            headers: {
                "Content-Type": "application/json",
                Authorization: authorization,
            },
            data: bodyData,
        };
        const response = await axiosResponse(config)
        return response;
    },
    get: async (endpoint,authorization) => {
        let config = {
            method: "get",
            url: endpoint,
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await axiosResponse(config)
        return response;
    },
    textLocalSms: async (number, otp) => {
        let config = {
            method: "get",
            url:
                `https://api.textlocal.in/send/?apikey=${textlocalapi}=&numbers=${number}&sender=FABLOP&message=` +
                encodeURIComponent(
                    `Greetings from Fablo, ${otp} is your verification code to login into Fablo Platforms.`
                ),
            headers: {
                "Content-Type": "application/json",
                "x-api-version": "1.0",
                "x-api-key": apiKey,
                Authorization: authorization,
            },
        };
        const response = await axiosResponse(config)
        return response;
    },
};

async function axiosResponse(config) {
    try {
        const response = await axios(config)
        if (response.status == 200) {
            return response.data;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false
    }
}