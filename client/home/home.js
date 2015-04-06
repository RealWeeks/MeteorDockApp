Template.home.currentnews = function(){
  var news = Session.get('news');
  Meteor.call('getNews',news,function(err, guardian){
    // var snip = JSON.parse(guardian.content);
    // console.log(snip);
    console.log(JSON.parse(guardian.content).response.results[2].webTitle);
    // Session.set('news', snip);
    // Session.set('news', guardian.content);
    Session.set('news', 'asdf');

  });
  return Session.get('news');
};
