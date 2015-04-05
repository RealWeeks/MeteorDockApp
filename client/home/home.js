Template.layout.currentnews = function(){
  var news = Session.get('news');
  Meteor.call('getNews',news,function(err, results){
    console.log(results.content);
    console.log('hello from currentnews function');
    Session.set('news', JSON.parse(results.content));
  });
  return Session.get('news');
};
