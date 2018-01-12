//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindLogin: function () {
    wx.login({
      success: function(res) {
        if (res.code) {
          console.log(res);
          wx.getUserInfo({
            withCredentials: true,
            success: function (resInfo) {
              console.log(resInfo)
              //发起网络请求
              wx.request({
                method: 'POST',
                url: 'http://127.0.0.1:8360/api/oauth',
                header: {
                  cookie: wx.getStorageSync('cookie_oauth')
                },
                data: {
                  code: res.code,
                  rawData: resInfo.rawData,
                  signature: resInfo.signature,
                  encryptedData: resInfo.encryptedData,
                  iv: resInfo.iv,
                },
                success: function (resOauth) {
                  const cookie = resOauth.header['Set-Cookie'].match(/\w+=\w{8}(-\w{4}){3}-\w{12}/);
                  if (cookie && cookie[0]) {
                    wx.setStorageSync('cookie_oauth', cookie[0])
                  }
                }
              })
            }
          })
          
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
