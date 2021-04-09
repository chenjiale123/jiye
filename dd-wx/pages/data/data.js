// pages/data/data.js
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:false,
    name:'1月',
id:"01" ,
    options:[{
      id: '01',
      name: '1月'
    }, {
      id: '02',
      name: '2月'
    }, {
      id: '03',
      name: '3月'
},{
  id: '04',
  name: '4月'
},{
  id: '05',
  name: '5月'
},{
  id: '06',
  name: '6月'
}, {
  id: '07',
  name: '7月'
}, {
  id: '08',
  name: '8月'
},{
id: '09',
name: '9月'
},{
id: '10',
name: '10月'
},{
  id: '11',
  name: '11月'
  },{
  id: '12',
  name: '12月'
  }],
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
      hidden:false,
      name:e.currentTarget.dataset.name,
      id:e.currentTarget.dataset.id
    })
   },
   down() {
   api._get('/ding/downloadExcel/'+wx.getStorageSync('schoolIdId')+'/'+ new Date().getFullYear()+'-'+ this.data.id,)
   .then(res=>{
     console.log(res)
    //  if(res.code==200){
wx.downloadFile({
      url:api.baseUrl+res,
      header: {
        // 'content-type':  'application/x-download',
        'Authorization':wx.getStorageSync('token'),
    
      },
      success: function (res) {
        console.log(res)
        const tempFilePath = res.tempFilePath;
        var savePath = wx.env.USER_DATA_PATH + "/" + '2021'
        // 保存文件
        wx.saveFile({
          tempFilePath,
          filePath: savePath+'.xlsx', 
          success: function (res) {
            console.log(res)
            const savedFilePath = res.savedFilePath;
            // 文件预览
            wx.openDocument({
              filePath: savedFilePath,
              
              success: function (res) {
                console.log(res)
                // console.log('打开文档成功')
                wx.showToast({
                  title: '文件位置'+ savedFilePath,
                  icon:'none'
                })
              },
              
            });
          },
          fail: function (err) {
            console.log('保存失败：', err)
          }
        });
      },
      fail: function (err) {
        console.log('下载失败：', err);
      },
    });
    //  }else{
    //    wx.showToast({
    //      title: res.msg,
    //      icon:'none'
    //    })
    //  }
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
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
      console.log('22222')
    this.getTabBar().setData({
     selected: 2
   
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