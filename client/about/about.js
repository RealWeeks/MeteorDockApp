Template.about.currentnews = function(){
  var news = Session.get('news');
  Meteor.call('getNews',news,function(err, guardian){
    // var snip = JSON.parse(guardian.content);
    console.log(guardian.data.response.results);
    var snip = guardian.data.response.results[0].webTitle;
    console.log(snip[0].webTitle);


    Session.set('news', snip);

  });
  return Session.get('news');
};
