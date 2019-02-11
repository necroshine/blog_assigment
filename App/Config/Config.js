var config = require('./Config'),
express = require('express');


// Do express configuration and middleware

module.exports = function(app) {


	app.configure(function(){
		app.set('port', 8080);
		app.set('views', __dirname + './../Views/');
		app.set('view engine', 'hbs');
		app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser('your secret here'));
		app.use(express.session());
		app.use(app.router);
		//app.use(require('less-middleware')({ src: __dirname + '/../public' }));
		app.use(express.static(__dirname + '/../public'));
	});

	app.configure('development', function(){
	  app.use(express.errorHandler());
	});

};
