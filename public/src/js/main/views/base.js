
module.exports = Backbone.View.extend({
    tagName: 'view',
    appendView: function(){
        if (!$('#views #' + this.id).length) {
            $('#views').append(this.el);
        }
    },
    initialize: function(){
        this.$el.addClass(this.id).addClass('page-view');
        this.appendView();
        if(!this.$el.find('content').length)
            this.$el.append('<content></content>');
        this.$ct = this.$el.find('content');
        this.ct = this.$ct[0];
    },
    show: function(){
        var views = $('#views>view');
        views.forEach(function(item){
            if(item.id == this.id)
                $(item).show();
            else
                $(item).hide();
        }.bind(this));
    }
});

