// pages/goods/goods.js
let app = getApp()
const api=require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
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
  getlist() {
    api._get('/ding/supplies/'+wx.getStorageSync('schoolIdId'))
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            list: res.data
          })
        }

      })
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
     selected: 1
   
    })
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