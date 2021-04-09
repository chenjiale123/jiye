
let app = getApp()
const api=require('../../utils/api')
Page({
  data: {
 
    hidden: 'none',
  },
  onLoad(query) {
  
  },
  onShow(){
    console.log( app.globalData.list)
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
 
    this.getTabBar().setData({
     selected: 0,
     list: [
      {
        "pagePath": "/pages/home/home",
        "text": "首页",
        "iconPath": "/image/home1.png",
        "selectedIconPath": "/image/home.png"
      },
      {
        "pagePath": "/pages/clock/clock",
        "text": "补卡申请",
        "iconPath": "/image/buka1.png",
        "selectedIconPath": "/image/buka.png"
      },
      {
        "pagePath": "/pages/messages/messages",
        "text": "物资储备",
        "iconPath": "/image/wuzi1.png",
        "selectedIconPath": "/image/wuzi.png"
      },
      {
        "pagePath": "/pages/my/my",
        "text": "设置",
        "iconPath": "/image/set1.png",
        "selectedIconPath": "/image/set.png"
      }
    ]
    })
   }
   this.getlist()
  },
  clase: function (e) {
    let that = this
    let index = 0;
    let array = this.data.scean;//获取循环数组对象
    for (let item of array) {
      //如果当前点击的对象id和循环对象里的id一致
      console.log(item.id , e.currentTarget.dataset.id)
      if (item.id == e.currentTarget.dataset.id) {
        //判断当前对象中的insert是否为true（true为显示，其他为隐藏） insert是新增的一个值然后进行判断
        console.log(array[index].insert)
        if (array[index].insert == "" || array[index].insert == undefined) {
          array[index].insert = "true"
        } else {
          array[index].insert = ""
        }
      }
      index++;
    }
    //将数据动态绑定 
    that.setData({
      scean: array
    })
  },
   edit(e){
   wx.navigateTo({
  url: '../scan/scan?id='+e.currentTarget.dataset.id+'&name='+e.currentTarget.dataset.name+'&people='+e.currentTarget.dataset.people
})
   },
   del(e){
    var that=this
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
           
           api._get('/ding/deleteScene/'+e.currentTarget.dataset.id)
           .then(res=>{
                     console.log(res)
                     if(res.code==200){
                       wx.showToast({
                         title: '删除成功',
                         icon:'none'
                       })
                       
                       that.getlist()

                     }else{
                      wx.showToast({
                        title: res.msg,
                        icon:'none'
                      })
                     }
           })
           
         }
      },
      fail: function (res) { },
      complete: function (res) { },
   })
   },
     obj(e){
   wx.navigateTo({
  url: '../object/object?id='+e.currentTarget.dataset.id
})
   },
   add(){
    wx.navigateTo({
      url: '../scan/scan'
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
