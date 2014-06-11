// The models
// == == == == == == == == == == == == == == == == == == == == == == == == ==

 Article = new Backbone.Model.extend({
 	defaults:{
 		_id     : 0,
 		title   : "",
 		text    : "",
 		author  : "",
 		category: "",
 		imageURL: "",
 		datePublished: "",
 		lastEdit: "",
 		comments: []
 	},

 	initialize: function(){

 	}

 });


Articles = new Backbone.Collection.extend({
	model: Article
});




// The views & controls
// == == == == == == == == == == == == == == == == == == == == == == == == ==

var articlesView = Backbone.View.extend({

  tagName: "li",

  className: "",

  events: {
    "click .icon":          "open",
    "click .button.edit":   "openEditDialog",
    "click .button.delete": "destroy"
  },

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {

  }

});





// The everything else
// == == == == == == == == == == == == == == == == == == == == == == == == ==

