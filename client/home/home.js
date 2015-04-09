Template.home.rendered = function(){
  Deps.autorun(function(){
    //runs everytime it senses a change in comments
    Meteor.subscribe('comments', Meteor.userId());
    Meteor.subscribe('votes');
  });
};

Template.home.comments = function(){
  return Comments.find({parent:null}, {sort:{yes:-1, date:-1}});
  //find and sort by date
};

Template.home.events({
  'keyup .commenttext':function(evnt, templ){
    if(evnt.which === 13){
      // 13 is the char number for enter
      var commenttext = templ.find('.commenttext').value;
      var options = {text:commenttext, parent:null};
      Meteor.call('addComment', options);
      //inserts comment into DB with text, userId, a new date and post/comments
      $('.commenttext').val("").select().focus();
    }
  }
});

Template.home.events({
  'keyup .commenttext':function(evnt,tmpl){
    if(evnt.which === 192){
      Meteor.call('removeAllComments');
    }
  }
});
