var connect = require('./connection')
  , deferred = require('q').defer()
  , ObjectID = require('mongodb').ObjectID
;

var Model = function(collectionName) {
  this.collectionName = collectionName;
};

Model.prototype.get = function(id) {
  connect(this.collectionName).then(function(objects){
    //Object is passed for finding an array of items
    if(typeof(id) === 'object') {
      objects.find(id, function(err, cursor) {
        if (err) {
          return deferred.reject(err);
        }
        return deferred.resolve(cursor);
      });
    //Id is passed to get one object back
    } else {
      objects.findOne({_id: new ObjectID(id)}, function(err, object) {
        if (err) {
          return deferred.reject(err);
        }
        return deferred.resolve(object);
      });
    }
  });
  return deferred.promise;
}

Model.prototype.insert = function(object) {
  connect(this.collectionName).then(function(objects){
    objects.insert(object);
  });
}

module.exports = Model;
