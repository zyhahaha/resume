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
            item.date = 18;
          });
          that.commentList = commentList;
        },
        function() {}
      );
    }
  }
});
