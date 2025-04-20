const nodemailer = require("nodemailer");

const sendResetEmail = async (email, resetLink) => {
    let transporter;
    let simulated = false;
    let senderEmail = process.env.EMAIL_USER;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        senderEmail = testAccount.user;
        simulated = true;
    } else {
        transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_SECURE === "true",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    const mailOptions = {
        from: `"Password Reset" <${senderEmail}>`,
        to: email,
        subject: "Mass Training Password Reset Link",
        html: `
            <p>Hello,</p>
            <p>You requested a password reset. Click below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>This link expires in 15 minutes.</p>
        `
    };

    const info = await transporter.sendMail(mailOptions);
    return {
        simulated,
        previewUrl: nodemailer.getTestMessageUrl?.(info) || info.response
    };
};

module.exports = { sendResetEmail };
