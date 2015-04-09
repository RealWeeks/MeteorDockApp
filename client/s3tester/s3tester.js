Template.s3tester.events({
    "click button.upload": function(){
        var files = $("input.file_bag")[0].files;

        S3.upload({
                files:files,
                path:"subfolder"
            },function(e,r){
                console.log(r);
                var url = r.url;
                Meteor.call('addUrl', url);
        });
    }
});

Template.s3tester.helpers({
    "files": function(){
        return S3.collection.find();
    }
});
