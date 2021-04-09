const api = require('../../utils/api.js')


Page({
  data: {
    currentTab:0,
    xian:false,
    show:false,
    items: [
      {name: '消毒液', value: '消毒液'},
      {name: '个人防护物资', value: '个人防护物资', checked: true},
    ],
    items1: [
      {name: '7天', value: '7天'},
      {name: '14天', value: '14天', checked: true},    
      {name: '21天', value: '21天'},
      {name: '28天', value: '28天'},
  
    ],
    name1:'',
    point1:'',
    type1:'个人防护物资',
    date1:'14天',
        // 日历
        year: 0,
        month: 0,
        date: ['日', '一', '二', '三', '四', '五', '六'],
        dateArr: [],
        isToday: 0,
        isTodayWeek: false,
        todayIndex: 0,
        // 当前维度
        latitude: "",
        // 当前精度
        longitude: "",
        yesDate: [20200501, 20200511, 20200512, 20200508],  //此处应该是接口返回的数据，先模拟了一个
        signinNow: false,
        listWz:[],
        count1:undefined,
        id:''
  },
  onLoad() {
    let t = this;
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1 < 10 ? "0" + String(now.getMonth() + 1) : now.getMonth() + 1;
    let date=now.getDate()<10?'0'+now.getDate():now.getDate()
    t.dateInit();
    t.setData({
      datein:now.getDate(),
      year: year,
      month: Number(month),
      isToday: '' + year + month + date
    });
    console.log(this.data.isToday)
    t.yesdate()
   
    if(this.data.month==(now.getMonth() + 1 < 10 ? "0" + String(now.getMonth() + 1) : now.getMonth() + 1)){
      t.setData({
        datein:now.getDate(),
      })
    }else{
      t.setData({
        datein:0
      })
    }
  },
  cancel(e){
   this.setData({
     xian:false
   })
  }, 


  del(e){
    var that=this
wx.showModal({
    cancelColor: '#999',
    cancelText: '取消',
    complete: (res) => {},
    confirmColor: '#3296FA',
    confirmText: '确定',
    content: '确定删除物资吗？',
    fail: (res) => {},
    showCancel: true,
    success: (result) => {
      if(result.confirm==true){
        api._get('/ding/deleteSupplies/'+e.currentTarget.dataset.id)
        .then(res=>{
          console.log(res)
          if(res.code==200){
            wx.showToast({
              title: '删除成功',
              icon:'none'
            })
            that.getWZ()
          }
        })
      }

    },
    title: '提示',
  })
  },
  detail(e){
  //  this.setData({
 
  //   id:e.currentTarget.dataset.id
  //  })
   let t = this;
   let now = new Date();
   let year = now.getFullYear();
   let month = now.getMonth() + 1 < 10 ? "0" + String(now.getMonth() + 1) : now.getMonth() + 1;
  //  this.getFirst(year+'-'+ month )
   console.log(e.currentTarget.dataset.id)
   wx.navigateTo({
     url: '../wzDetail/wzDetail?id='+e.currentTarget.dataset.id,
   })
  },
  getDaysInOneMonth(year, month){ 
    month = parseInt(month, 10); 
    var d= new Date(year, month, 0); 
    return d.getDate(); 
   },
  getFirst(data){
    var that=this
    api._get('/ding/csStats/'+this.data.id +'/'+data)
    .then(res=>{
      console.log(res)
      if(res.code==200){
        var a=[]
        this.setData({
          datearr:res.data
        })
        for(let i in res.data ){
a.push(Number (res.data[i].date.replace(/\-/g, "")))
        }
     
    
        console.log(this.data.yesDate)
        console.log(data.split('-')[0],data.split('-')[1])
        var day=   this.getDaysInOneMonth(data.split('-')[0],data.split('-')[1])
     
         this.setData({
           dayone:day,
           yesDate: a
         })

         that.yesdate()
      }
    })
  },
  onShow(){

this.getWZ()
  },
   // 签到
   signIn() {
    let t = this;
    t.getLocation();
  },
  // 获取用户当前地理位置
  getLocation() {
    let t = this;
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        t.setData({
          latitude: latitude,
          longitude: longitude
        });
        t.activeSign()
      }
    })
  },
  // 是否可以签到
  activeSign() {
    let t = this;
    let nowdate = t.data.isToday;
    let dateArr = t.data.dateArr;
    let yesDate = t.data.yesDate;
    for (var i = 0; i < dateArr.length; i++) {
      if (dateArr[i].isToday == nowdate) {
        dateArr[i].choose = true;
        yesDate.push(nowdate);
     
        t.setData({
          signinNow: true,
          yesDate: yesDate
        })
      }
    };
    t.setData({
      dateArr: dateArr
    })
  },
  // 签到过

  // 已签到日期
  yesdate() {
    let t = this;
    let yesdate = t.data.yesDate;
    let dateArr = t.data.dateArr;
    for (var i = 0; i < dateArr.length; i++) {
      for (var j = 0; j < yesdate.length; j++) {
        if (dateArr[i].isToday == yesdate[j]) {
          dateArr[i].choose = true;
        }
      };
    }
    t.setData({
      dateArr: dateArr
    })
  },
  // 日历
  dateInit: function (setYear, setMonth) {
    let t = this;
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = []; //需要遍历的日历数组数据
    let arrLen = 0; //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth() //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay(); //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
    let obj = {};
    let num = 0;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1 < 10 ? '0' + String(i - startWeek + 1) : String(i - startWeek + 1);
        obj = {
          isToday: '' + year + ((month + 1) < 10 ? "0" + (month + 1) : (month + 1)) + num,
          dateNum: num,
          weight: 5,
          choose: false
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    t.setData({
      dateArr: dateArr
    })
    console.log(dateArr)
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1);
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    if (nowYear == getYear && nowMonth == getMonth) {
      t.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      t.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    };
  },
  /**
   * 上月切换
   */
  lastMonth: function () {
    let now = new Date();
    let t = this;
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = t.data.month - 2 < 0 ? t.data.year - 1 : t.data.year;
    let month =t.data.month - 2 < 0 ? 11 : t.data.month - 2
    t.setData({
      year: year,
      month: (month + 1)
    })
    
    t.dateInit(year, month);
    t.yesdate()
    console.log(month)
    if(month + 1<10){
      month="0"+(month + 1)
    }else{
      month=month + 1
    }
 

   console.log(this.data.year)
    if(this.data.year==now.getFullYear()){
      if(this.data.month==(now.getMonth() + 1 < 10 ? "0" + String(now.getMonth() + 1) : now.getMonth() + 1)){
        t.setData({
          datein:now.getDate(),
          onlog:false
        })
      }else{
        t.setData({
          datein:0,
          onlog:true
        })
      }
    }else if(this.data.year<Number( now.getFullYear())){
      t.setData({
        datein:t.  getDaysInOneMonth(year, month),
        onlog:true,
      
      })
    }
    t.getFirst(year+'-'+ month )
  },
  /**
   * 下月切换
   */
  nextMonth: function () {
    let now = new Date();
    let t = this;
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = t.data.month > 11 ? t.data.year + 1 : t.data.year;
    let month = t.data.month > 11 ? 0 : t.data.month;
    t.setData({
      year: year,
      month: (month + 1)
    })
    t.dateInit(year, month);
    t.yesdate()
    console.log(month)
    if(month + 1<10){
      month="0"+(month + 1)
    }else{
      month=month + 1
    }

    if(this.data.year==now.getFullYear()){
      if(this.data.month==(now.getMonth() + 1 < 10 ? "0" + String(now.getMonth() + 1) : now.getMonth() + 1)){
        t.setData({
          datein:now.getDate(),
          onlog:false
        })
      }else{
        t.setData({
          datein:0,
          onlog:true
        })
      }
    }else if(this.data.year<now.getFullYear()){
      t.setData({
        datein:t.  getDaysInOneMonth(year, month),
        onlog:true,
      })
    }
    t.getFirst(year+'-'+ month )
  },
