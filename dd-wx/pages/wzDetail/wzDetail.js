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
    type1:'',
    date1:'',
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
  onLoad(options) {
    let t = this;
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1 < 10 ? "0" + String(now.getMonth() + 1) : now.getMonth() + 1;
    let date=now.getDate()<10?'0'+now.getDate():now.getDate()
    console.log(options.id)
    t.setData({
      datein:now.getDate(),
      year: year,
      month: Number(month),
      isToday: '' + year + month + date,
      id:options.id
    });
    t.dateInit();
  
    

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

  getDaysInOneMonth(year, month){ 
    month = parseInt(month, 10); 
    var d= new Date(year, month, 0); 
    return d.getDate(); 
   },
  getFirst(id,data){
    console.log(id)
    var that=this
    api._get('/ding/csStats/'+id+'/'+data)
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
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1 < 10 ? "0" + String(now.getMonth() + 1) : now.getMonth() + 1;
    console.log(this.data.id)

this.getFirst(this.data.id,year+'-'+month)
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
    console.log(yesdate)
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
    t.getFirst(t.data.id,year+'-'+ month )
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
    t.getFirst(t.data.id,year+'-'+ month )
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



});
