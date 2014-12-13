var BaseView = require('./base');


var pageView;
var PageView = BaseView.extend({
    id:'view-page',
    template: swig.compile(require('../../templates/widget/page.tpl')),
    initialize: function(){
        BaseView.prototype.initialize.apply(this, arguments);
        
        this.render();
    },
    render: function(){
        this.$ct.append(this.template());
    }
});


exports.render = function(page){
    if(!pageView)
        pageView = new PageView();

    pageView.show();
};
