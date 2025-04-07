const db = require("../config/db");
const PDFDocument = require("pdfkit");

exports.downloadReport = (req, res) => {
    const { squadron, flight, search, module1Progress, module2Progress, module3Progress, all_modules } = req.query;

    let sql = `
        SELECT u.user_id, u.first_name, u.last_name, u.squadron, u.flight,
               MAX(CASE WHEN m.name = 'STINFO' THEN gp.progress ELSE 0 END) AS module1,
               MAX(CASE WHEN m.name = 'Records Management' THEN gp.progress ELSE 0 END) AS module2,
               MAX(CASE WHEN m.name = 'No FEAR Act' THEN gp.progress ELSE 0 END) AS module3
        FROM users u
        LEFT JOIN game_progress gp ON u.user_id = gp.user_id
        LEFT JOIN modules m ON gp.module_id = m.module_id
        WHERE 1=1
    `;

    const queryParams = [];

    if (squadron) {
        sql += " AND u.squadron = ?";
        queryParams.push(squadron);
    }
    if (flight) {
        sql += " AND u.flight = ?";
        queryParams.push(flight);
    }
    if (search) {
        sql += " AND (u.first_name LIKE ? OR u.last_name LIKE ?)";
        queryParams.push(`%${search}%`, `%${search}%`);
    }

    sql += " GROUP BY u.user_id, u.first_name, u.last_name, u.squadron, u.flight";

    let havingConditions = [];
    if (module1Progress) {
        havingConditions.push(`MAX(CASE WHEN m.name = 'STINFO' THEN gp.progress ELSE 0 END) ${module1Progress === "complete" ? '=' : '<'} 100`);
    }
    if (module2Progress) {
        havingConditions.push(`MAX(CASE WHEN m.name = 'Records Management' THEN gp.progress ELSE 0 END) ${module2Progress === "complete" ? '=' : '<'} 100`);
    }
    if (module3Progress) {
        havingConditions.push(`MAX(CASE WHEN m.name = 'No FEAR Act' THEN gp.progress ELSE 0 END) ${module3Progress === "complete" ? '=' : '<'} 100`);
    }
    if (all_modules) {
        const comparator = all_modules === "complete" ? '=' : '<';
        havingConditions.push(
            `MAX(CASE WHEN m.name = 'STINFO' THEN gp.progress ELSE 0 END) ${comparator} 100`,
            `MAX(CASE WHEN m.name = 'Records Management' THEN gp.progress ELSE 0 END) ${comparator} 100`,
            `MAX(CASE WHEN m.name = 'No FEAR Act' THEN gp.progress ELSE 0 END) ${comparator} 100`
        );
    }

    if (havingConditions.length > 0) {
        sql += " HAVING " + havingConditions.join(" AND ");
    }

    db.query(sql, queryParams, (err, results) => {
        if (err) {
            console.error("Database error:", err.sqlMessage || err);
            return res.status(500).json({ error: "Database query failed", details: err.sqlMessage || err });
        }

        // Set headers BEFORE streaming
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(16).text("User Report", { align: "center" }).moveDown();

        results.forEach(user => {
            doc
                .fontSize(12)
                .text(`Name: ${user.first_name} ${user.last_name}`)
                .text(`Squadron: ${user.squadron}`)
                .text(`Flight: ${user.flight}`)
                .text(`Module 1 Progress: ${user.module1}%`)
                .text(`Module 2 Progress: ${user.module2}%`)
                .text(`Module 3 Progress: ${user.module3}%`)
                .moveDown();
        });

        doc.end(); // Ends stream — PDF is sent
    });
};
