import express from "express";
import { homeController } from "../controllers/homeController.js";
import {
  createAtom,
  getAtoms,
  getAtomById,
  deleteAtom,
  patchAtom,
} from "../controllers/atomController.js";

const router = express.Router();

router.get("/", homeController);

router.post("/atom", createAtom);
router.get("/atoms", getAtoms);
router.get("/atom/:id", getAtomById);
router.delete("/atom/:id", deleteAtom);
router.patch("/atom/:id", patchAtom);

export default router;
