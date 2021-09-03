// index.js
// 获取应用实例
const app = getApp()
const api = require('../../utils/api')

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    navlist: [],
    bannerlist: [],
    itemList: [],
    hidden: true,

    loading: true,
    style: ' overflow: auto;   z-index: 9;  width: 100%;  height: 120rpx;   line-height: 110rpx;  background: #fff; border-bottom: 1px solid #f5f5f5;  box-sizing: border-box;',

    floatAreaTop: 0,
    isShowFloat: false,
    // current: 0,  //当前所在页面的 index

    // indicatorDots: true, //是否显示面板指示点

    // autoplay: true, //是否自动切换

    // interval: 3000, //自动切换时间间隔

    // duration: 800, //滑动动画时长

    // circular: true, //是否采用衔接滑动
  },
  getBanner() {
    api._get('/ecard/detail/videourl')
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            bannerlist: res.urls
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

  getList() {
    api._get('/ecard/category/list')
      .then(res => {
        console.log(res)
        if (res.code == 200) {


          this.setData({
            navlist: res.page.list
          })
          console.log(this.data.navlist)
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
  getHeight() {


    let that = this;
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        // 获取可使用窗口宽度
        let clientHeight = res.windowHeight;
        // 获取可使用窗口高度
        let clientWidth = res.windowWidth;
        // 算出比例
        let ratio = 750 / clientWidth;
        // 算出高度(单位rpx)
        let height = clientHeight * ratio;
        // 设置高度
        that.setData({
          height: height
        });
      }
    })
  },

  newsList(e) {
    //  wx.navigateTo({
    //    url:   "../artDetail/artDetail?id="+e.currentTarget.dataset.id,
    //    complete: (res) => {},

    //    fail: (res) => {},
    //    success: (result) => {},
    //  })
   app.globalData.artid=JSON.stringify(e.currentTarget.dataset.id)

 
      wx.navigateTo({
        url: '../artDetail/artDetail?id=' + JSON.stringify(e.currentTarget.dataset.id),
        complete: (res) => {},

        fail: (res) => {},
        success: (result) => {},
      })
    

  },
  onLoad() {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },

  onReady() {
    this.videoCtx = wx.createVideoContext('myVideo') //根据id绑定
  },
  back() {
    wx.navigateBack({
      complete: (res) => {},
      delta: 0,
      fail: (res) => {},
      success: (res) => {},
    })
  },
  onShow() {

    let that = this;
    var query = wx.createSelectorQuery()
    query.select('#floatMirror').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      that.setData({
        floatAreaTop: res[0].top
      })
    })
    console.log(app.globalData.scroll,this.data.floatAreaTop)
    if (app.globalData.scroll >= 250) {
      this.setData({
        isShowFloat: true
      })
    } else {
      this.setData({
        isShowFloat: false
      })
    }
    this.getHeight()
    this.getList()
    this.getBanner()
    if (wx.getStorageSync('tab') == undefined || wx.getStorageSync('tab') == '') {
      this.getItem(this.data.currentTab + 1)
    } else {
      this.setData({
        currentTab: wx.getStorageSync('index')
      })
      this.getItem(wx.getStorageSync('tab'))
    }

  },
  bindChange: function (e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },
  getItem(item) {
    api._get('/ecard/item/list/' + item)
      .then(res => {
        console.log(res)
        if (res.code == 200) {


          for (let i in res.list) {
            if (res.list[i].createTime !== null) {
              console.log(res.list[i].createTime.split(' ')[0])
              res.list[i].createTime = res.list[i].createTime.split(' ')[0]
            } else {
              res.list[i].createTime = ''
            }

          }

          this.setData({
            itemList: res.list,

            loading: false
          })


        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
  },


  onPageScroll: function (e) {
    var scrollTop = e.scrollTop
    console.log(app.globalData.scroll)
    app.globalData.scroll=e.scrollTop
    if (scrollTop >= 243) {
      this.setData({
        isShowFloat: true
      })
    } else {
      this.setData({
        isShowFloat: false
      })
    }



  },
  /** 
   * 点击tab切换 
   */
  currentTab: function (e) {
    var that = this
    console.log(this.data.currentTab, e.currentTarget.dataset.idx)
    if (this.data.currentTab == e.currentTarget.dataset.idx) {
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    wx.setStorageSync('tab', e.currentTarget.dataset.id.id)
    wx.setStorageSync('index', e.currentTarget.dataset.idx)
    console.log(e.currentTarget.dataset.id.id)
    that.getItem(e.currentTarget.dataset.id.id)


  },
  onShareAppMessage(){
    return {
      title: '干货',
      desc: '干货描述',
      path: '/pages/article/article?userId=' + app.globalData.id // 路径，传递参数到指定页面。
    }
  }


})