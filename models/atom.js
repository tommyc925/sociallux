import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AtomValueSchema = new Schema(
  {
    vid: { type: Number, required: true }, // client supplies 0,1,2,...
    order: { type: Number, default: 0 }, // display order (optional)

    key: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: [
        "string",
        "number",
        "boolean",
        "array_string",
        "array_number",
        "array_boolean",
      ],
    },

    // explicit slots; no defaults, no validator
    s: String,
    n: Number,
    b: Boolean,
    aS: [String],
    aN: [Number],
    aB: [Boolean],
  },
  { _id: false }
);

const AtomSchema = new Schema(
  {
    title: { type: String, trim: true },
    summary: { type: String, trim: true },
    tags: { type: [String], default: [] },

    values: { type: [AtomValueSchema], default: [] },
  },
  { timestamps: true }
);

export default model("Atom", AtomSchema);
