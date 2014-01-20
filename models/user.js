var Model = require('./model')
  , bcrypt = require('bcrypt')
  , q = require('q')
  , user = new Model('users')
;

function generateHash(password) {
  var deferred = q.defer();

  //Generate Password Hash Using Bcrypt
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      return deferred.reject(err);
    }
    return deferred.resolve(hash);
  });

  return deferred.promise;
}

user.insert = function(u) {
  var self = this;
  generateHash(u.password).then(function(hash) {
    console.log(hash);
    u.hash = hash;
    //delete u.password;
    //Model.prototype.insert.call(self, u);
    //
    bcrypt.compare(u.password + 'hello', hash, function(err, res) {
      console.log(res);
    });
  });
};

module.exports = user;
