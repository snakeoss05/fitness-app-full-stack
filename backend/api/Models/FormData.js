import mongoose from "mongoose";

const Schema = mongoose.Schema;

const clientCommandSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  adresse: {
    type: String,
  },
  city: {
    type: String,
  },
  CodePostal: {
    type: Number,
  },
  clientId: { type: String },
  phoneNumber: { type: String },
  cartitems: { type: Array },
});

export default mongoose.model("ClientCommands", clientCommandSchema);
