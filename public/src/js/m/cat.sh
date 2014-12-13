cd zepto

MODULES="zepto event ajax detect touch" npm run-script dist

cp dist/zepto.min.js ../
cd ..

cat zepto.min.js jquery.cookie.js lodash.min.js backbone-min.js swig.min.js > ../../../js/m.js
