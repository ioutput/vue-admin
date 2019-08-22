import axios from 'axios'
import store from '../store'
import config from './config'

// create an axios instance
const service = axios.create(config);
service.interceptors.request.use(
  config => {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['token'] = store.getters.token
    config.headers['Authorization'] = 'Bearer ' + store.getters.token
    return config
  },
  error => {
    Promise.reject(error)
  }
);
service.interceptors.response.use(
  response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // 请自行在引入 MessageBox
  //       // import { Message, MessageBox } from 'element-ui'
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  error => {
    if (error.response.status == 401) {
      localStorage.removeItem('user_info')
      location.replace('#/login')
    }
    //

    //return Promise.reject(error)
  }
)

export function http(method, url, params, headers = {}) {
  let query;
  if (params) {
    if (method == 'get' || method == 'delete') {
      query = service({
        method: method,
        url, params: params
      });
    } else {
      query = service({
        method: method,
        url, data: params
      });
    }
  } else {
    query = service({
      method: method,
      url
    });
  }
  //let load = Loading.service({ target: document.querySelector('.el-table__body-wrapper') });//显示加载框
  /*return new Promise((resolve, reject) =>{ 
   query.then(res => {
    resolve(res.data);
    //load.close();
   }).catch(err =>{
    reject(err.data);
    //load.close();
   }) 
});*/
  return query.then(res => {
    return res.data
  }).catch(err => {
    return err.data;
  })
}