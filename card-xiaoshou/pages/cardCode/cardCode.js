// pages/cardCode/cardCode.js

const api=require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'',
    user:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },
  getUser() {
    var that=this
    api._get('/ecard/user/staffInfo/' + this.data.id)
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            user: res.staffInfo
          })
           console.log( res.staffInfo)
          api._post('/ecard/user/wxaqrcode',{
            path:'pages/index/index?userId='+res.staffInfo.userId,
            width:200,
            type:0
          })
          .then(res=>{
        
            if(res.code==200){
              console.log(res.data)
              var buffer='data:image/png;base64,'+res.data
              console.log(buffer)
               that.setData({
                 code:buffer
               })
            
            }else{
              wx.showToast({
                title: res.msg,
                icon:'none'
              })
            }
          })
          .catch(err=>{
            console.log(err)
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
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
    this.getUser()

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