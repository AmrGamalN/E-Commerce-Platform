import { serviceResponse, responseHandler } from "../utils/responseHandler";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const emailHeader = () => `
  <div style="display: flex; align-items: center; background-color: rgb(0, 0, 0); color: white; padding: 10px; font-size: 24px; font-weight: bold; text-align: center;">
    <a href="${process.env.HALLA_DEALS_FRONT_END}" style="display: inline-block; margin-right: 10px;">
      <img src="https://halladealsimages.s3.me-south-1.amazonaws.com/HDLogo.png" alt="Halla Deals" style="max-width: 150px;" />
    </a>
    <span>Halla Deals</span>
  </div>
`;

const emailFooter = () => `
  <table role="presentation" style="width: 100%; margin-top: 30px; font-size: 12px; color: gray;">
    <tr>
      <td style="text-align: center;">
        <p>Halla Deals 2025 ©</p>
        <p>Halla Deals is a registered trademark of Halla Deals.</p>
        <p style="margin-top: 10px;">
          <strong>Follow us on:</strong>
          <a href="${process.env.HALLA_DEALS_FACEBOOK_URL}" style="margin: 0 5px;">
            <img src="https://cdn-icons-png.flaticon.com/24/174/174848.png" alt="Facebook" style="width: 20px;" />
          </a>
          <a href="${process.env.HALLA_DEALS_INSTAGRAM_URL}" style="margin: 0 5px;">
            <img src="https://cdn-icons-png.flaticon.com/24/174/174855.png" alt="Instagram" style="width: 20px;" />
          </a>
          <a href="${process.env.HALLA_DEALS_TWITTER_URL}" style="margin: 0 5px;">
            <img src="https://cdn-icons-png.flaticon.com/24/733/733579.png" alt="Twitter" style="width: 20px;" />
          </a>
        </p>
      </td>
    </tr>
  </table>
`;

export const sendEmail = (link: string, userName: string) => `
  <table role="presentation" style="width: 100%; font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; text-align: left;">
    <tr>
      <td>
        ${emailHeader()}
        <p style="margin-top: 30px;">Hello, ${userName}</p>

        <p>Hey there from Halla Deals!</p>
        <p>Thanks a bunch for signing up — we’re excited to have you with us.</p>
        <p>Just one last step: please confirm your email address below.</p>

        <div style="text-align: center;">
          <a href="${link}" style="
            display: inline-block;
            background-color: #038922;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            margin: 20px auto;
            border-radius: 4px;
            font-weight: bold;
          ">
            Validate email address
          </a>
        </div>

        <p>Do you want to know more about us? Follow our crazy adventures on Facebook, Twitter or Instagram!</p>
        <p>Don't hesitate to contact us if you have questions, suggestions or simply give us any feedback.</p>
        <p>Have a wonderful day,</p>

        ${emailFooter()}
      </td>
    </tr>
  </table>
`;

export const resetEmail = (link: string, email: string) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; direction: ltr; padding: 20px; text-align: left;">
    ${emailHeader()}
    <p style="margin-top: 30px;">Hi <strong>${email}</strong>,</p>
    <p>We received a request to reset your password.</p>
    <p>You can reset it by clicking the button below:</p>

    <div style="text-align: center;">
      <a href="${link}" style="
        display: inline-block;
        background-color: #038922;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        margin: 20px auto;
        border-radius: 4px;
        font-weight: bold;
      ">
        Reset Password
      </a>
    </div>

    <p>If you didn’t request a password reset, you can safely ignore this message.</p>
    <p>Best regards,<br />Halla Deals</p>
    ${emailFooter()}
  </div>
`;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.HOST_NODE_MAILER,
  auth: {
    user: process.env.USER_NODE_MAILER,
    pass: process.env.PASS_NODE_MAILER,
  },
  port: 587,
  secure: false,
});

export const sendVerificationEmail = async (
  email: string,
  subject: string,
  content: string
): Promise<responseHandler> => {
  try {
    const result = await transporter.sendMail({
      from: process.env.USER_NODE_MAILER,
      to: email,
      subject,
      html: content,
    });

    if (result.rejected.length > 0)
      return serviceResponse({
        statusText: "BadRequest",
        message: `Email rejected: ${result.rejected.join(", ")}`,
      });
    return { success: true };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again later"
    );
  }
};
