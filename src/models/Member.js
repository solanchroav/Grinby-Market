//New scheme for members that configures how data is saved to the server.

const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcryptjs');

const MemberSchema = new Schema({
  brand_name: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  job_title: { type: String, required: true },
  gravatar: { type: String },
  website: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

//Creating methods. Encrypting password
MemberSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

//Compares the encrypted password with the one given by the user "(this.password)".
MemberSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Member', MemberSchema);