// pages/loginUser/loginUser.js
const api = require('../../utils/api.js')
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    sessionKey:'',
    userId:'',
    openid:'',
    type:undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sessionKey:options.session_key,
      userId:options.userId,
      openid:options.openid,
      type:options.type
    })
  
 
  },



 
  getPhoneNumber: function (e) {
    var that = this;
    console.log(e.detail.errMsg == "getPhoneNumber:ok");
    if (e.detail.errMsg == "getPhoneNumber:ok") {
        api._post('/ecard/user/detail',{
          
          encryptedData:e.detail.encryptedData,
          iv:e.detail.iv,
          sessionKey:that.data.sessionKey,
     
        })
        .then(res=>{
          console.log(res)
            if(res.code==200){
               wx.setStorageSync('phone', res.detail.phoneNumber)
             console.log(this.data.userId)
            
              // if(this.data.userId!==""){
              //   app.globalData.id=this.data.userId
              //   app.globalData.openid=this.data.openid
           
              // }else{
           
                  wx.reLaunch({
                    url: '../index/index?openid='+this.data.openid+'&userId='+this.data.userId+"&type="+this.data.type,
                
                    success: (result) => {},
                    fail: (res) => {},
                    complete: (res) => {},
                  })
           

              // }
          

             
            }else{
              console.log(res)
              wx.showToast({
                title: res.msg, 
                icon:'none'
              })
            }
        })
        .catch(err=>{
          console.log(err)
   
          wx.showToast({
            title: err.data.msg, 
            icon:'none'
          })
        })
    }
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