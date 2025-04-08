const PDFDocument = require("pdfkit");
const path = require("path");

exports.downloadCertificate = (req, res) => {
    const { name, moduleName, dateCompleted, squadronImage } = req.query;

    const doc = new PDFDocument({ layout: "landscape", margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${name.replace(" ", "_")}_${moduleName.replace(" ", "_")}_Certificate.pdf`
    );

    doc.pipe(res);

    const SWEG_Shield = path.join(__dirname, "../assets/402 SWEG Shield.png");
    const SoftwareDirectorateShield = path.join(__dirname, "../assets/SoftwareDirectorateShield.png");

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    doc
        .rect(30, 30, pageWidth - 60, pageHeight - 60)
        .lineWidth(1)
        .strokeColor("#999")
        .stroke();

    // Top images 
    doc.image(SWEG_Shield, pageWidth * 0.15 - 50, pageHeight * .25, { width: 150 });
    doc.image(SoftwareDirectorateShield, pageWidth * 0.85 - 90, pageHeight * .25, { width: 150 });

    // Move down past the images
    doc.moveDown(4);

    doc
        .fontSize(30)
        .font("Times-Bold")
        .text("The United States Air Force", { align: "center" });

    doc
        .moveDown(1)
        .fontSize(16)
        .font("Times-Roman")
        .text("CERTIFIES THAT", { align: "center" });

    doc
        .moveDown(1)
        .fontSize(28)
        .font("Times-Bold")
        .fillColor("#000")
        .text(name.toUpperCase(), { align: "center" });

    doc
        .moveDown(1)
        .fontSize(14)
        .font("Times-Roman")
        .text("HAS SUCCESSFULLY COMPLETED THE", { align: "center" });

    doc
        .moveDown(1)
        .fontSize(20)
        .font("Times-Bold")
        .text(`${moduleName} Training`, { align: "center" })

    doc
        .moveDown(1)
        .fontSize(12)
        .font("Times-Roman")
        .text("AND IS HEREWITH AWARDED THIS", { align: "center" });

    doc
        .moveDown(1)
        .fontSize(36)
        .font("Times-BoldItalic")
        .text("Certificate of Training", { align: "center" });

    doc
        .moveDown(2)
        .fontSize(14)
        .fillColor("black");

    const footerY = doc.y;
    doc.text("Conferred on", 200, footerY);
    doc.text(dateCompleted, pageWidth - 400, footerY, { align: "center" });

    doc.end();
};
