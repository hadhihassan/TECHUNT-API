
# Techunt Freelancing Website 

Techunt is a freelancing web portal where freelancers and clients can connect and collaborate on projects. Techunt acts as an intermediary between freelancers and clients, facilitating job postings and payments.


## Features

- Client Features: Create job posts, manage contract, and oversee project creation.
- Freelancer Features: Send proposals, manage milestones, and receive payments upon milestone completion.
- Efficient talent and freelancer search and milestone tracking.


## Technologies Used

- Backend: Node.js, Express.js
- Database:  MongoDB
- Frontend: React.js, Redux, Tailwind CSS, Ant Design
- Integrations: Strip, JWT, Socket.IO, S3, Firebase, Nodemailer, Multer

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_DB_UERNAME` 

`MONGO_DB_PASSWORD` 

`ATLES_PASSWORD `

`DATABASE_URL `

`ATLAS_USERNMAE`

`ATLAS_DATABASE_NAME `

`ATLAS_clusterUrl `

`DATABASE_NAME `

`BASE_URL `   client origin 

`HOST `

`SERVICE `  emil send server 

`EMAIL_PORT ` 

`SECURE `   SMTP secure option 

`USER `   Email Usrename

`PASS`   Email Password

`JWT_SECRET_KEY `

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

`CALLBACK_URL`   OAuth callback url

`S3_AWS_ACCESS_KEY_ID`

`S3_AWS_SECRET_KEY `

`AWS_S3_BUCKET_NAME`

`STRIP_SECRET_KEY`

`CLIENT_ORIGIN `

`CLIENT`   CLIENT_ORIGIN

`ADMIN_USER_NAME`

`ADMIN_PASSWORD`



## Run Locally

Clone the project

```bash
  git clone https://github.com/hadhihassan /Timeszone.git
```

Go to the project directory

```bash
  cd Techunt-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Feel free to reach out if you encounter any issues during the configuration process.
## Admin-side Features

- **Dashboard**
    - Admins have access to a comprehensive dashboard that provides an overview of platform statistics, user activity, financial metrics, and key performance indicators.
- **User Management**
    - Admins can manage all users (clients and freelancers) and have the ability to block or deactivate accounts if necessary.
- **Job Category Management**
    - Admins can add, edit, and delete job categories, providing full management capabilities for categorizing job postings.
- **Subscription Plan Management**
    - Admins can create, modify, and manage subscription plans, including pricing, features, and benefits to offer tailored options for users.
 

## Client-side Features


- **Job Posts**
    - Clients can create, edit, and delete job posts, providing full management capabilities for their projects.
- **Contract Management**
    - Clients can create, edit, and send contracts to freelancers, ensuring clear and formal agreements.
- **Milestone Management**
    - Clients can split projects into multiple portions, each with detailed descriptions and associated features, payments, and deadlines.
- **Notifications**
    - Clients receive real-time notifications for payment updates, application statuses, milestone status updates, and other critical alerts.
- **Chat**
    - Clients can directly message freelancers to discuss project details and collaborate effectively.
- **Freelancer Search**
    - Clients can easily search for freelancers, send messages, and propose projects to suitable candidates.
- **Reviews**
    - After project completion, clients can write reviews to share their experience and provide feedback.

## Freelncer-side Features


- **Proposal Submission**
    - Freelancers can submit detailed proposals for job postings, including relevant documents to showcase their expertise.
- **Notifications**
    - Freelancers receive real-time notifications for payment updates, application statuses, and other critical alerts.
- **Subscription**
    - Premium members unlock advanced features, such as instant notifications for new job postings and access to detailed contact information.
- **Chat**
    - Freelancers can directly message clients to discuss project details and collaborate effectively.
- **Job Searching**
    - Freelancers can easily search and apply for job opportunities tailored to their skills and interests.
