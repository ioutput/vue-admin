export default {
    baseURL: process.env.VUE_APP_BASE_URL,
    method: 'GET',
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    params: {},
    timeout: 5000,
    withCredentials: false,
    responseType: 'json',
    maxContentLength: 2000,
    maxRedirects: 5,
    //validateStatus: function (status) {
    //    return status >= 200 && status < 500
    //},
    data: {}
}