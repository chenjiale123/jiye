import {hexMD5} from '../../assert/md5'
let app = getApp();
Page({
  data: {
    loading: false,
    code: '',
    newUser: false,
    tpAccountId: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
  onLoad(query) {
    let {newUser} = query
    let tpAccountId = app.globalData.tpAccountId
    newUser && this.setData({newUser})
    this.setData({tpAccountId})
  },
  reset(e) {
    let {newUser} = this.data
    let {newPassword, confirmPassword, oldPassword} = e.detail.value
    let nLen = newPassword.length
    let cLen = confirmPassword.length
    let contain = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/.test(newPassword)
    if (nLen != cLen || newPassword != confirmPassword) {
      this.alert('两次输入的密码不一致')
      this.setData({oldPassword: '', newPassword: '', confirmPassword: ''})
    } else if (!contain || nLen < 6) {
      this.alert('请输入 6~20 位密码，需包含字母和数字')
      this.setData({oldPassword: '', newPassword: '', confirmPassword: ''})
    } else {
      wx.getStorage({key: 'token', success: res => {
        let token = res.data
        wx.getStorage({key: 'user', success: res => {
          let phone = res.data.username
          let params = {phone, password: hexMD5(newPassword), oldPassword: hexMD5(oldPassword), token}
          this.resetPassword(params)
        }})
      }})
    }
  },
  resetPassword(data) {
    let { phone, password } = data
    let {newUser} = this.data
    let {httpUrl} = app.globalData
    let url = newUser ? '/account/appMp/firstSetPassword' : '/account/appMp/updatePassword'
    wx.httpRequest({
      url: httpUrl + url,
      method: 'POST',
      data, 
      success: res => {
        let {data, msg, success} = res.data
        wx.removeStorage({key: 'code'})
        if (success) {
          wx.showToast({
            type: 'success',
            content: '修改成功',
            success: () => {
              newUser ? this.login(phone, password) : dd.reLaunch({
                url: '../homepage/homepage',
              })
            },
          });
        } else {
          this.alert(msg)
        }
      },
      fail: res => {
        this.setData({loading: false})
      }
    })
  },

  login(phone, password) {
    let {tpAccountId, newUser} = this.data
    let {httpUrl} = app.globalData
    wx.request({
      url: httpUrl + '/account/appMp/doLogin',
      method: 'POST',
      data: {phone, password, tpAccountId, from: 'dd'}, 
      success: res => {
        let {data, msg, success} = res.data
        if (success) {
          wx.showLoading({
            content: '正在为您登录',
            success: () => {
              wx.setStorage({key: 'user', data: data})
              this.setData({loading: false})
              wx.hideLoading()
              wx.switchTab({url: `/page/home/home?${newUser}`})
            },
          });
        } else {
          this.alert(msg)
          this.setData({loading: false})
        }
      },
      fail: res => {
        console.log(res)
        this.alert(res.msg)
        this.setData({loading: false})
      },
    })
  },
  // 轻提示
  alert(content) {
    wx.alert({
      content,
      buttonText: '我知道了',
    })
  }
});
