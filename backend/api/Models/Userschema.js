import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  lastname: { type: String },
  address: { type: String },
  startdate: { type: Date },
  finDate: { type: Date },
  phonenumber: { type: String },
  musculation: { type: Boolean },
  boxe: { type: Boolean },
  hashedPassword: { type: String },
  cardio: { type: Boolean },
  active: { type: Boolean },
  karaté: { type: Boolean },
  femme: { type: Boolean },
  physique: { type: Boolean },
  taekwondo: { type: Boolean },
  filePath: { type: String },
 
});

const User = mongoose.model("User", userSchema);

export default User;
