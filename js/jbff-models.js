

// The models
// == == == == == == == == == == == == == == == == == == == == == == == == ==


Article = Backbone.Model.extend({
 	defaults:function(){

 		return{
	 		title   : "",
	 		text    : "",
	 		introductionText : "",
	 		author  : "",
	 		category: "",
	 		imageURL: "",
	 		datePublished: "",
	 		lastEdit: "",
	 		comments: []
 		};
	}
});


Admin = Backbone.Firebase.Model.extend({ firebase: 'https://flickering-fire-2931.firebaseio.com/admin' });

Articles = Backbone.Firebase.Collection.extend({ model: Article, firebase:'https://flickering-fire-2931.firebaseio.com/articles' });
