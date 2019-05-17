var vm = new Vue({
  el: '#app',
  data: {
    commentMsg: '',
    commentList: [
      // {
      //   floor: 2,
      //   author: 'author',
      //   comment: 'flofloorfloor comment',
      //   date: '18'
      // },
      // {
      //   floor: 3,
      //   author: 'author',
      //   comment: 'flofloorfloor comment',
      //   date: '18'
      // },
      // {
      //   floor: 2,
      //   author: 'author',
      //   comment: 'flofloorfloor comment',
      //   date: '18'
      // }
    ]
  },
  created: function() {
    this.initData();
  },
  methods: {
    sendMsg: function(){
      let params = {
        author: 'TEST',
        comment: this.commentMsg
      };
      ajax(
        'post',
        '/cv/add',
        params,
        function(res) {
          window.location.reload();
        },
        function() {}
      );
    },
    initData: function() {
      let that = this;
      ajax(
        'get',
        '/cv/query',
        {},
        function(res) {
          let commentList = res;
          commentList = JSON.parse(commentList);
          commentList.forEach((item, index) => {
            item.floor = index;
            item.date = that.timeElapse(item.tim);
          });
          that.commentList = commentList;
          console.log(commentList);
        },
        function() {}
      );
    },
    timeElapse: function(dateTim){
      var current = Date();
      var seconds = (Date.parse(current) - dateTim) / 1000;
      var days = Math.floor(seconds / (3600 * 24));
      seconds = seconds % (3600 * 24);
      var hours = Math.floor(seconds / 3600);
      seconds = seconds % 3600;
      var minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      seconds = Math.floor(seconds);
      
      var result = '';
      if (days) {
        result = days + ' 天前';
      } else if(hours) {
        result = hours + ' 小时前';
      } else if(minutes) {
        result = minutes + ' 分钟前';
      } else if(seconds) {
        result = seconds + ' 秒前';
      }
      return result;
    }
  }
});
