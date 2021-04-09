
let app = getApp()
const api=require('../../utils/api')
Page({
  data: {
 
    hidden: 'none',
    backlist:[],
    xian:false
  },
  onLoad(query) {
  
  },
  onShow(){
     this. getlist()
    this.getBack()
  },
  sure(){
    this.setData({
      xian:false
    })
  },
   change(){
    console.log('4444')
    this.setData({
      hidden:"edit"
    })
   },
   edit(){
   wx.navigateTo({
  url: '../scan/scan'
})
   },
   detail(){
     console.log('2222')
   wx.navigateTo({
     url: '../object1/object1',
     complete: (res) => {},
  
     fail: (res) => {},
     success: (result) => {},
   })
   },
   del(){
    wx.showModal({
      title: '删除场景',
      content: '确定要删除该场景？',
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
   obj(e){
    wx.navigateTo({
   url: '../object1/object1?id='+e.currentTarget.dataset.id+'&name='+e.currentTarget.dataset.name
 })
    },
    getBack(){
      api._get("/ding/feedback/"+wx.getStorageSync('username'))
      .then(res=>{
        console.log(res)
        if(res.code==200){
          this.setData({
            backlist:res.data
          })
          if(res.data.length>0){
            this.setData({
              xian:true
            })
          }
        }
      })
    },
   getlist(){
    api._get("/ding/sceneList/"+wx.getStorageSync('username'))
    .then(res=>{
      if(res.code==200){
        console.log(res)
        this.setData({
          scean:res.data
        })
      }
    })
  },
  onPullDownRefresh(){
    this.getlist()
    wx.stopPullDownRefresh()
   }
  
});
