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

Template.dock.events({
  'click .user':function(){
    Session.set('currentId',this._id);
    var result = ChatRooms.findOne({chatIds:{$all:[this._id,Meteor.userId()]}});
    //findOne, reterns a single entry from Mongo
    //$all - returns all docs(read:postgres tables) in following array
    //http://docs.mongodb.org/manual/reference/operator/query/all/
    //looks for room already created
    if(result){
      Session.set('roomid',result._id);
    }else{
      var newRoom = ChatRooms.insert({chatIds:[this._id,Meteor.userId()],messages:[]});
      Session.set('roomid',newRoom);
    }
  }
});

Template.messages.helpers({
  'msgs':function(){
    var res = ChatRooms.findOne({_id:Session.get('roomid')});
    return res.messages;
    //gets the messages for a chatroom by _id
  }
});

Template.input.events={
  'keydown input#message':function(event){
    if(event.which === 13){
      if(Meteor.user()){
        var name = Meteor.user().username;
        var message = document.getElementById('message');
        //dom element not jquery object

        if (message.value !== ''){
          var upt = ChatRooms.update({"_id":Session.get("roomid")},{$push:{messages:{
            name: name,
            text: message.value,
            createdAt: Date.now()
          }}});
          console.log(upt);
          document.getElementById('message').value = "";
          message.value ="";
        }
      }else{
      alert("LOGIN!");
      }
      //checked to see if logged in ^
    }
  }
};
