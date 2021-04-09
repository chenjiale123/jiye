const api = require('../../utils/api.js')
var app=getApp()
Page({
  data: {},
  onLoad(options) {
    this.setData({
      scanid:options.id,
      name:options.name
    })
   app.globalData.scanid=options.id
  },
  edit(){
   
     wx.navigateTo({
  url: '../editObject/editObject'
})
  },
  detail(e){
     if(wx.getStorageSync('type')==8){
      wx.navigateTo({
         url: '../messages1/messages1?id='+e.currentTarget.dataset.id
         })
     }else{
      wx.navigateTo({
         url: '../detail/detail?id='+e.currentTarget.dataset.id
         })
     }

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
onShow(){
   this.getlist()
},

  del(){
    wx.showModal({
      title: '删除对象',
      content: '确定要删除该对象？',
      showCancel: true,//是否显示取消按钮
      cancelText:"否",//默认是“取消”
      cancelColor:'#999',//取消文字的颜色
      confirmText:"是",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色
      success: function (res) {
         if (res.cancel) {
            //点击取消,默认隐藏弹框
         } else {
          
           
         }
      },
      fail: function (res) { },
      complete: function (res) { },
   })
   },
   onPullDownRefresh(){
      this.getlist()
      wx.stopPullDownRefresh()
     },
});
