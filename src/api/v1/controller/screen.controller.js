const { unknownError, success, badRequest } = require("../helpers/response.helper");
const { getFreeWallpaper } = require("../helpers/wallpaper.helper")

module.exports = {
    getFeaturedImage: async (req, res) => {
        try {
            const { page, limit } = req.body
            const imageList = await getFreeWallpaper(page, limit);
            delete imageList.next_page
            delete imageList.per_page
            return imageList ? success(res, "featured wallpaper list", imageList) : badRequest(res, "bad request")
        } catch (error) {
            console.log(error);
            return unknownError(res, "unknow error")
        }
    }
}