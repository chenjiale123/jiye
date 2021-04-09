const api = require('../../utils/api.js')
var app=getApp()
Page({
  data: {},
  onLoad() {},
  logout() {
    let {httpUrl} = app.globalData
    wx.getStorage({
      key: 'token',
      success: res => {
        wx.request({
          url: httpUrl + '/account/appMp/logOut',
          data: {token: res.data},
          success: res => {
            wx.removeStorage({key: 'token'})
            wx.removeStorage({key: 'user'})
            wx.removeStorage({key: 'tpAccountId'})
            wx.reLaunch({
              url: '/pages/homepage/homepage'
            })
          },
          fail: err => {
            console.log(err)
            wx.alert({content: JSON.stringify(err)})
          }
        })
      }
    })
  }, 
  onShow(){
 
  },
  user(){
    wx.navigateTo({
      url: '../Buser/Buser',
      complete: (res) => {},

      fail: (res) => {},
      success: (result) => {},
    })
  },
  exit(){
    api._get('/user/logout/'+JSON.parse(wx.getStorageSync('userInfo')).username)
    .then(res=>{
      console.log(res)
      if(res.code==200){
        wx.removeStorageSync('userInfo')
        wx.removeStorageSync('province')
        wx.removeStorageSync('city')
        wx.removeStorageSync('bind')
        wx.removeStorageSync('district')
        wx.removeStorageSync('school')
        wx.removeStorageSync('token')
        wx.reLaunch({
          url: '../login/login',
        })
      }
    })
   },
  
});
