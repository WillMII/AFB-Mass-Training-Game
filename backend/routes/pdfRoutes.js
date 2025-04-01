const express = require("express");
const { generateReport, generateCertificate } = require("../controllers/pdfController");

const router = express.Router();

router.get("/download-report", generateReport);
router.get("/download-certificate", generateCertificate);

module.exports = router;