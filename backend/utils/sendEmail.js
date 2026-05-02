const nodemailer = require("nodemailer");

/**
 * Send booking confirmation email
 * Uses Ethereal (fake SMTP) in dev mode if no real credentials are set.
 * Set EMAIL_USER and EMAIL_PASS in .env for production (Gmail, Outlook, etc.)
 */
const sendBookingEmail = async ({ to, userName, venueName, date, guests, totalAmount, payment }) => {
  try {
    let transporter;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // Production — real email (Gmail example)
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      // Development — Ethereal fake email (no real email sent)
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const mailOptions = {
      from: `"SmartEvent 🎉" <${process.env.EMAIL_USER || "noreply@smartevent.com"}>`,
      to,
      subject: `🎉 Booking Confirmed — ${venueName}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #7c3aed, #ec4899); padding: 30px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 28px;">🎉 Booking Confirmed!</h1>
          </div>
          <div style="padding: 30px; color: #e2e8f0;">
            <p style="font-size: 18px;">Hi <strong style="color: #c4b5fd;">${userName}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6;">
              Your booking has been confirmed! Here are the details:
            </p>
            <div style="background: rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid rgba(255,255,255,0.1);">
              <table style="width: 100%; border-collapse: collapse; color: #e2e8f0;">
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #a78bfa;">📍 Venue</td>
                  <td style="padding: 10px 0; text-align: right;">${venueName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #a78bfa;">📅 Date</td>
                  <td style="padding: 10px 0; text-align: right;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #a78bfa;">👥 Guests</td>
                  <td style="padding: 10px 0; text-align: right;">${guests}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #a78bfa;">💳 Payment</td>
                  <td style="padding: 10px 0; text-align: right; text-transform: uppercase;">${payment}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #a78bfa;">💰 Total</td>
                  <td style="padding: 10px 0; text-align: right; font-size: 18px; color: #34d399;">₹${totalAmount?.toLocaleString() || "N/A"}</td>
                </tr>
              </table>
            </div>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; text-align: center; margin-top: 30px;">
              Thank you for choosing SmartEvent! 🚀
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Email sent:", info.messageId);

    // In dev mode, show preview URL
    if (!process.env.EMAIL_USER) {
      console.log("📬 Preview URL:", nodemailer.getTestMessageUrl(info));
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email send error:", error.message);
    // Don't throw — email failure shouldn't break booking
    return { success: false, error: error.message };
  }
};

module.exports = { sendBookingEmail };
