

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
