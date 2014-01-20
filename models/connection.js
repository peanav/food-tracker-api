var MongoClient = require('mongodb').MongoClient
  , conf = require('../conf')
  , deferred = require('q').defer()

var connect = function(collection, cb) {
  // -1 no write concerns
  MongoClient.connect(conf.get('mongoUrl') + '?w=0', function(err, db) {

    if (err) {
      return deferred.reject(err);
    }

    deferred.resolve(collection ? db.collection(collection) : db);
  });

  return deferred.promise;
}

module.exports = connect;
