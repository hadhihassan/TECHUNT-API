import mongoose from "mongoose"


const { Schema, ObjectId } = mongoose;

const AdminSchema = new Schema({
  userName: { type: String },
  Password: { type: String },
});

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;


