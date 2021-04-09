
const api=require('../../utils/api')
Page({
  data: {
    items: [{
        name: '擦拭',
        value: '擦拭',
        checked: true
      },
      {
        name: '喷洒',
        value: '喷洒'
      },
      {
        name: '浸泡',
        value: '浸泡'
      },
      {
        name: '拖洗',
        value: '拖洗'
      },
      {
        name: '通风',
        value: '通风'
      },
      {
        name: '照射',
        value: '照射',
      },
    ],

    items1: [{
        name: '10分钟',
        value: '10分钟',
        checked: true
      },
      {
        name: '20分钟',
        value: '20分钟'
      },
      {
        name: '30分钟',
        value: '30分钟'
      },
      {
        name: '40分钟',
        value: '40分钟'
      },
      {
        name: '50分钟',
        value: '50分钟'
      },
      {
        name: '60分钟',
        value: '60分钟',
      },
    ],
    items2: [{
        name: '施康消毒液',
        value: '施康消毒液'
      },
      {
        name: '84消毒液',
        value: '84消毒液',
        checked: true
      },

    ],
    danwei:['AM','PM'],
    items3: [{
        name: '1:200',
        value: '1:200'
      },
      {
        name: '1:250',
        value: '1:250',
        checked: true
      },
      {
        name: '1:300',
        value: '1:300'
      },
      {
        name: '1:350',
        value: '1:350'
      },
      {
        name: '1:400',
        value: '1:400'
      },

    ],
    items4: [{
        name: '1天',
        value: '1天'
      },
      {
        name: '2天',
        value: '2天',
        checked: true
      },
      {
        name: '3天',
        value: '3天'
      },


    ],
    time: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', ],
    show: false,
    show1: false,
    show2: false,
    show3: false,
    obj1:'',
    bata:100000,
    time1:'10分钟',
    type1:'84消毒液',
    name1:'1:250',
    data1:'2',
    datatime:'00:00 AM',
    liyqid1:'0%'
   
  },
  onLoad(options) {
    var a = []
    var b = []
    for (var i = 0; i <= 60; i++) {
      if (i < 10) {
        i = "0" + i
      } else {
        i = "" + i
      }
      a.push(i)
    }
    for (var j = 1; j <= 12; j++) {
      if (j < 10) {
        j = "0" + j
      } else {
        j = "" + j
      }
      b.push(j)
    }
    console.log(a)
    this.setData({
      time: a,
      hour:b,
      scanid:options.id
    })
  },
  obj(e){
   this.setData({
     obj1:e.detail.value
   })
  },
  getArrEqual(arr1, arr2) {
    console.log(arr1, arr2);
    var a;
    let newArr = [];
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (i == 0) {
          if (arr1[i] == arr2[j]) {
       
            console.log(j + "1111111111111");
            a = j;
            newArr[a] = 1 ;
         
          } else {
            newArr[j] = 0;
          }
        }

        if (i > 0) {
          if (arr1[i] == arr2[j]) {
            newArr[j] = 1 ;
  
            a = j;
          }
        }
      }
    }
    return newArr;
  },
  onChange(e) {
    console.log(e);
 

    var a=["擦拭", "喷洒", "通风", "浸泡", "照射", "拖洗"] 
   var bata= this.getArrEqual(e.detail.value,a)
   console.log(Number(bata.join('')) )
   this.setData({
     bata:Number(bata.join('')) 
   })
  },
  timefor(e){
    console.log(e);
    this.setData({
      time1: e.detail.value,
    });
  },
  way() {
    this.setData({
      show: !this.data.show
    })
  },
  time() {
    this.setData({
      show1: !this.data.show1
    })
  },
  type() {
    this.setData({
      show2: !this.data.show2
    })
  },
  typefor(e){
    this.setData({
      type1: e.detail.value,
    });
  },
  namefor(e){
    this.setData({
      name1: e.detail.value,
    });
  },
  datafor(e){
    this.setData({
      data1: e.detail.value.replace("天","")
    });

  },
  liyqid(e){
    this.setData({
      liyqid1: e.detail.value,
    });
  },
  datachange(e){
  console.log(e)
  console.log(this.data.hour[e.detail.value[0]])
  console.log(this.data.time[e.detail.value[1]])
  console.log(this.data.danwei[e.detail.value[2]])
  this.setData({
    datatime:this.data.hour[e.detail.value[0]] +':'+this.data.time[e.detail.value[1]]+' '+this.data.danwei[e.detail.value[2]]
  })
  },
  cancel(){
wx.navigateBack({
  complete: (res) => {},
  delta: 0,
  fail: (res) => {},
  success: (res) => {},
})
  },
  save(){
    console.log(this.data.obj1)
  console.log(this.data.bata)
  console.log(this.data.time1)
  console.log(this.data.type1)
  console.log(this.data.name1)
  console.log(this.data.data1)      
  console.log(this.data.liyqid1)
  api._post('/ding/addDo',{
    name:this.data.obj1,
    disinfectType:this.data.bata,
    duration:this.data.time1,
    intervalTime:Number(this.data.data1) ,
    expireTime:this.data.datatime,
   
    sceneId: this.data.scanid,
    liquidName:this.data.type1,
    ratio:this.data.name1,
    level:this.data.liyqid1
// 添加对象
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
        delta: 0,
        fail: (res) => {},
        success: (res) => {},
      })
    }else{
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
    }
  })
  },
  today() {
    this.setData({
      show3: !this.data.show3
    })
  }
});