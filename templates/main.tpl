{% extends 'parent.tpl' %}


{% block content %}

{% include 'widget/header.tpl' %}

<nav>
    <div>
        <p data-href="/page">Page</p>
        <p data-href="/about">About</p>
    </div>
</nav>


<views id="views" class="views">

</views>

{% include 'widget/footer.tpl' %}

{% endblock %}
