var BaseView = require('./base');


var aboutView;
var AboutView = BaseView.extend({
    id:'view-about',
    template: swig.compile(require('../../templates/widget/about.tpl')),
    initialize: function(){
        BaseView.prototype.initialize.apply(this, arguments);
        
        this.render();
    },
    render: function(){
        this.$ct.append(this.template());
    }
});


exports.render = function(about){
    if(!aboutView)
        aboutView = new AboutView();

    aboutView.show();
};
