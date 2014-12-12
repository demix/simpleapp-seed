var express = require('express');
var swig = require('swig');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var cluster = require('cluster');

var app = express();
var env = app.get('env') || 'development';
app.set('env', env);


var boot = function(){
    app.set('port', process.env.PORT || 8150);



    app.engine('tpl', swig.renderFile);
    app.set('view engine', 'tpl');
    app.set('views', __dirname + '/templates');

    if ('development' == env) {
        app.set('view cache', false);
        swig.setDefaults({cache: false});
    }

    //app.use(cookieParser('user_specified'));  //session encrypted cookie
    //app.use(bodyParser.urlencoded({ extended: false })); // post body
    app.use(compression()); // gzip


    app.use(function(req, res, next) {
        //Can add some request intercepter
        next();
    });

    // load route
    require('fs').readdirSync(__dirname + '/routes').forEach(function(file) {
        require(__dirname + '/routes/' + file)(app);
    });

    app.use(function(req, res, next) {
        res.status(404).json({ERROR: 'Page not found.'});
    });
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).json({ERROR: 'Internal server error.'});
    });



    app.listen(app.get('port'));
    console.log('Application Started on http://localhost:' + app.get('port'));
};


if (cluster.isMaster && app.get('env') == 'production') { // Add cluster support
    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i++) {
        cluster.fork();
    }
} else {
    boot();
    //require('./utils/functions').swig(swig);   //swig extension

}
