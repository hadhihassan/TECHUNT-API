const invitationTemplate = (clientName, projectName, projectDescription, projectLink) => {
    return `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .logo {
                width: 100px;
                height: auto;
            }
            .content {
                margin-bottom: 20px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="your-logo.png" alt="Your Logo" class="logo">
                <h1>Invitation to Collaborate on a Project</h1>
            </div>
            <div class="content">
                <p>Hello ${clientName},</p>
                <p>You are invited to collaborate on the following project:</p>
                <h2>${projectName}</h2>
                <p>${projectDescription}</p>
                <p>Click the button below to view the project details and accept the invitation:</p>
                <a href="${projectLink}" class="button">View Project</a>
            </div>
            <p>Best regards,</p>
            <p>Your Name</p>
        </div>
    </body>
    </html>
    `;
};

export default invitationTemplate 
