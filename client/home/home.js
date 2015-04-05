Template.home.currentnews = function(){
  var news = Session.get('news');
  Meteor.call('getNews',news,function(err, guardian){
    // var snip = JSON.parse(guardian.content);
    // console.log(snip);
    console.log(guardian.content);
    // Session.set('news', snip);
    // Session.set('news', guardian.content);
    Session.set('news', 'test');

  });
  return Session.get('news');
};
