//index.js
//获取应用实例
const app = getApp()
const data = require('../../utils/data.js');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    giftArray: data.giftArray,
    productImg: data.productImg,
    activeIndex:0,
    stickyFlag:false,//stickey
    stickeyNone:false,//display:none
    toView:'',
    scrollTop:'',
    scrollLeft:0,
    // activePosition:0,
    title:"收到了饭就来上飞机是收到了饭就设计大方手机里的风景发上来大家"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReady: function () {
    //获得popup组件
    this.popup = this.selectComponent("#popup");
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
    };
    wx.getSystemInfo({
      success:(res) => {
        this.setData({
          height:res.windowHeight,
          width:res.windowWidth
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // ============================================================================
  /**
   * 选择礼包
   */
  chooseGift:function(e){
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    })
    this.setData({
      scrollTop:0
    })
    // console.log(e.detail.scrollTop)
  },
  /**
   * 滚动触发（竖直方向）
   */
  scroll(e){
    console.log(e.detail.scrollTop)
    if (e.detail.scrollTop>0){
      this.setData({
        stickyFlag:true
      })
    }else{
      this.setData({
        stickyFlag: false
      })
    }
    if (e.detail.scrollTop > 86){
      this.setData({
        stickeyNone: true
      })
    }else{
      this.setData({
        stickeyNone: false
      })
    }
    // this.setData({
    //   toView:'id'+this.data.activeIndex
    // })
    this.activeLocation();
  },
  /**
   * 选中的礼包滚动时会出现在屏幕内
   */
  activeLocation(){
    console.log(3333)
    let activeLength = (this.data.activeIndex + 1) * 100;
    let scrollLeft = this.data.scrollLeft;
    if (activeLength < scrollLeft){
      this.setData({
        scrollLeft: (this.data.activeIndex-1)*100
      })
    } else if (activeLength-100 > scrollLeft+this.data.width){
      console.log("鼓了")
      this.setData({
        scrollLeft: (this.data.activeIndex - 1) * 100
      })
    }
  },
  /**
   * 横向滚动监听
   */
  hrScroll(e){
    console.log(e.detail.scrollLeft)
    this.setData({
      scrollLeft: e.detail.scrollLeft
    })
  },
  showPopup() {
    console.log(6666)
    this.popup.showPopup();
  },
})
