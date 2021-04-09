const api = require('../../utils/api.js')
var app=getApp()
Page({
   data: {
      objlist: []
   },
   onLoad(options) {
      this.setData({
         scanid: options.id
      })
      app.globalData.scanid=options.id
     

   },
   add() {
      wx.navigateTo({
         url: '../editObject/editObject?id=' + this.data.scanid
      })
   },
     detail(e){
      wx.navigateTo({
   url: '../detail/detail?id=' + e.currentTarget.dataset.id
   })
   },
   onShow() {
      this.getlist()
   },
   del(e) {
      var that = this
      console.log('12132')
      wx.showModal({
         title: '提示',
           content: "确认删除对象吗",//提示内容
           confirmColor: '#2EA7E0',//确定按钮的颜色
            success (res) {
            if (res.confirm) {
               console.log('用户点击确定按钮')
               api._get('/ding/deleteDo/' + e.currentTarget.dataset.id)
               .then(res => {
                  console.log(res)
                  if (res.code == 200) {
                     wx.showToast({
                        title: '删除成功',
                        icon: 'none'
                     })
                     that.getlist()
                  }
               })
             } else if (res.cancel) {
               console.log('用户点击取消按钮')
             }
           }
         })
 
   },
   getlist() {
      api._get('/ding/doList/' + this.data.scanid)
         .then(res => {
            console.log(res)
            if (res.code == 200) {
               this.setData({
                  objlist: res.data
               })

            }
         })
   },
   onPullDownRefresh(){
      this.getlist()
      wx.stopPullDownRefresh()
     },
});