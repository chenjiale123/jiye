// pages/user/user.js
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    phone1: '',
    name1: '',
    flag:true,
    new1:'',
    old1:'',
    userlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  add() {
    this.setData({
      flag:true,
      show: true
    })
  },
  name(e) {
    this.setData({
      name1: e.detail.value
    })
  },
  phone(e) {
    this.setData({
      phone1: e.detail.value
    })
  },

  old(e) {
    this.setData({
      old1: e.detail.value
    })
  },
  new(e) {
    this.setData({
      new1: e.detail.value
    })
  },
  del(e){
    var that=this
wx.showModal({
    cancelColor: '#999',
    cancelText: '取消',
    complete: (res) => {},
    confirmColor: '#3296FA',
    confirmText: '确定',
    content: '确定删除用户吗？',
    fail: (res) => {},
    showCancel: true,
    success: (result) => {
      if(result.confirm==true){
        api._post('/user/manager/delete',{
          username:e.currentTarget.dataset.id
        })
        .then(res=>{
          console.log(res)
          if(res.code==200){
            wx.showToast({
              title: '删除成功',
              icon:'none'
            })
            that.getlist()
          }
        })
      }

    },
    title: '提示',
  })
  },
  edit(e){
    this.setData({
      show: true,
      flag:false,
      old1:e.currentTarget.dataset.id
    })
    
  },
  getlist() {
    api._get('/ding/userList/' + wx.getStorageSync('username'))
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            userlist: res.data
          })
        }
      })
  },
  addmore() {

      api._post('/user/manager/register', {
        username: this.data.phone1,
        nickname: this.data.name1,
        password: '123456',
        gender: null,
        remark: null
      })
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          api._post('/user/manager/dispatchRole', {
              username: this.data.phone1,
              type: 7,
              parentId: wx.getStorageSync('username'),


              name: this.data.name1,
            })
            .then(res => {
              if (res.code == 200) {
                this.getlist()
                wx.showToast({
                  title: '添加成功',
                  icon: 'none'
                })
                this.setData({
                  show: false
                })
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              }
            })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })

   
    
 
  },
  upload(){
 
        api._post('/user/manager/update', {
          oldUsername: this.data.old1,
          newUsername:this.data.new1
          })
          .then(res => {
            if (res.code == 200) {
              this.getlist()
              wx.showToast({
                title: '更新成功',
                icon: 'none'
              })
              this.setData({
                show: false
              })
            } else {
              wx.showToast({
                title: res.msg,
                icon: 'none'
              })
            }
          })
      
  
  },
  cancel() {
    this.setData({
      show: false
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
    this.getlist()
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