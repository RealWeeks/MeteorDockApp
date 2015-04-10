Meteor.methods({
  'getNews':function(subject){
    return Meteor.http.call('GET', 'http://content.guardianapis.com/search?api-key=test&q='+ subject);
  },
  'getWeather':function(){
    return Meteor.http.call('GET', 'http://api.openweathermap.org/data/2.5/weather?q=Boston,ma');
  }
});

//instead of inscure
Meteor.publish("comments", function(userid){
  return Comments.find({});
});


Meteor.publish("chatrooms",function(){
  return ChatRooms.find({});
});

Meteor.publish("onlusers",function(){
  return Meteor.users.find({"status.online":true},{username:1});
});

Meteor.publish("profile_pic",function(){
  return Session.get("profile_pic");
});

Meteor.methods({
  // comments
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
  },
  // this is for voting
  'incrementYesVotes' : function(commentId){
    console.log(commentId);
    Comments.update(commentId,{$inc : {'yes':1}});
  },
  'incrementNoVotes' : function(commentId){
    console.log(commentId);
    Comments.update(commentId,{$inc : {'no':1}});
  },
// for comment voting
  'incrementCommentYesVotes' : function(commentcommentId){
    console.log(commentcommentId);
    Comments.update(commentcommentId,{$inc : {'Cyes':1}});
  },
  'incrementCommentNoVotes' : function(commentcommentId){
    console.log(commentcommentId);
    Comments.update(commentcommentId,{$inc : {'Cno':1}});
  },





  // this is for amazon images attached to users
  'addUrl' : function(url){
    console.log(url);
    Meteor.users.update({_id:Meteor.user()._id}, { $set: {'url':url}});
        console.log('inside addurl');
  }
});

//boilerplate Meteor startup
Meteor.startup(function(){
  ChatRooms.allow({
    'insert':function(userId,doc){
      return true;
    },
    'update':function(userId,doc,fieldNames, modifier){
      return true;
    },
    'remove':function(userId,doc){
      return false;
    }
  });
});

/*Meteor.methods({
  incrementYesVotes : function(commentId){
    console.log(commentId);
    Comments.update(commentId,{$inc : {'yes':1}});
  },
  incrementNoVotes : function(commentId){
    console.log(commentId);
    Comments.update(commentId,{$inc : {'no':1}});
  }
});*/
//inc increases or decresed field by 1


/*Meteor.methods({
  addUrl:function(url){
    // Comments.update(commentId);
  }
});
*/
