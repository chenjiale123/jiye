// pages/main/main.js

const api = require('../../utils/api.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getlist()
    if (typeof this.getTabBar === 'function' &&
   this.getTabBar()) {
     console.log('22222')
   this.getTabBar().setData({
    selected: 0,
    list:[
      {
        "selectedIconPath": "/image/xdqk.png",
        "iconPath": "/image/xdqk1.png",
        "pagePath": "/pages/main/main",
        "text": "消毒情况"
      },
    
    
      {
        "selectedIconPath": "/image/wzcb.png",
        "iconPath": "/image/wzcb1.png",
        "pagePath": "/pages/goods/goods",
        "text": "物资储备"
      },
      {
        "selectedIconPath": "/image/sjxz.png",
        "iconPath": "/image/sjxz1.png",
        "pagePath": "/pages/data/data",
        "text": "数据下载"
      },
      {
        "pagePath": "/pages/setting/setting",
        "text": "设置",
        "iconPath": "/image/set1.png",
        "selectedIconPath": "/image/set.png"
      }
    ]
  
   })
  }
  },
  getlist(){
    api._get("/ding/sceneList/"+wx.getStorageSync('username'))
    .then(res=>{
      if(res.code==200){
        console.log(res)
        this.setData({
          scean:res.data
        })
      }
    })
  },
  detail(e){
   wx.navigateTo({
     url: '../object1/object1?id='+e.currentTarget.dataset.id,
   })
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
  onPullDownRefresh(){
    this.getlist()
    wx.stopPullDownRefresh()
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