import ejs from 'ejs'

const invitationTemplate = (clientName, projectName, projectDescription, projectLink) => {
    return `
    Invitation to Collaborate on a Project

    Hello ${clientName},
    You are invited to collaborate on the following project:
    ${projectName}
    Click the link below to view the project details:
    ${projectLink}
    
    Best regards,
    `;
};

export default invitationTemplate 
