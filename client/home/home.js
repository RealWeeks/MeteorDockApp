if (Meteor.isServer) {
    Meteor.methods({
        checkTwitter: function () {
            this.unblock();
            return Meteor.http.call("GET", "http://jsonplaceholder.typicode.com/posts");
        }
    });
}

//invoke the server method
if (Meteor.isClient) {
    Meteor.call("checkTwitter", function(error, results) {
        console.log(results); //results.data should be a JSON object
    });
}
