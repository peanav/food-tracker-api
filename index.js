var restify = require('restify')
  , conf = require('./conf');

var server = restify.createServer({
  name: 'food-tracker',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/meals/', function (req, res, next) {
  res.send({
    mongoUrl: conf.get('mongoUrl')
  });
  return next();
});

var port = conf.get('PORT');
server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