//点击切换
clickTab: function (e) {
  var that = this;
  if (this.data.currentTab === e.target.dataset.current) {
    return false;
  } else {
    that.setData({
      currentTab: e.target.dataset.current,
    })
  }
},
getWZ(){
api._get('/ding/supplies/'+wx.getStorageSync('schoolIdId'))
.then(res=>{
  console.log(res)
  if(res.code==200){
    // 
    this.setData({
      listWz:res.data
    })
   
  }
})
},
deal(){
  this.setData({
    show:true
  })
},
add(){
  this.setData({
    xian:true
  })
},
name(e){
  this.setData({
    name1:e.detail.value
  })
},
point(e){
  this.setData({
    point1:e.detail.value
  })
},
radioChange(e){
  console.log(e)
  this.setData({
   type1:e.detail.value
  })
},
radioChange1(e){
  this.setData({
   date1:e.detail.value.replace("天","")
  })
},
count(e){
  this.setData({
    count1:e.detail.value
  })
},
 juli(lat1, lng1, lat2, lng2) {
  console.log(lat1, lng1, lat2, lng2)
  var radLat1 = lat1 * Math.PI / 180.0;
  var radLat2 = lat2 * Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  return s
},

getLocation1() {
  var that=this
  var that=this
  var data=new Date()
  var hours,minutes,seconds
  if(data.getHours()<10){
 hours="0"+data.getHours()
  }else{
    hours=data.getHours()
  }
if(data.getMinutes()<10){
minutes="0"+data.getMinutes()
}else{
minutes=data.getMinutes()
}
if(data.getSeconds()<10){
seconds="0"+data.getSeconds()
}else{
seconds=data.getSeconds()
}
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      // 经纬度
      var latitude = res.latitude
      var longitude = res.longitude
    
      var data=  that.juli(res.latitude,res.longitude,Number(wx.getStorageSync('address').split(',')[1]), Number(wx.getStorageSync('address').split(',')[0]) )


      console.log(data)
      if(data<100){
         if(that.data.clock==false){
       if(that.data.count1!==undefined){
         api._post('/ding/clockSupplies',{
          suppliesId:that.data.id,
          count:Number(that.data.count1),
          date:new Date().getFullYear()+'-'+(Number(new Date().getMonth())+1)+'-'+new Date().getDate() +' '+hours+':'+
          minutes+':'+seconds,
         })
         .then(res=>{
           console.log(res)
           if(res.code==200){
             wx.showToast({
               title: '添加成功',
               icon:'none'
             })
             that.getWZ()
           }
         })
       }else{
        wx.showToast({
          title: '请输入数量',
          icon:'none'
        })
       }
  }else{
    wx.showToast({
      title: '今天已经上传过',
      icon:'none'
    })
  }
      }else{
        wx.showToast({
          title: '距离超过打卡范围，不能打卡',
          icon:'none'
        })
      }
    },
    fail: function () {
      wx.showToast({
        title: '授权失败',
        icon: 'success',
        duration: 1000
      })
    }
  })
},
upload(e){
  var that=this
  var data=new Date()
  var hours,minutes,seconds
  if(data.getHours()<10){
 hours="0"+data.getHours()
  }else{
    hours=data.getHours()
  }
if(data.getMinutes()<10){
minutes="0"+data.getMinutes()
}else{
minutes=data.getMinutes()
}
if(data.getSeconds()<10){
seconds="0"+data.getSeconds()
}else{
seconds=data.getSeconds()
}
this.setData({
  clock:e.currentTarget.dataset.clock,
  id:e.currentTarget.dataset.id
})

 console.log(wx.getStorageSync('address'))
 wx.getSetting({
  success: (res) => {
    if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
      wx.showModal({
        title: '是否授权当前位置',
        content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
        success: function (res) {
          if (res.cancel) {
            that.setData({
              isshowCIty: false
            })
            wx.showToast({
              title: '授权失败',
              icon: 'success',
              duration: 1000
            })
          } else if (res.confirm) {
            wx.openSetting({
              success: function (dataAu) {
                if (dataAu.authSetting["scope.userLocation"] == true) {
                  wx.showToast({
                    title: '授权成功',
                    icon: 'success',
                    duration: 1000
                  })
                  //再次授权，调用getLocationt的API
                  that.getLocation1();
                } else {
                  wx.showToast({
                    title: '授权失败',
                    icon: 'error',
                    duration: 1000
                  })
                }
              }
            })
          }
        }
      })
    } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
          that.getLocation1();
    }
    else  { //授权后默认加载
          that.getLocation1();
    }
  }
})



 
},
sure(){
 api._post('/ding/supplies',{
  name:this.data.name1,
  unit:this.data.point1,
  type:this.data.type1,
  // count:'',
  clockInterval:Number(this.data.date1) ,
  schoolId:wx.getStorageSync('schoolIdId')
 })
 .then(res=>{
   console.log(res)
   if(res.code==200){
     this.setData({
      xian:false
     })
     wx.showToast({
       title: '添加成功',
       icon:'none'
     })
     this.getWZ()
   }else{
    wx.showToast({
      title: res.msg,
      icon:'none'
    })
   }
 })
},
onPullDownRefresh(){
  this.getWZ()
  wx.stopPullDownRefresh()
}
});
