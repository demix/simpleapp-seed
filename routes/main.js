var express = require('express');
var path = require('path');

module.exports = function(app){


    app.get('*', require('../controllers/common').main);
    app.all(/^\/proxy\/(.*)/i , require('../controllers/proxy').main);



    if(app.get('env') == 'development'){
        var lessMiddleware = require('less-middleware');
        app.use(lessMiddleware(path.join(process.cwd(), 'public', 'src' ), {
            dest: path.join(process.cwd(), 'public'),
            debug: true,
            preprocess: {
                path: function(pathname){
                    return pathname.replace('css', 'less');
                }
            }
        }));

        var browserify = require('browserify-middleware');
        var stringify = require('stringify');
        app.use('/js', browserify(path.join(process.cwd(), 'public', 'src', 'js'), {
            transform: stringify(['.tpl'])
        }));
    }
    app.use('/', express['static']('public'));

};
