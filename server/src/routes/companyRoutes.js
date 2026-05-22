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

const uploadResume = (req, res, next) => {
  upload.single("resume")(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    if (error.code === "LIMIT_FILE_SIZE") {
      res.status(413).json({ message: "Resume file is too large. Upload a file under 8 MB." });
      return;
    }

    res.status(400).json({ message: error.message || "Resume upload failed." });
  });
};

router.post("/resume/extract", uploadResume, extractResume);
router.post("/analyze", createAnalysis);
router.get("/", listCompanies);
router.get("/:id", readCompany);
router.delete("/:id", removeCompany);

export default router;
