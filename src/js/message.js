var vm = new Vue({
  el: '#app',
  data: {
    userAvatar: '',
    userName: '',
    commentMsg: '',
    commentList: []
  },
  created: function() {
    this.initData();
  },
  methods: {
    sendMsg: function () {
      if (!this.commentMsg) return false
      
      var that = this;
      var params = JSON.stringify({
        type: 'CV_MESSAGE',
        content: this.userName, // 昵称
        content_two: this.userAvatar, // 头像
        content_three: this.commentMsg // 内容
      });
      ajax(
        'POST',
        'http://api.123123.store/powerful',
        params,
        function (res) {
          that.commentMsg = ''
          that.queryCommentList()
        },
        function() { }
      );
    },
    initData: function () {
      this.userName = this.generateNickname()
      this.userAvatar = this.generateAvatar()
      this.queryCommentList()
    },
    // 获取留言列表
    queryCommentList: function () {
      var that = this;
      var params = JSON.stringify({
        type: 'CV_MESSAGE',
        pageIndex: 1,
        pageSize: 20
      });
      ajax(
        'POST',
        'http://api.123123.store/powerful/list',
        params,
        function (res) {
          var dataList = JSON.parse(res).data.list
          that.handleCommentList(dataList);
        },
        function () { }
      );
    },
    // 处理留言数据格式
    handleCommentList: function(data){
      var that = this;
      var commentList = data;
      typeof commentList === 'string' && (commentList = JSON.parse(commentList));
      commentList.forEach((item, index) => {
        item.floor = index + 1;
        item.author = item.content
        item.avatar = item.content_two
        item.comment = item.content_three

        var tim = Date.parse(new Date(item.create_time))
        item.date = that.timeElapse(tim);
      });
      that.commentList = commentList;
    },
    // 计算时间
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
    },
    // 生成随机头像（色块）
    generateAvatar: function(){
      var color = "#";
      //一个十六进制的值的数组
      var array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
      for(var i = 0; i < 6; i++) {
        var num = parseInt(Math.random() * 16);
        color += array[num];
      }
      return color;
    },
    // 生成随机昵称（26个字母取7位）
    generateNickname: function () {
      var name = "";
      //一个十六进制的值的数组
      var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      for (var i = 0; i < 6; i++) {
        var num = parseInt(Math.random() * 26);
        name += arr[num];
      }
      return name.toLowerCase();
    }
  }
});
