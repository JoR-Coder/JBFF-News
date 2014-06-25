// Extra functions...
//

Date.prototype.format = function(format){ //author: meizz

	var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(),    //day
		"h+" : this.getHours(),   //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3),  //quarter
		"S" : this.getMilliseconds() //millisecond
	};

	if(/(y+)/.test(format)) 
		format=format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("("+ k +")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));

	return format;
};



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
<<<<<<< HEAD
		console.log("articles view render");
		if(myRoute.routes[Backbone.history.fragment] == "start"){
			$(".adminButtons").html("");
		}

		
=======
		$(".editfield").html("");
>>>>>>> 21c17699b1844e34ad9b53ee2fb02af3a845e6b9
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
<<<<<<< HEAD

=======
		
>>>>>>> 21c17699b1844e34ad9b53ee2fb02af3a845e6b9
		var nameWithoutSpace = myName.replace(/\s/g, '');
		var textWithoutSpace = myText.replace(/\s/g, '');

		if(nameWithoutSpace == "" || textWithoutSpace == ""){
				alert("Fill in all fields");
		}else{
<<<<<<< HEAD
					var comment = this.model.get('comments').slice(0);

					
					comment.push({name:myName, text:myText, timestamp:new Date().format("dd/MM h:mm") });
		
		
		this.model.set({sync: "sync"});//DETTA SKRIVER VI BARA FÖR ATT SYNKA MED DATABASEN
		this.model.set({comments:comment});
		$('#commentName').val("");
		$('#commentText').val("");
		}


=======

			var comment = this.model.get('comments').slice(0);

			comment.push({name:myName, text:myText, timestamp:new Date().format("dd/MM h:mm") });
	
			//DETTA SKRIVER VI BARA FÖR ATT SYNKA MED DATABASEN
			this.model.set({sync: "sync"});
			this.model.set({comments:comment});
	
			$('#commentName').val("");
			$('#commentText').val("");
		}		
>>>>>>> 21c17699b1844e34ad9b53ee2fb02af3a845e6b9
	},
	initialize: function() {

		this.model.on('add remove change',this.render,this);
		this.render();
	},

	render: function() {
		if( this.model !== undefined ){
<<<<<<< HEAD
					console.log("article view render");

			// Kod för att visa redigeringsknappar...

			//if(admin){} kör koden under
			var editField = Handlebars.compile( $("#edit-article").html());

			$(".adminButtons").html( editField() );
=======
			
			// Kod för att visa redigeringsknappar...
			var editField = Handlebars.compile( $("#edit-article").html() );
			$(".editfield").html( editField() );
>>>>>>> 21c17699b1844e34ad9b53ee2fb02af3a845e6b9

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
<<<<<<< HEAD
			this.$el.html(this.template());
			$(".adminButtons").html("");
=======
		$(".editfield").html("");
		this.$el.html(this.template());
>>>>>>> 21c17699b1844e34ad9b53ee2fb02af3a845e6b9
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
<<<<<<< HEAD

=======
>>>>>>> 21c17699b1844e34ad9b53ee2fb02af3a845e6b9
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

var myRoute = window.router = new Router();

Backbone.history.start();


// The everything else
// == == == == == == == == == == == == == == == == == == == == == == == == ==



