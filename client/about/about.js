Template.about.currentnews = function(){
  var news = Session.get('news');
  Meteor.call('getNews',news,function(err, guardian){
    // var snip = JSON.parse(guardian.content);
    console.log(guardian.data.response.results);
    var snip = guardian.data.response.results;
    console.log(snip);
    var quotes = [];
    for (var i = 0; i < snip.length; i++) {
      quotes.push(snip[i].webTitle + "<br>");
      Session.set('quotes',quotes);
    };
    Session.set('news', snip);

  });
  return Session.get('quotes');
};
