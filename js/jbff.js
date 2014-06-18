// The models
// == == == == == == == == == == == == == == == == == == == == == == == == ==

Article = Backbone.Model.extend({
 	defaults:{
 		_id     : 0,
 		title   : "",
 		text    : "",
 		author  : "",
 		category: "",
 		imageURL: "",
 		datePublished: "",
 		lastEdit: "",
 		comments: ["", ""]
	}
});


Articles = Backbone.Collection.extend({ model: Article });

// The views & controls
// == == == == == == == == == == == == == == == == == == == == == == == == ==

ArticlesView = Backbone.View.extend({
	tagName: "div",
//	className: "",

	template: Handlebars.compile( $("#articles").html() ),

//	events: {
//		"click .icon":          "open",
//	},

	initialize: function() {

		this.listenTo(this.collection, "change", this.render);
		this.render();
	},

	render: function() {
		console.log("Här");
		if( this.collection !== undefined ){
			this.$el.html( this.template( this.collection.toJSON() ) );
		}
	}

});




// The everything else
// == == == == == == == == == == == == == == == == == == == == == == == == ==

var articles = new Articles([
	{ title: "En titel", text: "Och så har vi lite text här :)" },
	{ title: "En till titel", text: "Lite mer här, text vi har :o" },
	{ title: "Ytterligare en titel", text: "Sisteligen, meeer text :/" },
]);

var articlesView = new ArticlesView({ collection: articles });

$(".content").html(articlesView.el);

