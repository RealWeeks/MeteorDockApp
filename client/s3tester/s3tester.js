Deps.autorun(function(){
  Meteor.subscribe("userData");
  Meteor.subscribe("profile_pic");
});

Template.s3tester.events({
  "click button.upload": function(){
    var files = $("input.file_bag")[0].files;

    S3.upload({
      files:files,
      path:"subfolder"
    },function(e,r){
      console.log(r);
      var url = r.url;
      Meteor.call('addUrl',url, function(e,r){
        $('#my_image').attr("src",(Meteor.user().url));
        Session.set("profile_pic", (Meteor.user().url));
        localStorage.setItem('profile_pic', (Meteor.user().url));
      });
    });
  }
});

Template.s3tester.helpers({
  "files": function(){
    return S3.collection.find();
  }
});

// Template.s3tester.helpers({
//   'img':function(){
//     // Tracker.flush();
//     Meteor.defer(function(){

//     });
//   }
// });
