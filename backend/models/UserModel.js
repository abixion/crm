const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const jwtPrivateKey = process.env.JWTSECRETKET;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id, name: this.name, email: this.email }, `${jwtPrivateKey}`);
  return token;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
