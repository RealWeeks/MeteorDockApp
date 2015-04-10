if (Meteor.isClient) {
  Handlebars.registerHelper('profile_pic',function(input){
  var profPic = Meteor.user().url;
  Session.set("profile_pic", profPic);
  return Session.get("profile_pic");
  });
  // Handlebars.registerHelper('ownerinfo',function(input){
  //   var user = Meteor.user(Comments.findOne());
  //   //returns user object
  //   if (user._id === Comments.findOne().owner){
  //     Session.set("ownerinfo", user.url);
  // }
  // return Session.get("ownerinfo");

  // });
}


// Meteor.users.find().collection._docs._map
//retuns object hash of IDs
