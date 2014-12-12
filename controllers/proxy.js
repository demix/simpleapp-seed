var request = require('../utils/request');


var PATH_PAIR = {
    'list/hot': 'product/list'
};

exports.main = function(req, res){
    var path = req.params[0];
    
    var proxy_path = PATH_PAIR[path];
    
    if(!proxy_path){
        proxy_path = path;
    }

    var filename = path.split('/').shift(),
        actname = (path.split('/').slice(1) || 'main') + 'Transform';
    var data;
    try{
        data = require('./' + filename)[actname](req, res);
    }catch(e){
        data = Object.keys(req.query).length? req.query : req.body;
    }

    request.request(req.method, proxy_path, data, function(data){
        try{
            var act = require('./'+filename)[actname];
            data = JSON.parse(data);
            path = path.split('/');
            var filename = path.shift(),
                actname = path.join('') || 'main';
            act(req, res, data);
        }catch(e){
            res.json(data);
        }
    });
};
