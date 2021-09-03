// const url = 'http://192.168.10.18:8282';
// const baseUrl = 'http://192.168.10.18:8282'

const url = 'https://www.jileaf.top:8282';
const baseUrl = 'https://www.jileaf.top:8282'

const http = ({ url = '', param = {}, ...other } = {}) => {

  wx.showLoading({
    title: '请求中，请耐心等待..'
  }); 
  let timeStart = Date.now();
  return new Promise((resolve, reject) => { 
    console.log(url, other)
    wx.request({   
      url: getUrl(url),
      data: param, 
      header: {
        'content-type': other.method == 'get' ? 'application/json' : 'application/json',
        'Authorization':wx.getStorageSync('token'),
        'channel':'3',
        "version":'1.0.0'
      },
      ...other,
      complete: (res) => {
        wx.hideLoading();
        console.log(`耗时${Date.now() - timeStart}`);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
    
        } else {
          reject(res)
          console.log(res)
          wx.showToast({
            title: '请求失败',
            icon:'none'
          })
        }
      }
    })
  })
}


const https = ({ url = '', param = {}, ...other } = {}) => {
  wx.showLoading({
    title: '请求中，请耐心等待..'   
  });
  let timeStart = Date.now();
  return new Promise((resolve, reject) => {
    console.log(url, other)
    wx.request({
      url: getUrl(url),
      data: param,
      header: {
        'content-type': other.method == 'post' ? 'application/x-www-form-urlencoded' : 'application/x-www-form-urlencoded',
        'Authorization':wx.getStorageSync('token')
      },
    
      ...other,
      complete: (res) => {
        wx.hideLoading();
        console.log(`耗时${Date.now() - timeStart}`);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }
    })
  })
}



const getUrl = (url) => {
  if (url.indexOf('://') == -1) {
    url = baseUrl + url;
  }
  return url
}

// get方法
const _get = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'get'
  })
}

const _post = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'post'
  })
}


const _posts = (url, param = {}) => {
  return https({
    url,
    param,
    method: 'post'
  })
}

const _put = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'put'
  })
}

const _delete = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'put'
  })
}
module.exports = {
  url,
  baseUrl,
  _get,
  _post,
  _posts,
  _put,
  _delete
}