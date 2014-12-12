
exports.getTimeBefore = function(time){
    if(time.toString().length <= 10)
        time = time + '000';

    var timebefore = +new Date() - time;
    if(timebefore < 0)
        return '刚刚';

    if( timebefore < 60 * 60 * 1000 )
        return Math.floor(timebefore/(60*1000)) + '分钟前';

    if( timebefore < 24 * 60 * 60 * 1000 )
        return Math.floor(timebefore/(60 * 60*1000)) + '小时前';

    else
        return Math.floor(timebefore/(24 * 60 * 60 * 1000)) + '天前';
};

exports.swig = function(swig){
    swig.setFilter('timebefore', function (input) {
        return module.exports.getTimeBefore(input);
    });
};


