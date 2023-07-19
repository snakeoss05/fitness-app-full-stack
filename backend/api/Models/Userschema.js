import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  lastname: { type: String },
  address: { type: String },
  email: { type: String },
  startdate: { type: Date },
  finDate: { type: Date },
  phonenumber: { type: String },
  musculation: { type: Boolean },
  boxe: { type: Boolean },
  hashedPassword: { type: String },
  cardio: { type: Boolean },
  taekwondo: { type: Boolean },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model("User", userSchema);

export default User;
