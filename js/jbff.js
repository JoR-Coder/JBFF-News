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
 		comments: ["", ""]
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

		this.listenTo(this.collection, "change", this.render);
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
	tagName: "div",
//	className: "",

	template: Handlebars.compile( $("#article").html() ),

	events: {
		"click button": "comment"
	},
	comment:function(){
		var myName = $('#commentName').val();
		var myText = $('#commentText').val();
		var comment = this.model.get('comments');
		comment.push({name:myName,text:myText});
		this.model.set({author:"ddd"});
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
				//var article = new Article({title:"123",text:"333",comments:[{name:"fred",text:"hej"},{name:"fred2",text:"hej2"}]});

		var articlesView = new ArticlesView({ collection: articles });
		//articles.add(article);
		$(".content").html(articlesView.el);
	},
	view:function(id){
		var article = articles.get(id);

		var articleView = new ArticleView({model:article});

		articleView.render();
		$(".content").html(articleView.el);

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



