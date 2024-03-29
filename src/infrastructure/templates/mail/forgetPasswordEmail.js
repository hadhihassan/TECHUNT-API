import ejs from 'ejs';

const forgetPasswordTemplate = (userName, otp) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>One-Time Password (OTP)</title>
        <style>
            /* Global styles */
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
                text-align: center;
                margin-bottom: 20px;
                color: #333;
            }
            p {
                margin-bottom: 10px;
                color: #666;
            }
            .otp-code {
                text-align: center;
                font-size: 36px;
                padding: 20px;
                background-color: #f2f2f2;
                border-radius: 5px;
                margin-bottom: 20px;
            }
            .info-text {
                color: #777;
            }
            .footer-text {
                text-align: center;
                color: #888;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>One-Time Password (OTP) for Verification</h2>
            <p>Dear ${userName},</p>
            <p>Your one-time password (OTP) for verification is:</p>
            <h1 class="otp-code">${otp}</h1>
            <p>Please use this OTP to complete your verification process.</p>
            <p class="info-text">This OTP is valid for a single use and will expire after a short period of time.</p>
            <p class="info-text">If you did not request this OTP, please ignore this email.</p>
            <p class="footer-text">Thank you,<br>TECHUNT</p>
        </div>
    </body>
    </html>
    `
};

export default forgetPasswordTemplate;
