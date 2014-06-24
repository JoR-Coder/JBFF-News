// The models
// == == == == == == == == == == == == == == == == == == == == == == == == ==

Article = Backbone.Model.extend({
 	defaults:function(){

 		return{ 
	 		title   : "",
	 		text    : "",
	 		author  : "",
	 		category: "",
	 		imageURL: "",
	 		datePublished: "",
	 		lastEdit: "",
	 		comments: []
 		};
	}
});


Articles = Backbone.Firebase.Collection.extend({ model: Article,
	firebase:'https://flickering-fire-2931.firebaseio.com/articles' });

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

		this.collection.on('add remove change',this.render,this);
		this.render();
	},

	render: function() {
		if( this.collection !== undefined ){
			this.$el.html( this.template( {articles: this.collection.toJSON()} ) );
		}
	}

});


ArticleView = Backbone.View.extend({
	el: $(".content"),
	tagName: "div",
//	className: "",

	template: Handlebars.compile( $("#article").html() ),

	events: {
		"click button": "comment"
	},
	
	comment:function(){

		var myName = $('#commentName').val();
		var myText = $('#commentText').val();
		var comment = this.model.get('comments').slice(0);
		
		var d = new Date();
		comment.push({name:myName, text:myText, timestamp:d.getDate().toString() });

		//DETTA SKRIVER VI BARA FÖR ATT SYNKA MED DATABASEN
		this.model.set({sync: "sync"});
		this.model.set({comments:comment});

		$('#commentName').val("");
		$('#commentText').val("");
	},
	initialize: function() {

		this.model.on('add remove change',this.render,this);
		this.render();
	},

	render: function() {
		if( this.model !== undefined ){
			
			// Kod för att visa redigeringsknappar...
			var editField = Handlebars.compile( $("#edit-article").html() );
			$(".editfield").html( editField("dummy") );

			this.$el.html(this.template(this.model.toJSON()));
		}
	}

});


AddArticleView = Backbone.View.extend({
	tagName: "div",
	template: Handlebars.compile( $("#add-article").html() ),
	initialize: function() {

		this.render();
	},

	render: function() {
		this.$el.html(this.template());
	},
	events: {
		"click button":"save",
	},
	save:function(){
		var myText = $('#text').val();
		var myTitle = $('#title').val();
		var article = new Article({title:myTitle,text:myText});

		articles.add(article);
		router.navigate('',{trigger:true});
	}

});


var articles = new Articles();

Router = Backbone.Router.extend({

	routes:{
		'':'start',
		'article/:id':'view',
		'add-article':'add'
	},
	start:function(){
		var articlesView = new ArticlesView({ collection: articles });
		$(".content").html(articlesView.el);
	},
	view:function(id){
		var article = articles.get(id);
		var articleView = new ArticleView({model:article});

	},
	add:function(){
		var addArticleView = new AddArticleView();
		addArticleView.render();
		$(".content").html(addArticleView.el);
	}
});

window.router = new Router();

Backbone.history.start();


// The everything else
// == == == == == == == == == == == == == == == == == == == == == == == == ==



