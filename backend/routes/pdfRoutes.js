const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdfController");
const certController = require("../controllers/certController");

router.get("/download-report", pdfController.downloadReport);
router.get("/download-certificate", certController.downloadCertificate);

module.exports = router;
