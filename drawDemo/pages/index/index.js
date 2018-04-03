//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 后台传入的数组
    prize:[],
    pl1:[],
    pl2: [{
                  "id": 2,
                  "pname": "谢谢参与",
                  "pimg": "http://shop.hz-life.com/upload/temp/poker/tks.png"
      　　　　},
      　　　　{
        　　　　　　"id": 2,
        　　　　　　"pname": "谢谢参与",
        　　　　　　"pimg": "http://shop.hz-life.com/upload/temp/poker/tks.png"
      　　　　},
      　　　　{
                  "id": 2,
                  "pname": "谢谢参与",
                  "pimg": "http://shop.hz-life.com/upload/temp/poker/tks.png"
      　　　　},
      　　　　{
                  "id": 2,
                  "pname": "谢谢参与",
                  "pimg": "http://shop.hz-life.com/upload/temp/poker/tks.png"
      　　　　},
      　　　　{
                  "id": 2,
                  "pname": "谢谢参与",
                  "pimg": "http://shop.hz-life.com/upload/temp/poker/tks.png"
      　　　　},
      　　　　{
                  "id": 2,
                  "pname": "谢谢参与",
                  "pimg": "http://shop.hz-life.com/upload/temp/poker/tks.png"
      　　　　},
      　　　　{
                  "id": 8,
                  "pname": "1倍",
                  "pimg": "http://shop.hz-life.com/upload/temp/poker/img1.png"
      　　　　},
      　　　　{
        　　　　　　"id": 8,
        　　　　　　"pname": "1倍",
        　　　　　　"pimg": "http://shop.hz-life.com/upload/temp/poker/img1.png"
      　　　　},
      　　　　{
        　　　　　　"id": 8,
        　　　　　　"pname": "1倍",
        　　　　　　"pimg": "http://shop.hz-life.com/upload/temp/poker/img1.png"
      　　　　}],
    // 总积分
    total:'',
    // 我的翻牌记录
    record:[{
        time:'2018-03-14 22:02:52',
        consume:'50',
        gain:'150'
      },{
        time: '2018-03-14 22:02:52',
        consume: '50',
        gain: '150'
      },{
        time: '2018-03-14 22:02:52',
        consume: '50',
        gain: '150'
      },{
        time: '2018-03-14 22:02:52',
        consume: '50',
        gain: '150'
      },{
        time: '2018-03-14 22:02:52',
        consume: '50',
        gain: '150'
      },{
        time: '2018-03-14 22:02:52',
        consume: '50',
        gain: '150'
      },{
        time: '2018-03-14 22:02:52',
        consume: '50',
        gain: '200'
      },{
        time: '2018-03-14 22:02:52',
        consume: '50',
        gain: '200'
      },{
        time: '2018-03-14 22:02:52',
        consume: '50',
        gain: '200'
      },{
        time: '2018-03-14 22:02:52',
        consume: '50',
        gain: '200'
      },{
        time: '2018-03-14 22:02:52',
        consume: '50',
        gain: '200'
      },{
        time: '2018-03-14 22:02:52',
        consume: '50',
        gain: '200'
      },{
        time: '2018-03-14 22:02:52',
        consume: '50',
        gain: '300'
      },{
        time: '2018-03-14 22:02:52',
        consume: '50',
        gain: '300'
    }],
    recordFliter:[],
    recordNum:0,
    // 活动规则
    navClose:true,
    // 翻牌记录
    foClose:true,
    // 中奖信息
    drawClose:true,
    // 翻牌动画
    animate:false,
    animateEnd:false,
    // 哪个翻过来
    turnNum:null,
    // 积分输入
    inputVal:'',
    // input是否禁用
    intAble:false,
    // 中奖信息
    drawInfo:'谢谢参与！'
  },
  // 翻牌动画
  animationFn: function () {
    var val = this.data.inputVal;
    var that = this;
    if(val >456 || val < 10) {
       wx.showModal({
         title: '提示',
         content: '请输入正确的积分',
         showCancel:false,
         confirmColor:'#ff3f42'
       })
    } else {
      that.setData({
        animate: true,
        intAble: true,
      })
      // console.log(that.data.prize)
      // 动画停止
      setTimeout(function(){
        that.setData({
          animateEnd:true,
          prize: that.data.pl2
        })
      },3000)
    }
   },
   // 点击翻牌
   drawFn:function(e){
     var inx = e.currentTarget.id
     var prize = this.data.prize;
     var pl1 = this.data.pl1;
     var pl2 = this.data.pl2;
     // 动画停止以及输入积分才可以翻牌
     if (this.data.animateEnd&&this.data.inputVal !=''){
        // console.log(e.currentTarget.id);
        this.setData({
          turnNum: inx,
          animateEnd:false
        })
        var that = this;
        // console.log(prize[inx].id);
        // 判断翻得是哪一张，把pl1,pl2随机,替换pl1的项
        pl1.forEach((i,index)=>{
          if(i.id == prize[inx].id){
            pl1.splice(index,1);
            pl1 = that.randomFn(pl1);
            pl2 = that.randomFn(pl2);
            pl1.splice(inx,0,prize[inx]);
          }
        })
        that.setData({
          prize: pl1,
          pl2: pl2
        })
        // console.log(pl1);
        // console.log(pl2);
        // wx.request({
        //   url: 'https://apptest.hz-life.com/api/poker?token=1',
        //   method: 'POST',
        //   data: {
        //     txtval: that.data.inputVal
        //   },
        //   success:res=>{
        //   }
        // })
        // 显示中奖信息弹层
        setTimeout(function(){
          that.setData({
            drawClose:false,
            intAble:false
          })
        },1000)
     }
   },
   // 数组随机排序
  randomFn: function (arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
      var idx = Math.floor(Math.random() * (len - i));
      var temp = arr[idx];
      arr[idx] = arr[len - i - 1];
      arr[len - i - 1] = temp;
    }
    return arr;
   }, 
   // 积分输入
   inputEvFn:function(e){
    // console.log(e)
    this.setData({
      inputVal: e.detail.value
    })
  },
  // 中奖信息隐藏
  drawCloseFn:function(){
    this.setData({
      drawClose: true,
      inputVal: '',
      intAble: false,
      animate: false,
      turnNum: null
    })
  },
  // 翻牌记录显示
  foOpenFn: function () {
    this.setData({
      foClose: false
    })
  },
  // 翻牌记录隐藏
  foCloseFn:function(){
    this.setData({
      foClose: true
    })
  },
  // 活动规则显示
  navOpenFn:function(){
    this.setData({
      navClose:false
    })
  },
  // 活动规则隐藏
  navCloseFn:function(){
    this.setData({
      navClose:true
    })
  },
  // 我的翻牌记录下一个
  nextRecordFn:function(){
    var recordNum = this.data.recordNum,
        record = this.data.record;
    if(record.length-(recordNum*6)>6){
      recordNum++;
    }
    // console.log(recordNum); 
    var recordFliter = record.slice(recordNum * 6, (recordNum + 1)*6);
    // console.log(recordFliter);
    this.setData({
      recordFliter: recordFliter,
      recordNum: recordNum
    })
  },
  // 我的翻牌记录上一个
  prevRecordFn: function () {
    var recordNum = this.data.recordNum,
        record = this.data.record;
    if (recordNum > 0) {
      recordNum--;
    }
    var recordFliter = record.slice(recordNum * 6, (recordNum + 1) * 6);
    this.setData({
      recordFliter: recordFliter,
      recordNum: recordNum
    })
  },
  /* 页面加载数据 */
  onLoad:function(){
    var that =this;
    wx.request({
      url: 'https://apptest.hz-life.com/api/poker?token=1',
      success:res=>{
       that.setData({
         prize:res.data.pl,
         total:res.data.ui,
         pl1:res.data.pl
       })
      // console.log(that.data.total); 
      }
    })
  },
  // 页面加载时加载第一页
  onShow:function(){
    var recordFliter = this.data.record.slice(0,6);
    this.setData({
      recordFliter: recordFliter
    })
  }
})
