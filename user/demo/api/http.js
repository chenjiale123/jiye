import axios from 'axios';

axios.defaults.timeout = 5000; //请求超时5秒
axios.defaults.baseURL = ''; //请求base url
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //设置post请求是的header信息
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

 axios.interceptors.request.use(function (config) {
    
   
   
    config.headers.common['Authorization'] = localStorage.getItem('token');
    //console.dir(config);
    return config;
  }, function (error) {
    // Do something with request error
    console.info("error: ");
    console.info(error);
    return Promise.reject(error);
  });



  
export function get(url, params = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params,
        headers: headers
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}
