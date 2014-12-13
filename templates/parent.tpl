<!doctype html>
<html>
    <head>
        <meta name="charset" content="utf-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0, user-scalable=0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="address=no" />
        <title>{%block title%}{%endblock%}</title>
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <link rel="stylesheet" href="/css/m.css" type="text/css"/>
        <link rel="stylesheet" href="/css/{{appname}}.css" type="text/css"/>
    </head>
    <body>
            
        {%block content%}{%endblock%}
            
        <script src="/js/m.js"></script>
        {%block script%}
        <script src="/js/{{appname}}.js"></script>
        {%endblock%}

    </body>
</html>
