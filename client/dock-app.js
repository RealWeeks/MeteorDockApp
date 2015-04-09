if (Meteor.isClient) {
  Handlebars.registerHelper('profile_pic',function(input){
  var profPic = Meteor.user().url;
  Session.set("profile_pic", profPic);
  return Session.get("profile_pic");
  });
}
