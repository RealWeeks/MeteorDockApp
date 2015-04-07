// Meteor.methods({
//   'getNews':function(subject){
//     return Meteor.http.call('GET', 'http://content.guardianapis.com/search?api-key=test&q='+ subject);
//   }
// });

//instead of inscure
Meteor.publish("comments", function(userid){
  return Comments.find({});
});

Meteor.publish("votes",function(commentid){
  return Votes.find({comment:commentid});
});

Meteor.methods({
  'addComment':function(options){
    var comment = {
      text:options.text,
      owner:Meteor.userId(),
      date:new Date(),
      parent:options.parent
    }
    Comments.insert(comment);
  },
  'removeComment': function(id){
    Comments.remove({_id:id});
  },
  'removeAllComments': function(){
    Comments.remove({});
  }
  // 'addVote':function(){
  //   var vote = 0;
  //   vote += 1;
  // }
});




