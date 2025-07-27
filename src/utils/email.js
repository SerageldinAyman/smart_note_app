import nodemailer from 'nodemailer';

/**
 * Email utility functions for sending emails
 */

/**
 * Create email transporter
 * @returns {Object} - Nodemailer transporter
 */
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

/**
 * Send OTP email for password reset
 * @param {string} email - Recipient email address
 * @param {string} otp - One-time password
 * @returns {Promise} - Email sending promise
 */
export const sendOTPEmail = async (email, otp) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset OTP - Smart Note App',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>You have requested to reset your password for Smart Note App.</p>
        <p>Your One-Time Password (OTP) is:</p>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 3px; margin: 20px 0;">
          ${otp}
        </div>
        <p><strong>This OTP will expire in 10 minutes and can only be used once.</strong></p>
        <p>If you did not request this password reset, please ignore this email.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">Smart Note App - Secure Note Management</p>
      </div>
    `
  };
  
  return await transporter.sendMail(mailOptions);
};

