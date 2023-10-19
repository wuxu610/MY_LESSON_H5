import axios from './axios'
const getArticleCatAll = () => {
    return axios.request({
        url: 'api/articleCat/all',
        method: 'get',
    })
}
export {
    getArticleCatAll,
}