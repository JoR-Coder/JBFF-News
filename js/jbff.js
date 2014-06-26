

// The main program
// == == == == == == == == == == == == == == == == == == == == == == == == ==




var userRef = new Firebase('https://flickering-fire-2931.firebaseio.com/admin');
var user, articles, router;

// Simple login callback.
//


var auth = new FirebaseSimpleLogin(userRef, function(error, userData) {

	Articles = Backbone.Firebase.Collection.extend({ model: Article, firebase:'https://flickering-fire-2931.firebaseio.com/articles' });
	articles = new Articles();
	router = window.router = new Router();


	if (error) {

		// an error occurred while attempting login
		console.log(error);
		$("#wrongLoginMessage").html("Fel uppgifter, försök igen!");

	} else if (userData) {
		// user authenticated with Firebase
		console.log('User ID: ' + userData.uid + ', Provider: ' + userData.provider);
		user = userData;

		if( Backbone.History.started ){
			router.navigate('',{trigger:true});
		}
	} else {
		if( Backbone.History.started ){
			// router.navigate('',{trigger:true});
			Backbone.history.navigate('');
			window.location.reload();
		}
	}
	
	if( !Backbone.History.started ){
		Backbone.history.start();
	}

});


