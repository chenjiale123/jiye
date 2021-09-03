Page({
  data: {

  },
  onLoad: function () {
    var that = this;
    var filePath = "https://jileaf.oss-cn-hangzhou.aliyuncs.com/doc/%E5%9B%BE%E6%96%87%E6%A1%88%E4%BE%8B/%7E%24%E5%81%A5%E5%BA%B7%E6%89%8B%E6%8A%A4%E8%AE%A1%E5%88%92-%E6%A4%8D%E6%A0%91%E8%8A%82.docx";//对应的网络路径，可以是内网的或者外网

    wx.downloadFile({//下载对应文件
      url: filePath,
      success: function (res) {

        var filePath = res.tempFilePath;//文件路径

        wx.openDocument({
          filePath: filePath,//装载对应文件的路径
          fileType: 'docx',//指定打开的文件类型
          success: function (res) {
            console.log("打开成功");
          },
          fail: function (res) {
            console.log(res);
          }
        })

      },
      fail: function (res) {
        console.log(res);
      }
    })


  },
})
