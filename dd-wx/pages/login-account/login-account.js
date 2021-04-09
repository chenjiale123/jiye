import {hexMD5} from '../../assert/md5'
let app = getApp();
Page({
  data: {
    loading: false, eyy: true, disabled: true, 
    tpAccountId: '', password: '', account: '', query: {},
    eyyImg: 'https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/a5afc904a7dbd1cbadb22ff6edef1cb7-56-56.png',
  },
  onLoad(query) {
    let {tpAccountId} = query
    this.setData({query})
    if (tpAccountId) {
      this.setData({tpAccountId})
      wx.setStorage({key: 'tpAccountId', data: tpAccountId})
    } else {
      wx.getStorage({ 
        key: 'tpAccountId', success: res => {
          this.setData({tpAccountId: res.data})
        }
      })
    }
  },
  // 登录
  login(e) {
    let {account, password} = e.detail.value
    if (account.length < 11 || password < 6) {
      this.toast('', '密码错误，请核对后重试')
    } else {
      let {tpAccountId} = this.data
      this.setData({loading: true})
      this.doLogin(account, hexMD5(password), tpAccountId)
    }
  },
  doLogin(phone, password, tpAccountId) {
    let httpUrl = app.globalData.httpUrl
    wx.request({
      url: httpUrl + '/account/appMp/doLogin',
      method: 'POST',
      data: {phone, password, tpAccountId, from: 'dd'}, 
      success: res => {
        let {resultCode, msg, data} = res.data
        console.log(res)
        wx.setStorage({key: 'phone', data: phone})
        this.data.query.tpAccountId && dd.setStorage({key: 'code', data: password})
        if (resultCode == '999') {
          wx.showToast({
            type: 'success',
            content: '登录成功',
            success: () => {
              this.setData({loading: false})
              wx.navigateTo({
                url: `/page/reset-password/reset-password?newUser=true`
              })
            },
          });
        } else if (resultCode == '100') {
          this.setData({loading: false})
          wx.showToast({
            type: 'success',
            content: '登录成功',
            success: () => {
              wx.setStorage({key: 'token', data: data.token})
              wx.switchTab({url: '/page/home/home'})
            },
          });
        } else {
          this.toast('', msg)
          this.setData({loading: false})
        }
      },
      fail: res => {
        console.log(res)
        this.toast('', '密码错误，请核对后重试')
        this.setData({loading: false})
      },
    })
  },
  // 轻提示
  toast(title, content) {
    wx.alert({
      title,
      content,
      buttonText: '我知道了',
    });
  },
  // 暂存账号
  setAccount(e) {
    let account = e.detail.value
    this.setData({account})
    this.setBtn()
  },
  // 暂存密码
  setPassword(e) {
    let password = e.detail.value
    this.setData({password}, () => {this.setEyy()})
    this.setBtn()
  },
  // 明文密码切换
  tempEyy() {
    const {eyy} = this.data
    this.setData({eyy: !eyy}, () => {this.setEyy()})
  },
  // 登录按钮是否可以点击
  setBtn() {
    const {account, password} = this.data
    if (account.length > 0 && password.length > 0) {
      this.setData({disabled: false})
    } else {
      this.setData({disabled: true})
    }
  },
  // eyy图标切换
  setEyy() {
    const {password, eyy} = this.data
    if (password.length == 0) {
      eyy ? this.setData({eyyImg: this.eyyImgs[0]}) : this.setData({eyyImg: this.eyyImgs[2]})
    } else {
      eyy ? this.setData({eyyImg: this.eyyImgs[1]}) : this.setData({eyyImg: this.eyyImgs[3]})
    }
  }, 
  // eyy图标
  eyyImgs: [
    'https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/a5afc904a7dbd1cbadb22ff6edef1cb7-56-56.png',
    'https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/cae5cacab2932ac7f6da4a8e20fe76d0-56-56.png',
    'https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/39ec0a62a56c06206a3653a73b5d07bc-56-56.png',
    'https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/b59713281a6e015febcbfdfd2f94b0a0-56-56.png'
  ],
});
