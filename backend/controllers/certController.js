const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.downloadCertificate = (req, res) => {
    const { name, moduleName, dateCompleted, squadronImage } = req.query;

    const doc = new PDFDocument({ layout: "landscape" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${name.replace(" ", "_")}_Certificate.pdf`);

    doc.pipe(res);

    const SWEG_Shield = path.join(__dirname, "../assets/402 SWEG Shield.png"); // 402 SWEG Shield image
    const SoftwareDirectorateShield = path.join(__dirname, "../assets/SoftwareDirectorateShield.png"); // Software Directorate Shield image
    const imageToUse = squadronImage ? path.join(__dirname, `../uploads/${squadronImage}`) : SoftwareDirectorateShield;

    // Top images
    doc.image(SWEG_Shield, 50, 50, { width: 100 });
    doc.image(imageToUse, 700, 50, { width: 100 });

    // Heading
    doc
        .fontSize(30)
        .font("Times-Bold")
        .text("The United States Air Force", { align: "center" });

    doc
        .fontSize(16)
        .font("Times-Roman")
        .text("CERTIFIES THAT", { align: "center", lineGap: 10 });

    doc
        .fontSize(28)
        .font("Times-Bold")
        .fillColor("#000")
        .text(name.toUpperCase(), { align: "center", background: "#e0e7ff" });

    doc
        .fontSize(14)
        .text("HAS SUCCESSFULLY COMPLETED THE", { align: "center", lineGap: 10 });

    doc
        .fontSize(20)
        .font("Times-Italic")
        .text(moduleName, { align: "center", background: "#e0e7ff" });

    doc
        .fontSize(12)
        .font("Times-Roman")
        .text("AND IS HEREWITH AWARDED THIS", { align: "center", lineGap: 10 });

    doc
        .fontSize(36)
        .font("Times-BoldItalic")
        .text("Certificate of Training", { align: "center", lineGap: 20 });

    // Footer date
    doc
        .fontSize(14)
        .text("Conferred on", 100, 400)
        .text(dateCompleted, 600, 400);

    doc.end();
};
