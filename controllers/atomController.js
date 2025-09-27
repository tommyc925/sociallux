import Atom from "../models/atom.js";

export const createAtom = async (req, res) => {
  try {
    const atom = new Atom();
    await atom.save();
    res.status(201).json(atom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAtoms = async (req, res) => {
  try {
    const atoms = await Atom.find();
    res.json(atoms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

export const patchAtom = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const atom = await Atom.findByIdAndUpdate(id, { name }, { new: true });
    if (!atom) {
      return res.status(404).json({ error: "Atom not found" });
    }
    res.json(atom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
