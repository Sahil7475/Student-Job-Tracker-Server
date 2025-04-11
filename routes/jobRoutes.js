import express from "express";
import {
  addJob,
  getJobs,
  updateStatus,
  deleteJob,
} from "../controllers/jobController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/add", addJob);
router.get("/", getJobs);
router.patch("/:id/status", updateStatus);
router.delete("/:id", deleteJob);

export default router;
