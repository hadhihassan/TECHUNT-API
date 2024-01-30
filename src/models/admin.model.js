const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const AdminSchema = new Schema({
  Name: { type: String },
  Password: { type: String },
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;


