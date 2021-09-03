// pages/wxlogin/wxlogin.js
const api = require('../../utils/api.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
id:'30',
openid:'',
userId:'',
session_key:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.wxlogin()
    // this.data.id=options.userId
    if(options.userId!==undefined){
      this.setData({
        userId:options.userId
      })
    }
 

   
  },
  wxlogin() {
    wx.login({
      success: res => {

        this.setData({
          code: res.code
        })
      }
    });
  },


  GetUserInfo:function() {
    // var that = this;
    // console.log(this.data.code)

      
    let self = this
    wx.getUserProfile({
      desc: "获取你的昵称、头像、地区及性别", // 不写不弹提示框
      success: res => {
       if(res.userInfo.gender==1){
         res.userInfo.gender='男'
       }else{
        res.userInfo.gender='女'
       }

            api._post('/ecard/user/wxlogin',{
      js_code:self.data.code,
      type:1,
      nickName:res.userInfo.nickName,
      avatarUrl:res.userInfo.avatarUrl,
      gender:res.userInfo.gender
    })
    .then(res1=>{

      console.log(self.data.id)
      if(res1.code==200){
        self.setData({
          openid:res1.data.openid,
          session_key:res1.data.session_key
        })
        console.log(res1.data)
        if(self.data.userId!==""){
          console.log(this.data.openid)

          wx.navigateTo({
            url: '../loginUser/loginUser?openid='+self.data.openid+'&userId='+self.data.userId+'&session_key='+this.data.session_key+'&type=2',
        
            success: (result) => {},
            fail: (res) => {},
            complete: (res) => {},
          })

        }else{
          console.log(res1.data.openid,self.data.openid)
          if(res1.data.openid==null||res1.data.openid==undefined){

          }else{
            self.getInit(res1.data.openid)
          }
        
        }
      
      }
  
    })
    .catch(err1=>{
      console.log(err1)
    })
        self.setData({
          userInfo: res.userInfo
        })
      },
      fail: res => {
        //拒绝授权
        wx.showToast({
          title: '您拒绝了授权',
          icon: 'none'
        })
        return;

 
      }
    })

 


    

  },
  getInit(openid){
    console.log(openid)
api._get('/ecard/user/loginLog/'+openid)
.then(res=>{
  console.log(res)
  if(res.staffId==null){
    console.log(openid)
    wx.navigateTo({
      url: '../loginUser/loginUser?openid='+openid+'&userId='+this.data.id+'&session_key='+this.data.session_key+'&type=1',
  
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  }else{
    console.log(openid)
    wx.navigateTo({
      url: '../loginUser/loginUser?openid='+openid+'&userId='+res.staffId+'&session_key='+this.data.session_key+'&type=3',
  
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  }

})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
getboolean(){
api._get("/ecard/user/pass")
.then(res=>{
  console.log(res)
  this.setData({
    bool:res.pass
  })
  console.log(this.data.bool)
})
},
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.GetUserInfo()
    this.getboolean()
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