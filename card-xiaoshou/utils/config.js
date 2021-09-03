var fileHost="https://jileaf.oss-cn-hangzhou.aliyuncs.com/"
var config = {
  //aliyun OSS config
  uploadImageUrl: `${fileHost}`, //默认存在根目录，可根据需求改
  AccessKeySecret: '49P930aQZvuzw3dqU2Uvl0Dbu0rV7p',
  OSSAccessKeyId: 'LTAI5tKj4sdcuBBW1LUUaMk6',
  timeout: 87600 //这个是上传文件时Policy的失效时间
};
module.exports = config