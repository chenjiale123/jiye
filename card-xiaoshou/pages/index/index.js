// index.js
// 获取应用实例
const app = getApp()
const api = require('../../utils/api')
Page({
      data: {
        user: {},
        num: 0,
        agree: '../../image/agree.png',
        txtcolor: '#000',
        id: 25,
        //16
        playIcon: '../../image/voice.jpg',
        isPlaying: false,
        videoSrc: 'https://jileaf.oss-cn-hangzhou.aliyuncs.com/image/playimg.jpg'
      },
      preview(e){
        console.log(e)
        wx.previewImage({
          current: e.currentTarget.dataset.img, //当前图片地址
          urls:  [e.currentTarget.dataset.img],  //所有要预览的图片的地址集合数组形式
          success: function (res) { 
     
          },
          fail: function (res) { },
          complete: function (res) { },
        })
 
      },
      bd(){
    wx.showToast({
      title: 'title',
    })
      },
      share() {
        wx.navigateTo({
          url: '../share/share?id=' + this.data.id,
          complete: (res) => {},

          fail: (res) => {},
          success: (result) => {},
        })
      },
      end() {
        this.setData({
          videoSrc: 'https://jileaf.oss-cn-hangzhou.aliyuncs.com/image/playimg.jpg'
        })
      },
      onReady() {
        this.AudioContext = wx.createAudioContext('myAudio');
      },
      audioClick() {
        this.setData({
          isPlaying: !this.data.isPlaying
        })
        if (this.data.isPlaying) {
          this.AudioContext.play();
          this.setData({
            videoSrc: 'https://jileaf.oss-cn-hangzhou.aliyuncs.com/image/%E9%9F%B3%E9%A2%91GIF.gif'
          })
        } else {
          this.AudioContext.pause();
          this.setData({
            videoSrc: 'https://jileaf.oss-cn-hangzhou.aliyuncs.com/image/playimg.jpg'
          })
        }
      },
      savePhone() {
        wx.addPhoneContact({
          firstName: this.data.user.username,
          mobilePhoneNumber: this.data.user.mobile,
          organization: this.data.user.companyName,
          title: this.data.user.position,
          email: this.data.user.email,
          success(res) {
            console.log(res)
          },
          fail() {

          }
        })

      },
      freeTell: function () {

        wx.makePhoneCall({

          phoneNumber: this.data.user.mobile,

        })

      },


      upDataApp: function () { //版本更新

          if (wx.canIUse('getUpdateManager')) { //判断当前微信版本是否支持版本更新

            const updateManager = wx.getUpdateManager();

            updateManager.onCheckForUpdate(function (res) {
                console.log(res)
              if (res.hasUpdate) { // 请求完新版本信息的回调

                updateManager.onUpdateReady(function () {

                  wx.showModal({

                    title: '更新提示',

                    content: '新版本已经准备好，是否重启应用？',

                    success: function (res) {

                      if (res.confirm) { // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启

                        updateManager.applyUpdate()

                      }

                    }

                  })


                })
              }
            })
          }
        },


              cardCode() {
                  wx.navigateTo({
                    url: '../cardCode/cardCode?id=' + this.data.id,
                    complete: (res) => {},
                    fail: (res) => {},
                    success: (result) => {},
                  })
                },
                getAgree() {
                  api._get('/ecard/user/like/' + this.data.id)
                    .then(res => {
                      console.log(res)
                      if (res.code == 200) {
                        wx.showToast({
                          title: '点赞成功',
                          icon: 'none'
                        })

                        this.getUser()
                        this.setData({
                          agree: '../../image/agree1.png',
                          txtcolor: '#1296db'
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
                getUser(option) {
                  api._get('/ecard/user/staffInfo/' + this.data.id)
                    .then(res => {
                      console.log(res)
                      if (res.code == 200) {
                        this.setData({
                          user: res.staffInfo
                        })
                        wx.setStorageSync('id', res.staffInfo.userId)
                        wx.setNavigationBarTitle({
                          title: res.staffInfo.username + '的名片'
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
                
                onLoad(options) {
                  console.log(options)
                  if (options.type) {
                    this.setData({
                      id: options.userId,
                      openid:options.openid
                    })
            
                  }else{
                    // this.setData({
                    //   id: app.globalData.id,
                    //   openid:app.globalData.openid
                    // })
                    wx.navigateTo({
                      url: '../wxlogin/wxlogin',
                    })
                  }

                   if(this.data.id!==""){
                    api._post('/ecard/user/loginLog',{
                      openid:this.data.openid,
                   staffId:this.data.id,
                   mobile:wx.getStorageSync('phone')
  
                    })
                    .then(res=>{
                      console.log(res)
                    })
                   }else{
                    api._post('/ecard/user/loginLog',{
                      openid:this.data.openid,
                   staffId:this.data.id,
                   mobile:wx.getStorageSync('phone')
  
                    })
                    .then(res=>{
                      console.log(res)
                    })
                   }
               


                },
                onShow() {
                  this.audioCtx = wx.createAudioContext('myAudio')
                  this.getUser()
                  this.upDataApp()


                },
                onShareAppMessage: function () {
                  return {
                    title: this.data.user.username + '的电子名片',
                    desc: this.data.user.username + '的电子名片',
                    path: '/pages/wxlogin/wxlogin?userId=' + app.globalData.id // 路径，传递参数到指定页面。
                  }
                }


            })