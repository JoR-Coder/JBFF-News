

// The routes
// == == == == == == == == == == == == == == == == == == == == == == == == ==


Router = Backbone.Router.extend({

	routes:{
		'':'start',
		'article/:id': 'view',
		'add-article': 'add',
		'login'      : 'login',
		'logOut'     : 'logOut'
	},
	start:function(){

		var navbarView = new NavbarView();
		var articlesView = new ArticlesView({ collection: articles });

		articlesView.render();
		navbarView.render();

		$("#myNavbar").html(navbarView.el);
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
	},
	login:function(){
		var loginView = new LoginView();

		loginView.render();
		$(".content").html(loginView.el);
	},
	logOut:function(){
		admin.set({loggedIn:0});
		router.navigate('',{trigger:true});
	}
});

