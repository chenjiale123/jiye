/**
 * axios初始化配置
 * --------------------------------------
 * 大部分接口以这个为基础
 */

import axios from "axios"

import{Message} from 'element-ui'



export function request1(config){
  // 创建axios实例
  const instance = axios.create({
    baseURL:"https://restapi.amap.com",
    timeout:5000
  })


  instance.interceptors.request.use(


    config => {
      // console.log(localStorage.getItem('token'))
      console.log(localStorage.getItem('token'))
      console.log(sessionStorage.getItem('token'))
    
      return config
    },
  
    error => {
      console.log(error);
      return Promise.reject();
    }
  );
  // 发送真正的网络请求
  return instance(config)
}

export function request2(config){
  // 创建axios实例
  const instance = axios.create({
    baseURL:" http://192.168.10.18:8080",
    timeout:5000
  })
  // http://192.168.10.18:8080


  instance.interceptors.request.use(


    config => {
      // console.log(localStorage.getItem('token'))
      console.log(localStorage.getItem('token'))
      console.log(sessionStorage.getItem('token'))
      if (localStorage.getItem('token')) {
        config.headers['Authorization'] = localStorage.getItem('token') // 让每个请求携带自定义token 请根据实际情况自行修改
      }
      return config
    },
  
    error => {
      console.log(error);
      return Promise.reject();
    }
  );
  // 发送真正的网络请求
  return instance(config)
}
export function request3(config){
  // 创建axios实例
  const instance = axios.create({
    baseURL:"https://www.jileaf.top:8282",
    timeout:5000
  })


  instance.interceptors.request.use(


    config => {
      // console.log(localStorage.getItem('token'))
 
      if (localStorage.getItem('token')) {
        config.headers['Authorization'] = localStorage.getItem('token') // 让每个请求携带自定义token 请根据实际情况自行修改
      }
      return config
    },
  
    error => {
      console.log(error);
      return Promise.reject();
    }
  );


  instance.interceptors.response.use( config =>  {
    console.log(config)
    // if (response.data.TimeOutFlag) {
    //   console.log('超时了')
     
    // }
    return config
  },
  error => {
    console.log(error);
    Message.error('请求超时， 请联系开发人员')

    // return Promise.reject();
  })





  // 发送真正的网络请求
  return instance(config)
}
var     baseURL=   "https://www.jileaf.top:8282";
export  default baseURL

