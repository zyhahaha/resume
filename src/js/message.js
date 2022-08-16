var vm = new Vue({
  el: '#app',
  data: {
    commentMsg: '',
    commentList: [],
    mockData: [
      {
        author: 'author',
        comment: 'floflidoor comment  ',
        tim: Date.now() - 10000000
      },
      {
        author: 'test',
        comment: 'test comment',
        tim: Date.now() - 6000000
      },
      {
        author: 'vvvvvip',
        comment: 'flofloorfloor comment',
        tim: Date.now() - 100000
      }
    ]
  },
  created: function() {
    this.initData();
  },
  methods: {
    sendMsg: function(){
      var that = this;
      var params = {
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
        function() {
          params.tim = Date.now();
          that.mockData.push(params);
          that.handleCommentList(that.mockData);
        }
      );
    },
    initData: function() {
      var that = this;
      ajax(
        'get',
        '/cv/query',
        {},
        function(res) {
          that.handleCommentList(res);
        },
        function() {
          that.handleCommentList(that.mockData);
        }
      );
    },
    handleCommentList: function(data){
      var that = this;
      var commentList = data;
      typeof commentList === 'string' && (commentList = JSON.parse(commentList));
      commentList.forEach((item, index) => {
        item.floor = index + 1;
        item.date = that.timeElapse(item.tim);
      });
      that.commentList = commentList;
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
