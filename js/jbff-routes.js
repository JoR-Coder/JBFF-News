

// The routes
// == == == == == == == == == == == == == == == == == == == == == == == == ==


Router = Backbone.Router.extend({

	routes:{
		'':'start',
		'article/:id': 'view',
		'add-article': 'add',
		'edit/:id'   : 'edit',
		'login'      : 'login',
		'logOut'     : 'logOut'
	},
	start:function(){

		var navbarView = new NavbarView();
		var articlesView = new ArticlesView({ collection: articles });

		$("#myNavbar").html(navbarView.el);
		$(".content").html(articlesView.el);
	},
	view:function(id){

		var article = articles.get(id);
		var articleView = new ArticleView({model:article});

		$(".content").html(articleView.el);
	},
	add:function(){

		var addArticleView = new AddArticleView();

		$(".content").html(addArticleView.el);
	},
	edit:function(id){
		var article = articles.get(id);
		var editArticleView = new EditArticleView({model:article});

		$(".content").html(editArticleView.el);
	},
	login:function(){
		var loginView = new LoginView();

		$(".content").html(loginView.el);
	},
	logOut:function(){
		auth.logout();
	}
});

