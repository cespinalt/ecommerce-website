const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {type: String, require: true, unique: true,lowercase: true},
  password: String,
  profile: {
    name: {type: String, default: ''},
    image: {type: String},
  },
  history: [
    {
      item: String,
      paid: Number,
      date: Date,
    }
  ]
});


// Hash user password before saving to DB
UserSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified()) {
    bcrypt.genSalt(10, function(err, salt) {
      if(err) {
        return next();
      }

      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if(err) {
          return next();
        }
        user.password = hash;
        next();
      });
    });
  }
});


// Compare password
UserSchema.methods.compare = function(password) {
  bcrypt.compare(password, this.password, function(err, matches) {
    if(err) {
      return next();
    }

    if(matches) {
      console.log('Correct Password');
    }
  });
}

module.exports = mongoose.model('User', UserSchema);
