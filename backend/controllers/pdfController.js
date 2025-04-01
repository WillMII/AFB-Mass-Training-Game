const PDFDocument = require("pdfkit");

const generatePDF = (res, title, content) => {
    const doc = new PDFDocument();
    
    res.setHeader("Content-Disposition", `attachment; filename=${title}.pdf`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);
    doc.fontSize(20).text(title, { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(content);
    doc.end();
};

exports.generateReport = (req, res) => {
    generatePDF(res, "Report", "This is the first type of PDF report.");
};

exports.generateCertificate = (req, res) => {
    generatePDF(res, "Summary", "This is the second type of PDF summary.");
};
