

exports.main = function(req, res, next){
    res.locals.test = 'Hi';

    next();
};
