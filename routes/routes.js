import express from "express";
import { homeController } from "../controllers/homeController.js";
import {
  createAtom,
  getAtoms,
  deleteAtom,
  patchAtom,
} from "../controllers/atomController.js";

const router = express.Router();

router.get("/", homeController);

router.post("/atom", createAtom);
router.get("/atoms", getAtoms);
router.delete("/atom/:id", deleteAtom);
router.patch("/atom/:id", patchAtom);

export default router;
