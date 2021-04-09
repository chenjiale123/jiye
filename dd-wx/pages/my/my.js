const api = require('../../utils/api.js')
var app=getApp()
Page({
  data: {
    avatar: '',
    name: '',
    corp: '',
    items: [
      {value: '1', name: 'wifi打卡',},
      {value: '2', name: '距离打卡'},
 
    ]
  },
  onLoad() {
    wx.getStorage({key: 'user', success: res => {
      let {name, corporationName} = res.data
      let img = res.data.img ? res.data.img : 'https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/5ebb00f5c62b8779c5c1c2bb3177ef49-231-231.png'
      this.setData({name, img, corp: corporationName})
    }})
  },
  user(){
    wx.navigateTo({
      url: '../user/user',
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
