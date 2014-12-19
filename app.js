var restify = require('restify');

var staticServer = restify.createServer({
    name: 'AjaxCORSSamplePage'
});

var restServer = restify.createServer({
    name: 'AjaxCORSSampleRest'
});

staticServer.get("/", restify.serveStatic({
    directory: '.',
    default: 'index.htm'
}));

var allowedHeaders = 'Content-Type,MyCustomHeader,MyOtherCustomHeader';

restServer.opts('/ping', function (req, res, next) {
    var origin = (req.header('Origin') || "*");
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', allowedHeaders);
    res.header('Content-Length', 0);
    res.send(204);
    return next();
});

restServer.post('/ping', function (req, res, next) {
    var origin = (req.header('Origin') || "*");
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Expose-Headers', allowedHeaders);

    // Custom headers
    res.header('MyCustomHeader', 'coucou');
    res.header('MyOtherCustomHeader', 'hello');

    res.send(200, {
        'result': 'pong'
    });
    return next();
});

staticServer.listen(3333);
restServer.listen(4444);