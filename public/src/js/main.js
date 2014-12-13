//require('./common/link');
//require('./common/backbone');

$.fn.act = function(callback){
    if ('ontouchstart' in window) {
        return this.on('tap', callback);
    } else {
        return this.on('click', callback);
    }
};




require('./main/route').init();
