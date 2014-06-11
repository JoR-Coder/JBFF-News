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
	}
});


Articles = new Backbone.Collection.extend({
	model: Article
});




// The views & controls
// == == == == == == == == == == == == == == == == == == == == == == == == ==

ArticlesView = Backbone.View.extend({
	tagName: "li",
	className: "",

	template: Handlebars.compile(),

	events: {
		"click .icon":          "open",
	},

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
		this.render();
	},

	render: function() {
		if( this.collection !== undefined ){
			this.$el.html( this.template( this.collection.toJSON() ) );
		}
	}

});





// The everything else
// == == == == == == == == == == == == == == == == == == == == == == == == ==

var articles = new Articles([
	{ title: "En titel", text: "OCh så har vi lite text här :)" }
]);

var articlesView = new ArticlesView({ collection: articles});

$("").html(articlesView.el);
