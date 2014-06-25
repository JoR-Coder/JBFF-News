


// The views & controls
// == == == == == == == == == == == == == == == == == == == == == == == == ==

ArticlesView = Backbone.View.extend({
	tagName: "div",
	template: Handlebars.compile( $("#articles").html() ),

	initialize: function() {

		this.collection.on('add remove change',this.render,this);
		this.render();
	},

	render: function() {

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
	template: Handlebars.compile( $("#article").html() ),
	events: {

		"click button": "comment"
	},
	initialize: function() {

		this.model.on('add remove change',this.render,this);
		this.render();
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

			// this.model.set({sync: "sync"});//DETTA SKRIVER VI BARA FÖR ATT SYNKA MED DATABASEN
			this.model.set({comments:comment});

			$('#commentName').val("");
			$('#commentText').val("");
		}
	},
	render: function() {
		if( this.model !== undefined ){

			if(admin.get("loggedIn") === 1){

				var editField = Handlebars.compile( $("#edit-article").html());

				$(".adminButtons").html( editField() );
			}

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
	},
	render: function() {

			this.$el.html(this.template());
			$(".adminButtons").html("");
	}
});


LoginView = Backbone.View.extend({
	tagName: "div",
	template: Handlebars.compile($("#login-template").html()),
	initialize: function() {

		this.render();
	},

	render: function() {

		this.$el.html(this.template());
			$("#wrongLoginMessage").html("");
	},
	events: {
		"click button":"login",
	},
	login:function(){

		var username = $('#usernameInput').val();
		var password = $('#passwordInput').val();

		if(username === admin.get("name") && password === admin.get("password")){

			admin.set({loggedIn:1});
			router.navigate('',{trigger:true});
		}else{

			$("#wrongLoginMessage").html("Fel uppgifter, försök igen!");
		}
	}
});


NavbarView = Backbone.View.extend({
	tagName  : "ul",
	className: "nav navbar-nav",
	template: Handlebars.compile($("#navbar-template-admin").html()),
	initialize: function() {

		this.render();
	},

	render: function() {

		if(admin.get("loggedIn") === 1){

			this.$el.html("");
			this.$el.html(this.template());
		}else{

			this.$el.html("");
			var notAdmin = Handlebars.compile($("#navbar-template-notAdmin").html());
			console.log(notAdmin());
			this.$el.html(notAdmin());
		}
	}
});

