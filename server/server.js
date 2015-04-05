Meteor.methods({
  'getNews':function(subject){
    return Meteor.http.call('GET', 'http://content.guardianapis.com/search?api-key=test&q='+ subject);
  }
});
