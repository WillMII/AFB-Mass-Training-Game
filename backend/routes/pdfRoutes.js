const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdfController");

// This route will handle generating the PDF with filters
router.get("/download-report", pdfController.downloadReport);

module.exports = router;
