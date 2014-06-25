// The models
// == == == == == == == == == == == == == == == == == == == == == == == == ==


Date.prototype.format = function(format){ //author: meizz 
var o = { "M+" : this.getMonth()+1, //month 
"d+" : this.getDate(), //day 
"h+" : this.getHours(), //hour
 "m+" : this.getMinutes(), //minute
  "s+" : this.getSeconds(), //second 
  "q+" : Math.floor((this.getMonth()+3)/3), //quarter
   "S" : this.getMilliseconds() //millisecond
    }; 
    if(/(y+)/.test(format)) 
    	format=format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    for(var k in o) if(new RegExp("("+ k +")").test(format)) 
    	format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
     return format;

      };


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
		console.log("articles view render");
		if(myRoute.routes[Backbone.history.fragment] == "start"){
			$(".adminButtons").html("");
		}

		
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

		var nameWithoutSpace = myName.replace(/\s/g, '');
		var textWithoutSpace = myText.replace(/\s/g, '');

		if(nameWithoutSpace == "" || textWithoutSpace == ""){
				alert("Fill in all fields");
		}else{
					var comment = this.model.get('comments').slice(0);

					
					comment.push({name:myName, text:myText, timestamp:new Date().format("dd/MM h:mm") });
		
		
		this.model.set({sync: "sync"});//DETTA SKRIVER VI BARA FÖR ATT SYNKA MED DATABASEN
		this.model.set({comments:comment});
		$('#commentName').val("");
		$('#commentText').val("");
		}


	},
	initialize: function() {

		this.model.on('add remove change',this.render,this);
		this.render();
	},

	render: function() {
		if( this.model !== undefined ){
					console.log("article view render");

			// Kod för att visa redigeringsknappar...

			//if(admin){} kör koden under
			var editField = Handlebars.compile( $("#edit-article").html());

			$(".adminButtons").html( editField() );

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
			$(".adminButtons").html("");
	},
	events: {
		"click button":"save",
	},
	save:function(){
		var myText = $('#text').val();
		var myTitle = $('#title').val();
		var myIntroductionText = $('#introductionText').val();

		var introWithoutSpace = myIntroductionText.replace(/\s/g, '');
		var titleWithoutSpace = myTitle.replace(/\s/g, '');
		var textWithoutSpace = myText.replace(/\s/g, '');

		if(titleWithoutSpace == "" || textWithoutSpace == "" || introWithoutSpace == ""){
				alert("Fill in all fields");
		}else{

		var article = new Article({title:myTitle,text:myText,introductionText:myIntroductionText,datePublished:new Date().format("dd/MM h:mm")});

		articles.add(article);
		router.navigate('',{trigger:true});
		}


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

		articleView.render();
		$(".content").html(articleView.el);

	},
	add:function(){
		var addArticleView = new AddArticleView();
		addArticleView.render();
		$(".content").html(addArticleView.el);
	}
});

var myRoute = window.router = new Router();

Backbone.history.start();


// The everything else
// == == == == == == == == == == == == == == == == == == == == == == == == ==



