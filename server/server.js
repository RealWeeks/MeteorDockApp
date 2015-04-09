// Meteor.methods({
//   'getNews':function(subject){
//     return Meteor.http.call('GET', 'http://content.guardianapis.com/search?api-key=test&q='+ subject);
//   }
// });

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
  // this is for amazon images attached to users
  'addUrl': function(url){
    console.log(url);
    // we need access to the current user on the server so we can save the url to the image on the user's object
    // Comments.update(commentId);
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
    debugger;
    // Comments.update(commentId);
  }
});
*/
