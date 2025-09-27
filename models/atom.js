import mongoose from "mongoose";

const atomSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  name: String,
});

const Atom = mongoose.model("Atom", atomSchema);
export default Atom;
