// pages/artDetail/artDetail.js
const api = require('../../utils/api')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    detail: [],
    bannerlist:[],
    videoUrl:'',
    detailList:[]
  },
  getBanner(){
    api._get('/ecard/detail/videourl')
    .then(res=>{
      console.log(res)
      if(res.code==200){
        this.setData({
          bannerlist:res.urls
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
  },
  videoPlay: function (e) {
    console.log('点击播放');
    console.log(e);
    //隐藏封面图和播放图标
    this.setData({
        tab_image: "none" //tab_image 来控制封面图 
      }),
      this.videoCtx.play();
  },
  onReady() {
    this.videoCtx = wx.createVideoContext('myVideo') //根据id绑定
  },
  priview(event){
 
      console.log(event.currentTarget.dataset.src)
      let currentUrl = event.currentTarget.dataset.src
      wx.previewImage({
        current: currentUrl, // 当前显示图片的http链接
        urls: [currentUrl] // 需要预览的图片http链接列表
      })
    },

  getNewsList() {
    api._get("/ecard/detail/" + this.data.id.id)
      .then(res => {
        console.log(res)
        if (res.code == 200) {
     

            this.setData({
          detail:    res.detail[0].resource==null?[] :res.detail[0].resource.split('0xff'),
              videoUrl:res.detail[0].videoUrl
            })
            var arr=[]
            for(var i=0; i<this.data.detail.length; i++){
                  

              if(this.data.detail[i].indexOf('https')==-1){
                // arr[i].type=1
                arr.push({
                  type:1,
                  resource:this.data.detail[i]
                })
              }else{
                arr.push({
                  type:2,
                  resource:this.data.detail[i]
                })
              }
  
            }
            this.setData({
              detailList:arr
            })
            console.log(this.data.detailList)

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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    console.log( JSON.parse(app.globalData.artid) )
    if(options.id!==undefined){
      this.setData({
        id: JSON.parse(options.id)
      })
    }else{
      this.setData({
        id:  JSON.parse(app.globalData.artid)
      })
    }
   
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getNewsList()
    this.getBanner()
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
    wx.switchTab({
      url: '../article/article'
    })
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
  onShareAppMessage: function (res) {
    console.log(this.data.id)
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: "干货详情",
      path: "pages/artDetail/artDetail?id="+JSON.stringify(this.data.id)
    }
  }
})