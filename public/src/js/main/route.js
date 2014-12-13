require('../../../../utils/functions').swig(window.swig); 


var frameRouter;
var FrameRouter = Backbone.Router.extend({
    routes:{
        "page": "page",
        "about": "about"
    },
    page: require('./views/page').render,
    about: require('./views/about').render,
    
    execute: function(callback, args){//common change funcs here
        callback && callback.apply(this, args);
    }
});



exports.init = function(){
    frameRouter = new FrameRouter();

    $('*[data-href]').act(function(e){
        frameRouter.navigate($(e.target).data('href') , {trigger:true});
    });


    Backbone.history.start({pushState: true});
};



exports.getRouter = function(){
    return frameRouter;
};


