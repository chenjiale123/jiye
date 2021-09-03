//index.js
const api=require('../../utils/api')

import { base64src } from '../../utils/base64.js'
const uploadImage = require('../../utils/UploadAliyun.js');
Page({
  data: {
    painting: {},
    shareImage: '',
    img:'',
    id:'',
    result:''
  },
  onLoad (options) {
 
    this.setData({
      id:options.id
    })
    console.log(options.id)
  },


  getUser() {
    var that=this
    console.log(that.data.id)
    api._get('/ecard/user/staffInfo/' + that.data.id)
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          that.setData({
            user: res.staffInfo
          })
          that.getOnline(res.staffInfo)
         
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
  getBase64ImageUrl: function(data) {
    /// 获取到base64Data
    var base64Data = data;
    /// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
    base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
    /// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求
    const base64ImgUrl = "data:image/png;base64," + base64Data;
    /// 刷新数据
    return base64ImgUrl;
},


 getOnline(user){
  var that=this

api._get('/ecard/user/qrcode/'+this.data.id)
.then(res=>{
  console.log(res)
  if(res.data==null){
    that.getCodeImg()

  }else{
   
    // console.log(this.data.user)
    // console.log(res.data)
    that.eventDraw(user, res.data)
  }
})
},
upImg(result){
  console.log(result)
api._post('/ecard/user/qrcode',{
  userId:this.data.id,
  qrcodeUrl:result
})
.then(res=>{
  if(res.code==200){
    console.log(res)
  }
})
},

  getCodeImg(){
    var that=this
    console.log(this.data.id)
  api._post('/ecard/user/wxaqrcode',{
    path:'pages/wxlogin/wxlogin?userId='+this.data.id,
    width:200,
    type:0
  })
  .then(res=>{
    console.log(res)
    if(res.code==200){
   
      var buffer='data:image/png;base64,'+res.data
     
       this.setData({
         code:buffer,
         painting:{}
       })
 
     
       base64src(buffer, res => {
        wx.showLoading({
          title: '绘制分享图片中',
          mask: true
        })
     
        uploadImage(res, 'images/',
        function (result) {
          console.log("======上传成功图片地址为：", result);
          //这个result就是返给你上传到oss上的地址链接
          that.setData({
            result:result
          })
          that.upImg(result)
          that.eventDraw(that.data.user, result)
          wx.hideLoading();
        }, function (result) {
          console.log("======上传失败======", result);
          
          wx.hideLoading()
        }
      )
     
        
        
   
      });
    
    
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
  },
  eventDraw (user,img) {
    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    console.log(img)
    this.setData({
      painting: {
        width: 375,
        height: 555,
        clear: true,
        views: [
          {
            type: 'image',
            url: '../../image/bj1.png',
            top: 0,
            left: 0,
            width: 375,
            height: 555,
           
          },
          {
            type: 'image',
            url: user.header,
            top: 59,
            left: 130,
            width: 95,
            height: 94,         
            // borderRadius:44,     
          },
       
          {
            type: 'text',
            content: user.username,
            fontSize: 17,
            color: '#444444',
            textAlign: 'center',
            top: 175,
            left: 178,
            bolder: true
          },
          {
            type: 'text',
            content:user.englishName,
            fontSize: 11,
            color: '#444444',
            textAlign: 'center',
            top: 199,
            left: 180
          },
          {
            type: 'text',
            content:user.position,
            fontSize: 12,
            color: '#444444',
            textAlign: 'center',
            top: 220,
            left: 180
          },
          {
            type: 'text',
            content:user.englishPosition,
            fontSize: 11,
            color: '#444444',
            textAlign: 'center',
            top: 240,
            left: 180
          },

          {
            type: 'text',
            content:"Contact",
            fontSize: 10,
            color: '#444444',
            textAlign: 'center',
            top: 280,
            left: 180
          },
          {
            type: 'text',
            content:user.mobile,
            fontSize: 13,
            color: '#444444',
            textAlign: 'center',
            top: 300,
            left: 180
          },
          {
            type: 'text',
            content:'E-mail',
            fontSize: 10,
            color: '#444444',
            textAlign: 'center',
            top: 320,
            left: 180
          },
          {
            type: 'text',
            content:user.email,
            fontSize: 13,
            color: '#444444',
            textAlign: 'center',
            top: 340,
            left: 180
          },
          {
            type: 'text',
            content:user.companyAddr==null? "":'Add',
            fontSize: 10,
            color: '#444444',
            textAlign: 'center',
            top: 360,
            left: 180
          },
          {
            type: 'text',
            content:user.companyAddr==null? "":user.companyAddr,
            fontSize: 13,
            color: '#444444',
            textAlign: 'center',
            top: 380,
            left: 180
          },
          {

            type: 'image',
            url: img,
            top: 410,
            left: 57,
            width: 100,
            height: 100
          },
          {

            type: 'image',
            url: '../../image/logo.png',
            top: 440,
            left: 190,
            width: 130,
            height: 45
          },
        
        ]
      }
    })
  },
  eventSave () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success (res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
  })
  },
  eventGetImage (event) {
    console.log(event)
    wx.hideLoading()
    const { tempFilePath, errMsg } = event.detail
    if (errMsg === 'canvasdrawer:ok') {
      this.setData({
        shareImage: tempFilePath
      })
    }
  },
  onReady(){
    // this.getCodeImg()
  },
  onShow(){

  
 
    var that=this
  
    // setTimeout(()=>{
      // that.getCodeImg()
    // },1000)
    this.getUser()

  

  },


})
