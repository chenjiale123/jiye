const api = require('../../utils/api.js')
Page({
  data: {

    show: 'none',
    list: []
  },
  onLoad() {},
  reject(e) {
    this.setData({
      show: 'block',
      id:e.currentTarget.dataset.id
    })
  },
  agree(e) {
    api._post('/ding/feedback/rdoc', {
        docId: e.currentTarget.dataset.id,
        pass: true,
        notPassReason: ''
      })
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: '同意成功',
            icon: 'none'
          })
          this.getlist()
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
  },
  reason(e) {
    this.setData({
      reason1: e.detail.value
    })
  },
  reject(e) {
    this.setData({
      show: 'block',
  id:e.currentTarget.dataset.id
    })
  },
  reject1(e) {
    console.log(this.data.id)
    api._post('/ding/feedback/rdoc', {
        docId: this.data.id,
        pass: false,
        notPassReason: this.data.reason1
      })
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: '拒绝成功',
            icon: 'none'
          })
          this.getlist()
          this.setData({
            show: 'none'
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
  },
  cancel() {
    this.setData({
      show: 'none'
    })
  },
  getlist() {
    api._get('/ding/repairDoc/' + wx.getStorageSync('username'))
      .then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            list: res.data
          })
        }

      })
  },
  onShow() {
    this.getlist()
  },
  onPullDownRefresh(){
    this.getlist()
    wx.stopPullDownRefresh()
  },
  cancel() {
    this.setData({
      show: 'none'
    })
  }
});