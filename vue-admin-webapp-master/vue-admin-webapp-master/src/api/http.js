import axios from 'axios';
import router from '@/router'
import Vue from 'vue'
import { Loading, Message } from 'element-ui' 
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


  // 响应拦截器
axios.interceptors.response.use(
  response => {
    console.log(response)
    const code = response.status

    if ((code >= 200 && code < 300) || code === 304) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
  
    console.log(error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
    
          router.replace({
            path: '/login',
            query: {
              // redirect: router.currentRoute.fullPath
            }
          })
          break
        case 404:
          Message.error('网络请求不存在')
          break
        default:
          Message.error(error.response.data.message)
      }
    } else {
      // 请求超时或者网络有问题
      if (error.message.includes('timeout')) {
        // Message.error('请求超时！请检查网络是否正常')
        // this.$message({
        //   type: "error",
        //   message: "请求超时!",
        // });
        router.replace({
          path: '/login',
          query: {
            // redirect: router.currentRoute.fullPath
          }
        })
        
      } else {
        // Message.error('请求失败，请检查网络是否已连接')
        // this.$message({
        //   type: "error",
        //   message: "请求超时!",
        // });
        router.replace({
          path: '/login',
          query: {
            // redirect: router.currentRoute.fullPath
          }
        })
      }
    }
    return Promise.reject(error)
  }
)

  
export function get(url, params = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params,
        headers: headers
      })
      .then(response => {
        resolve(response);
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
        resolve(response);
      }, err => {
        reject(err)
      })
  })
}
