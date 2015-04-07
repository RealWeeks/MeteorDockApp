Template.comment.voteCount = function(){
  return Votes.find(this._id).count();
};


Template.comment.commentComment = function(){
  return Comments.find({parent:this._id});
};

Template.comment.events({
  'keyup .comments':function(evnt, templ){
    if(evnt.which === 13){
      // 13 is the char number for enter
      var commentNote = templ.find('.comments').value;
      console.log(commentNote);
      var options = {text:commentNote, parent:this._id};
      Meteor.call('addComment', options);
      //inserts comment into DB with text, userId, a new date and post/comments
      $('.comments').val("").select().focus();
    }
  }
});

