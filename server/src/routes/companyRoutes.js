import { Router } from "express";
import multer from "multer";
import {
  createAnalysis,
  extractResume,
  listCompanies,
  readCompany,
  removeCompany
} from "../controllers/companyController.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024
  }
});

router.post("/resume/extract", upload.single("resume"), extractResume);
router.post("/analyze", createAnalysis);
router.get("/", listCompanies);
router.get("/:id", readCompany);
router.delete("/:id", removeCompany);

export default router;
