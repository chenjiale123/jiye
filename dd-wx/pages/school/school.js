// pages/school/school.js
const api = require('../../utils/api.js')
var app = getApp()
import { averageUser ,dealers } from '../../utils/tabBarUrl'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options:[{
      id: '1',
      name: '幼儿园'
    }, {
      id: '2',
      name: '小学'
    }, {
      id: '3',
      name: '初中'
},{
  id: '4',
  name: '高中'
},{
  id: '5',
  name: '大学'
}],
address:"",
local:'',
sch1:'',
name1:'',
id:"",
hidden:false,
name:'幼儿园',
id:1 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  showselect(){
   this.setData({
     hidden:true
   })
  },
  fix(e){
   this.setData({
    id:e.currentTarget.dataset.id,
     hidden:false,
     name:e.currentTarget.dataset.name
   })
  },
  sch(e){
   this.setData({
     sch1:e.detail.value
   })
  },
  name(e){
    this.setData({
      name1:e.detail.value
    })
   },
  localtion(){
    wx.navigateTo({
      url: '../shopMap/shopMap',
    })
  },
  sub(){
 if(this.data.name1==""){
   wx.showToast({
     title: '请输入负责人',
     icon:'none'
   })
 }else if(this.data.sch1==""){
  wx.showToast({
    title: '请输入学校名称',
    icon:'none'
  })
 }else{
  api._post('/wxapp/registerSchool',{
    username:JSON.parse(wx.getStorageSync('userInfo')).username,
    sname:this.data.sch1,
    scontact:this.data.name1,
    stype:this.data.id,
    adcode:this.data.ad,
    saddress:this.data.address,
    slocation:app.globalData.local
  })
  .then(res=>{
    console.log(res)
    if(res.code==200){
      wx.showToast({
        title: '激活成功',
        icon:'none'
      })
      wx.setStorageSync('school', this.data.sch1)
      wx.setStorageSync('bind', true)
     
      if (wx.getStorageSync('type') == 5) {

  
          app.globalData.list = averageUser
          wx.switchTab({
            url: '../main/main',
          })
        
      } else if(wx.getStorageSync('type') == 2) {
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
    }else{
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
    }
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
    console.log(app.globalData.local)
   if(app.globalData.city==""){
       
   }else{
     this.setData({
      address:app.globalData.city,
      ad:app.globalData.ad
     })
   }
  },
change(e){
console.log(e)
this.setData({
  id:e.detail.id
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