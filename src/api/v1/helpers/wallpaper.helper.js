const { get } = require('../servics/axios.service');
const { createClient } = require('pexels');
const { featuredPhotos } = require('../servics/url.service');
const { success, badRequest } = require('./response.helper');


module.exports = {
    getFreeWallpaper: async (page, limit) => {
        const endpoint = featuredPhotos(page, limit)
        const featuredPhotoList = await get(endpoint)
        console.log("==========",featuredPhotoList);
        return featuredPhotoList ? featuredPhotoList : false;
    }
}