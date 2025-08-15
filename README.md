# TCM HMS - Hospital Management System

[![Frontend](https://img.shields.io/badge/frontend-React-blue)](https://iridescent-conkies-4e5931.netlify.app/)  
[![Backend](https://img.shields.io/badge/backend-Node.js-green)](https://bd7c5f10-843b-47df-9090-18622880699d-02v9pt1apuy116.pike.replit.dev)  

---

## Project Overview

**TCM HMS** (Traditional Clinic Management Hospital Management System) is a full-stack web application designed to streamline hospital management and healthcare services.  
It enables patients to book appointments, upload health reports, and consult with doctors online via video calls and AI-assisted chatbots. Doctors can manage their appointments, update statuses, and interact with patients efficiently. The system also includes an admin panel for monitoring and managing the platform.

This project aims to improve healthcare accessibility and efficiency by bridging patients and healthcare professionals through modern web technology.

---

## Live Demo

- **Frontend:** [https://iridescent-conkies-4e5931.netlify.app/](https://iridescent-conkies-4e5931.netlify.app/)  
- **Backend API:** [https://bd7c5f10-843b-47df-9090-18622880699d-02v9pt1apuy116.pike.replit.dev](https://bd7c5f10-843b-47df-9090-18622880699d-02v9pt1apuy116.pike.replit.dev)  

---

## Features

### Patient
- User registration and login
- Browse and filter doctors by specialty
- Book video appointments with doctors based on availability
- Upload and view personal health reports
- AI health assistant chatbot for general health inquiries
- Manage personal profile and appointment history

### Doctor
- Manage appointment schedules and statuses
- View patient details and health reports
- Join video calls with patients directly
- Profile management with specialization and credentials

### Admin
- View dashboard with site statistics
- Manage doctor requests and approvals
- Review site messages and user interactions
- Reset admin password and maintain security

---

## Tech Stack

| Layer       | Technology                            |
|-------------|------------------------------------|
| Frontend    | React, Vite, Tailwind CSS           |
| Backend     | Node.js, Express.js, MongoDB, Mongoose |
| Authentication | JWT, Cookie-based sessions         |
| APIs       | Axios                             |
| Real-time  | Jitsi Meet (Video Calls)            |
| AI         | OpenRouter API for AI Chatbot       |
| Hosting    | Netlify (Frontend), Replit (Backend) |

---

## Architecture Overview

- **React frontend** communicates with a **Node.js/Express** backend via REST APIs.
- Backend handles user authentication, appointment booking, file uploads, and doctor management.
- MongoDB Atlas used as the cloud database for storing users, appointments, and reports.
- CORS configured to allow secure communication between frontend and backend domains.
- Video calls powered by Jitsi Meet integration.
- AI chatbot integrated through OpenRouter API for interactive health assistance.

---

## Installation & Local Setup

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (if running locally)
- Git

### Clone the repo
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name


### Backend setup
cd backend
npm install

- Create a `.env` file in the backend root with the following:
PORT=1000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key

- Start backend server:
npm run start

### Frontend setup
cd ../frontend
npm install
npm run dev


- The frontend will open on `http://localhost:3000` (default Vite behavior).

---

## Deployment

- The **frontend** is deployed on Netlify at:  
  [https://iridescent-conkies-4e5931.netlify.app/](https://iridescent-conkies-4e5931.netlify.app/)  
- The **backend** is deployed on Replit at:  
  [https://bd7c5f10-843b-47df-9090-18622880699d-02v9pt1apuy116.pike.replit.dev](https://bd7c5f10-843b-47df-9090-18622880699d-02v9pt1apuy116.pike.replit.dev)  

### Important Notes on Deployment

- CORS origin in the backend is configured to accept requests from both `localhost` (for development) and the Netlify frontend URL.
- When changing frontend deployment URLs, update backend CORS allowed origins accordingly.
- MongoDB Atlas IP whitelist should allow requests from your backend server environment.

---

## Folder Structure
--> /backend

-->  controllers/

-->  models/

-->  routes/

-->  middleware/

 --> server.js
    /frontend

-->  src/

-->  components/

-->   pages/

-->   store/

-->   App.jsx

-->  vite.config.js

-->  package.json


---

## Future Improvements

- Implement push notifications for appointment reminders.
- Add more comprehensive patient health record management.
- Enhance AI chatbot with more medical knowledge.
- Introduce payment gateway for appointment fees.
- Integrate calendar sync and multi-language support.

---

## License

[MIT License](LICENSE)

---





