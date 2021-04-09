 var app=getApp()
 Component({
  data: {
   
    color: "#a9b7b7",
    selectedColor: "#3296FA"
    
  },
  attached() {
    this.setData({
      list: app.globalData.list
    })
    console.log(app.globalData.list)
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.navigateTo({url})
      console.log(data.index)
      this.setData({
        selected: data.index
      })
    }
  }
})