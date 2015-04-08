 if(Meteor.isServer){
  process.env.HTTP_FORWARDED_COUNT = 1;
 }

Deps.autorun(function(){
  Meteor.subscribe("chatrooms");
  Meteor.subscribe("onlusers");
});

Template.dock.helpers({
  'onlusr':function(){
    return Meteor.users.find({"status.online":true,_id:{$ne:Meteor.userId()}});
    //returns all online user except for calling user
    //$ne - mongo for !=
  }
});
