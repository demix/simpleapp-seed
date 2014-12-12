var querystring = require('querystring');
var config = require('../config');

var request_package = config.proxy_protocol == 'http:' ? require('http') : require('https');


exports.request = function(method, url, data, callback){
    data = data || '';
    if(typeof data  == 'object')
        data = querystring.stringify(data);

    var opt = {
        host: config.proxy_host,
        port: config.proxy_protocol == 'http:' ? '80' : '443',
        path: url.indexOf('/') == 0? url: ('/'+url),
        method: method.toUpperCase()
    };

    if (method.toUpperCase() == 'GET') {
        opt.path = opt.path + '?' + data;
    } else if(method.toUpperCase() == 'POST'){
        opt.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
        };
    }

    var req = request_package.request(opt, function(res){
        res.setEncoding('utf8');
        var result = '';
        res.on('data', function (chunk) {
            result += chunk;
            
        });
        res.on('end', function(){
            callback && callback(result);
        });
        
    });

    req.on('error', function(e) {
        callback && callback(JSON.stringify({status:500}));
    });

    if (method.toUpperCase == 'GET') {
        req.write(null);
    } else {
        req.write(data+'\n');
    }
    req.end();
};

exports.get = function(url, data, callback){
    module.exports.request('GET', url, data, callback);
};

exports.post = function(url, data, callback){
    module.exports.request('POST', url, data, callback);
};
