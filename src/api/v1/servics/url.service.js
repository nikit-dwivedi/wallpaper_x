module.exports = {
    featuredPhotos: (page, limit) => {
        if (page && limit) {
            return `https://api.pexels.com/v1/curated?page=${page}&per_page=${limit}`
        }
        return `https://api.pexels.com/v1/curated?page=1&per_page=20`
    }
}