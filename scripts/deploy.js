var CONFIG = {
    less: {
        source: 'public/src/less/',
        dest: 'public/css'
    },
    browserify: {
        source: 'public/src/js',
        dest: 'public/js'
    }
};

var fs = require('fs');
var BASE_DIR = process.cwd();
var path = require('path');


var doLess = function(callback) {
    console.log('===============================');
    console.log('===========Parse css===========');
    console.log('===============================');



    var lesscss = require('less');
    var cleancss = require('clean-css');

    var lessfiles = fs.readdirSync(path.join(BASE_DIR, CONFIG.less.source));
    var dones = 0;
    var checkDone = function(){
        dones ++;
        if(dones >= lessfiles.length){
            callback && callback();
        };
    };

    lessfiles.forEach(function(file){
        lesscss.render(fs.readFileSync(path.join(BASE_DIR, CONFIG.less.source, file)).toString(), {
            env: 'production',
            paths: [path.join(BASE_DIR, CONFIG.less.source)]

        }).then(function(output){
            var filename = file.split('.'). shift();

            var min = new cleancss().minify(output.css);

            fs.writeFileSync(path.join(BASE_DIR, CONFIG.less.dest, filename+'.css'), min);
            console.log(file + ' parsed.');
            checkDone();
        } , function(err){
            console.log(file + ' does\'t parsed.');
            checkDone();
        });
    });
    

};

var doBrowserify = function(callback){
    console.log('===============================');
    console.log('===========Parse js============');
    console.log('===============================');


    var browserify = require('browserify');
    var stringify = require('stringify');
    var uglify = require('uglify-js');
    
    var scripts = fs.readdirSync(path.join(BASE_DIR, CONFIG.browserify.source));
    var dones = 0;
    var checkDone = function(){
        dones ++;
        if(dones >= scripts.length){
            callback && callback();
        };
    };

    scripts.forEach(function(file){
        if(fs.statSync(path.join(BASE_DIR, CONFIG.browserify.source, file)).isDirectory()){
            checkDone();
            return;
        }
        var brs = browserify({
            entries:path.join(BASE_DIR, CONFIG.browserify.source, file),
            basedir: path.join(BASE_DIR, CONFIG.browserify.source)
        });

        brs.transform(stringify(['.tpl']));

        brs.bundle( function(err, src){
            if( err ){
                console.log(file + ' does\'t parse.');
                checkDone();
                return;
            }
            console.log(file + ' parsed.');
            fs.writeFileSync(
                path.join(BASE_DIR, CONFIG.browserify.dest, file),
                uglify.minify(src.toString(), {fromString: true}).code
            );
            checkDone();
        });
    });

};




doLess(function(){
    doBrowserify(function(){
        console.log('=============Done==============');
        var cp = require('child_process');
        cp.exec('forever start app.js' , function(error, stdout, stderr){
            console.log(stdout);
        });
    });
});
