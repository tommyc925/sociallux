import Atom from "../models/atom.js";

// CREATE ATOM
export async function createAtom(req, res) {
  try {
    const atom = await Atom.create(req.body); // no transformations, no inference
    res.status(201).json(atom);
  } catch (err) {
    const isValidation = err?.name === "ValidationError";
    res.status(isValidation ? 400 : 500).json({
      error: {
        code: isValidation ? "validation_error" : "server_error",
        message: err.message,
      },
    });
  }
}

// READ ATOMS
// Get All Atoms
export const getAtoms = async (req, res) => {
  try {
    const atoms = await Atom.find();
    res.json(atoms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Atom by ID
export const getAtomById = async (req, res) => {
  try {
    const { id } = req.params;
    const atom = await Atom.findById(id);
    if (!atom) {
      return res.status(404).json({ error: "Atom not found" });
    }
    res.json(atom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE ATOM
// Delete Atom by ID
export const deleteAtom = async (req, res) => {
  try {
    const { id } = req.params;
    const atom = await Atom.findByIdAndDelete(id);
    if (!atom) {
      return res.status(404).json({ error: "Atom not found" });
    }
    res.json({ message: "Atom deleted", atom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE ATOM
// Patch Atom by ID
export async function patchAtom(req, res) {
  try {
    const { id } = req.params;
    const { title, summary, tags, values } = req.body || {};

    // Build a minimal $set from allowed fields only
    const update = {};
    if (title !== undefined) update.title = title;
    if (summary !== undefined) update.summary = summary;
    if (tags !== undefined) update.tags = tags; // expect array of strings
    if (values !== undefined) update.values = values; // expect full value objects

    if (Object.keys(update).length === 0) {
      return res
        .status(400)
        .json({
          error: {
            code: "empty_update",
            message: "No updatable fields provided.",
          },
        });
    }

    const atom = await Atom.findByIdAndUpdate(id, update, {
      new: true, // return updated doc
      runValidators: true, // run Mongoose validators
    });

    if (!atom) {
      return res
        .status(404)
        .json({ error: { code: "not_found", message: "Atom not found" } });
    }

    return res.json(atom);
  } catch (err) {
    const isValidation = err?.name === "ValidationError";
    return res.status(isValidation ? 400 : 500).json({
      error: {
        code: isValidation ? "validation_error" : "server_error",
        message: err.message,
      },
    });
  }
}
