// models/Atom.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const AtomValueSchema = new Schema(
  {
    vid: { type: Number, required: true }, // local pointer, unique within this Atom
    order: { type: Number, default: 0 }, // UI display order (independent of vid)

    key: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: [
        "string",
        "number",
        "boolean",
        "array_string",
        "array_number",
        "array_boolean",
      ],
      required: true,
    },

    s: { type: String },
    n: { type: Number },
    b: { type: Boolean },
    aS: { type: [String] },
    aN: { type: [Number] },
    aB: { type: [Boolean] },
  },
  { _id: false }
);

// Keep the slot validator from before (unchanged)…
AtomValueSchema.pre("validate", function (next) {
  const slotsByType = {
    string: ["s"],
    number: ["n"],
    boolean: ["b"],
    array_string: ["aS"],
    array_number: ["aN"],
    array_boolean: ["aB"],
  };
  const allowed = new Set(slotsByType[this.type] || []);
  const provided = {
    s: this.s !== undefined,
    n: this.n !== undefined,
    b: this.b !== undefined,
    aS: this.aS !== undefined,
    aN: this.aN !== undefined,
    aB: this.aB !== undefined,
  };
  for (const k of Object.keys(provided)) {
    if (provided[k] && !allowed.has(k))
      return next(
        new Error(
          `Value for type "${this.type}" must use only: ${[...allowed].join(
            ", "
          )}`
        )
      );
  }
  if ([...allowed].every((slot) => this[slot] === undefined)) {
    return next(
      new Error(
        `Missing value for type "${this.type}" (expected ${[...allowed].join(
          ", "
        )})`
      )
    );
  }
  next();
});

const AtomSchema = new Schema(
  {
    title: { type: String, trim: true },
    summary: { type: String, trim: true },
    tags: { type: [String], index: true, default: [] },

    values: { type: [AtomValueSchema], default: [] },

    links: [
      {
        to: { type: Schema.Types.ObjectId, ref: "Atom", required: true },
        label: { type: String, trim: true },
      },
    ],
    lexemes: [{ type: Schema.Types.ObjectId, ref: "Lexeme" }],

    meta: {
      nextVid: { type: Number, default: 0 }, // the next vid to assign
    },

    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

// Text index as before:
AtomSchema.index({
  title: "text",
  summary: "text",
  "values.s": "text",
  tags: "text",
});
// Optional: make lookups by vid fast
AtomSchema.index({ "values.vid": 1 });

// Ensure vids are unique within the Atom and assign defaults
AtomSchema.pre("validate", function (next) {
  const seen = new Set();
  let bumpNext = false;

  // assign missing order to current index (stable default)
  this.values.forEach((v, i) => {
    if (typeof v.order !== "number") v.order = i;
  });

  // 1) ensure/assign vid
  for (const v of this.values) {
    if (typeof v.vid !== "number") {
      v.vid = this.meta?.nextVid ?? 0;
      this.meta = this.meta || {};
      this.meta.nextVid = (this.meta.nextVid ?? 0) + 1;
      bumpNext = true;
    }
    if (seen.has(v.vid))
      return next(new Error(`Duplicate vid ${v.vid} in values[]`));
    seen.add(v.vid);
  }

  // 2) if user manually provided a larger vid, advance nextVid so we don't reuse
  if (!this.meta) this.meta = { nextVid: 0 };
  const maxVid = this.values.reduce((m, v) => Math.max(m, v.vid), -1);
  if (maxVid + 1 > this.meta.nextVid) this.meta.nextVid = maxVid + 1;

  next();
});

// Convenience helpers
AtomSchema.methods.findValueByVid = function (vid) {
  return this.values.find((v) => v.vid === vid);
};
AtomSchema.methods.updateValueByVid = function (vid, updater) {
  const idx = this.values.findIndex((v) => v.vid === vid);
  if (idx === -1) return false;
  this.values[idx] = { ...this.values[idx], ...updater };
  return true;
};
AtomSchema.methods.addValue = function ({ key, type, value, order }) {
  const base = { key, type, order };
  if (type === "string") base.s = String(value);
  else if (type === "number") base.n = Number(value);
  else if (type === "boolean") base.b = Boolean(value);
  else if (type === "array_string")
    base.aS = Array.isArray(value) ? value.map(String) : [];
  else if (type === "array_number")
    base.aN = Array.isArray(value) ? value.map(Number) : [];
  else if (type === "array_boolean")
    base.aB = Array.isArray(value) ? value.map(Boolean) : [];
  // vid assigned automatically in pre('validate')
  this.values.push(base);
};
AtomSchema.methods.reorderValue = function (vid, newOrder) {
  const v = this.findValueByVid(vid);
  if (!v) return false;
  v.order = Number(newOrder);
  // Optionally: normalize order across the array here
  return true;
};

export default mongoose.model("Atom", AtomSchema);
