var vm = new Vue({
  el: '#app',
  data: {
    commentList: [
      {
        floor: 2,
        author: 'author',
        detail: 'flofloorfloor detail',
      }, {
        floor: 3,
        author: 'author',
        detail: 'flofloorfloor detail',
      }, {
        floor: 2,
        author: 'author',
        detail: 'flofloorfloor detail',
      }
    ]
  }
});

ajax('post', '/index.php/pay/api/api/h5', {}, function(res){
  let data = res.data;

}, function(){});
