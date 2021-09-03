// pages/home/home.js
const api = require('../../utils/api.js')
var app = getApp()
import {
  averageUser,
  dealers,
  Buser
} from '../../utils/tabBarUrl'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [

      {
        name: 'CHN',
        value: '记住当前密码',
        checked: 'false'
      },

    ],
    acount1: '',
    psd1: '',
    code1: '',
    codeUrl: '',
    state: '',
    huo: true,
    eye: true,
    ps: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('username')) {
      this.setData({
        acount1: wx.getStorageSync('username'),
        psd1: wx.getStorageSync('password')
      })
    }
    if (wx.getStorageSync('userInfo')) {
      var expiration = wx.getStorageSync("index_data_expiration"); //拿到过期时间
      var timestamp = Date.parse(new Date()); //拿到现在时间

      if (expiration < timestamp) { //过期了，清空缓存，跳转到登录
        console.log("缓存已过期");
        wx.removeStorageSync('userInfo'); //清空缓存
        wx.removeStorageSync('token');

        return;
      } else {

        if (wx.getStorageSync('type') == 5) {
          app.globalData.list = averageUser

          wx.switchTab({
            url: '../main/main',
          })
        }   else if(wx.getStorageSync('type') == 2) {
          app.globalData.list = dealers
          wx.switchTab({
            url: '../home/home',
          })
        
        }else if(wx.getStorageSync('type') == 3){
          app.globalData.list = Buser
          wx.navigateTo({
            url: '../home1/home1',
          })
        }
      }

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  wxlogin() {
    wx.navigateTo({
      url: '../wxlogin/wxlogin',
    })
  },
  changeye() {
    this.setData({
      eye: false,
      ps: false,
    })

  },
  changeye1() {
    this.setData({
      eye: true,
      ps: true,
    })
  },
  again() {

    console.log(this.data.acount1)
    if (this.data.acount1 == "") {
      wx.showToast({
        title: '请先输入账号',
        icon: 'none'
      })
    } else {
      var that = this
      this.setData({
        huo: false 
      })
      wx.request({
        url: api.baseUrl+'/user/code/' + this.data.acount1, //获取图片的URL
        method: "get",

        success(res) {
          console.log(res)
          var     base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(res.data.data));
          console.log(res)
          let url = 'data:image/png;base64,' +base64Data
          that.setData({
            codeUrl: url, //设置data里面的图片url

          })
          console.log(that.data.codeUrl)
        },
        fail(res) {

        }
      })
    }

  },
  again1() {
    var that = this
    if (this.data.acount1 == "") {
      wx.showToast({
        title: '请先输入账号',
        icon: 'none'
      })
    } else {
      wx.request({
        url:api.baseUrl+ '/user/code/' + this.data.acount1, //获取图片的URL
        method: "get",
    
        success(res) {
          console.log(res.data)
          var     base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(res.data.data));
          console.log(res)
          let url = 'data:image/png;base64,' +base64Data
          that.setData({
            codeUrl: url, //设置data里面的图片url

          })
          console.log(that.data.codeUrl)
        },
        fail(res) {

        }
      })
    }
  },
  login() {
    var that = this
    api._post('/user/login', {
        username: this.data.acount1,
        password: this.data.psd1,
        code: this.data.code1
      })
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          if (res.data == null) {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })

          } else {

            this.setData({
              type: res.data.userInfo.type
            })
            wx.setStorageSync('userInfo', JSON.stringify(res.data.userInfo))
            wx.setStorageSync('token', res.data.token)
            // if(that.data.state=='CHN'){
            wx.setStorageSync('username', this.data.acount1)
            wx.setStorageSync('password', this.data.psd1)
            wx.setStorageSync('bind', res.data.userInfo.bind)
            wx.setStorageSync('type', res.data.userInfo.type)
            wx.setStorageSync('school', res.data.userInfo.school)
            wx.setStorageSync('address', res.data.userInfo.slocation)
            wx.setStorageSync('schoolIdId', res.data.userInfo.schoolId)
            if (res.data.userInfo.province !== null) {
              wx.setStorageSync('province', res.data.userInfo.province)

            }
            if (res.data.userInfo.city !== null) {

              wx.setStorageSync('city', res.data.userInfo.city)
            }
            if (res.data.userInfo.district !== null) {

              wx.setStorageSync('district', res.data.userInfo.district)
            }
        
            if (res.data.userInfo.type == 5) {

              if (res.data.userInfo.bind == false) {
                wx.navigateTo({
                  url: '../school/school',
                })
              } else {
                app.globalData.list = averageUser
                wx.switchTab({
                  url: '../main/main',
                })
              }
            } else if(res.data.userInfo.type == 7) {
              app.globalData.list = dealers
              wx.switchTab({
                url: '../home/home',
              })
            
            }else if(res.data.userInfo.type == 8){
              app.globalData.list = Buser
              wx.navigateTo({
                url: '../home1/home1',
              })
            }

            //  }
            var timestamp = Date.parse(new Date());
            var expiration = timestamp + 12 * 3600 * 1000; //2592000秒（一个月）
            wx.setStorageSync("index_data_expiration", expiration);
            // }
          }

        } else {
          that.again()
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
      .catch(err => {
        console.log(err)
        that.again()
        wx.showToast({
          title: err.data.msg,
          icon: 'none'
        })
      })

  },
  acount(e) {
    this.setData({
      acount1: e.detail.value
    })
  },
  psd(e) {
    this.setData({
      psd1: e.detail.value
    })
  },
  code(e) {
    this.setData({
      code1: e.detail.value
    })
  },

  radioChange(e) {
    console.log(e)
    this.setData({
      state: e.detail.value
    })
  },
  blur() {
    this.again()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('userInfo')) {
      var expiration = wx.getStorageSync("index_data_expiration"); //拿到过期时间
      var timestamp = Date.parse(new Date()); //拿到现在时间

      if (expiration < timestamp) { //过期了，清空缓存，跳转到登录
        console.log("缓存已过期");
        wx.removeStorageSync('userInfo'); //清空缓存
        wx.removeStorageSync('token');

        return;
      } else {

        if (wx.getStorageSync('type') == 5) {
          app.globalData.list = averageUser

          wx.switchTab({
            url: '../main/main',
          })
        }   else if(wx.getStorageSync('type') == 7) {
          app.globalData.list = dealers
          wx.switchTab({
            url: '../home/home',
          })
        
        }else if(wx.getStorageSync('type') == 8){
          app.globalData.list = Buser
          wx.navigateTo({
            url: '../home1/home1',
          })
        }
      }

    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.again()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})