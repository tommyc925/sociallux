import express from "express";
import { homeController } from "../controllers/homeController.js";
import {
  createAtom,
  getAtoms,
  getAtomById,
  deleteAtom,
  patchAtom,
} from "../controllers/atomController.js";

// Initialize router
const router = express.Router();

// Establish a root route
router.get("/", homeController);

// Atom CRUD routes
router.post("/atom", createAtom);
router.get("/atoms", getAtoms);
router.get("/atom/:id", getAtomById);
router.delete("/atom/:id", deleteAtom);
router.patch("/atom/:id", patchAtom);

// Export the router
export default router;
