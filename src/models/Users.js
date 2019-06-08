//New scheme that configures how data is saved to the server.

const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

//Creating methods. Encrypting password
UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

//Compares the encrypted password with the one given by the user "(this.password)".
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Users', UserSchema);
