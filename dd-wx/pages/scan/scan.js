
const api = require('../../utils/api.js')
Page({
  data: {
    userlist:[],
    show:false,
    username:'请选择负责人'
  },
  onLoad(options) {
    console.log(options)
    this.setData({
      scanid:options.id,
      scane1:options.name,
      // username:options.people
    })
  },
  getlist(){
    api._get('/ding/userList/'+wx.getStorageSync('username'))
    .then(res=>{
      console.log(res)
      if(res.code==200){
        this.setData({
          userlist:res.data
        })
      }
    })
   },
   onShow(){
      this.getlist()
   },
   showuser(){
     this.setData({
       show:true
     })
   },
   select(e){
    this.setData({
      username:e.currentTarget.dataset.name,
      id:e.currentTarget.dataset.id,
      show:false
    })
   },
   scane(e){
    this.setData({
      scane1:e.detail.value
    })
   },
   save(){
     console.log(this.data.scanid)
     if(this.data.scanid==undefined){
       if(this.data.username=='请选择负责人'){
          wx.showToast({
            title: '请选择负责人',
            icon:'none'
          })
       }else{
        api._post('/ding/addScene',{
          name:this.data.scane1,
          principalId:this.data.id,
          schoolId:wx.getStorageSync('schoolIdId')
         })
         .then(res=>{
           console.log(res)
           if(res.code==200){
             wx.showToast({
               title: '添加成功',
               icon:'none'
             })
             wx.navigateBack({
              complete: (res) => {},
            })
           }else{
            wx.showToast({
              title: res.msg,
              icon:'none'
            })
           }
         })
       }
  
     }else{
      api._post('/ding/updateScene',{
        name:this.data.scane1,
        principalId:this.data.id,
        sceneId:this.data.scanid
       })
       .then(res=>{
         console.log(res)
         if(res.code==200){
           wx.showToast({
             title: '更新成功',
             icon:'none'
           })
           wx.navigateBack({
            complete: (res) => {},
          })
         }else{
          wx.showToast({
            title: res.msg,
            icon:'none'
          })
         }
       })
     }
    
   },
   cancel(){
     wx.navigateBack({
       complete: (res) => {},
     })
   },
   onPullDownRefresh(){
    this.getlist()
    wx.stopPullDownRefresh()
   },
});
