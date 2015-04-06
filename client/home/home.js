Template.home.currentnews = function(){
  var news = Session.get('news');
  Meteor.call('getNews',news,function(err, guardian){
    // var snip = JSON.parse(guardian.content);
    // console.log(snip);
    console.log(JSON.parse(guardian.content).response.results[2].webTitle);
    // Session.set('news', snip);
    // Session.set('news', guardian.content);
    Session.set('news', 'asdf');

  });
  return Session.get('news');
};

Template.home.rendered = function(){
  Deps.autorun(function(){
    //runs everytime it senses a change in comments
    Meteor.subscribe('comments', Meteor.userId());
  })
};

Template.home.comments = function(){
  return Comments.find({}, {sort:{date:-1}});
  //find and sort by date
};

Template.home.events({
  'keyup .commenttext' : function(evnt, templ){
    if(evnt.which === 13){
      // 13 is the char number for enter
      var commenttext = templ.find('commenttext').value();
      var options = {text:commenttext, parent:null};
      Meteor.call('addComment', options);
      //inserts comment into DB with text, userId, a new date and post/comments
      $('.commenttext').val("").select().focus();
    }
  }
});
