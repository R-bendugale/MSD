# Digital Lost and Found Management System 🎓

Official Web Application developed for **D. Y. Patil College of Engineering & Technology, Kolhapur (DYPCET)**.

---

## 📌 Project Overview
- **Project Name**: Digital Lost and Found Management System
- **Domain**: Web Application Development
- **Institution**: D. Y. Patil College of Engineering & Technology, Kolhapur
- **Student Name**: Shweta Tanaji Kolekar
- **Department**: Computer Science & Engineering (CSE)
- **Class**: B.Tech | **Roll No**: 29 | **Batch**: B2

### 🎯 Objectives
1. Provide a centralized digital platform for lost and found items on campus.
2. Replace scattered WhatsApp groups and physical notice boards.
3. Streamline reporting lost/found items with detailed location, date, and image uploads.
4. Enable ownership verification and claim approvals by campus admin.
5. Identify potential matches and return items safely to owners.

---

## 🛠️ Technology Stack
- **Frontend**: React.js (Vite), React Router DOM v6, Tailwind CSS v4, Lucide React Icons, Recharts, Canvas-Confetti
- **Backend**: Node.js, Express.js (RESTful API architecture)
- **Database**: MongoDB with Mongoose Schemas (User, Item, Claim, Notification)
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs password hashing
- **Image Uploads**: Multer middleware (local storage in `/uploads` static directory)

---

## 📂 Project Directory Structure

```
Digital_Lost_FOund/
├── client/                      # React Frontend Application
│   ├── public/                  # Static media assets & images
│   ├── src/
│   │   ├── components/          # Reusable UI Components (Navbar, HeaderTopBar, Footer, Sidebar)
│   │   ├── context/             # AuthContext & AppContext State Management
│   │   ├── pages/               # 16 Complete Sub-Views & Pages
│   │   │   ├── HomePage.jsx             # Exact replica of Landing Page (Image 4)
│   │   │   ├── LoginPage.jsx            # User & Admin Login
│   │   │   ├── RegisterPage.jsx         # Full Student Registration
│   │   │   ├── DashboardLayout.jsx      # Workspace wrapper
│   │   │   ├── UserDashboardPage.jsx    # Metric Summary & Recent Items Table
│   │   │   ├── ReportLostItemPage.jsx   # Lost Item Reporting Form
│   │   │   ├── ReportFoundItemPage.jsx  # Found Item Reporting Form
│   │   │   ├── LostItemsPage.jsx        # Lost Items Grid & Filter
│   │   │   ├── FoundItemsPage.jsx       # Found Items Grid & Claim Modal
│   │   │   ├── ClaimRequestsPage.jsx    # Admin Claim Approval/Rejection
│   │   │   ├── MyClaimsPage.jsx         # Student Claim Tracking
│   │   │   ├── ReturnedItemsPage.jsx    # Reunited Items Success Hall
│   │   │   ├── AdminDashboardPage.jsx   # Metrics & Visual Charts
│   │   │   ├── RegisteredUsersPage.jsx  # Campus Member Directory
│   │   │   ├── ProfilePage.jsx          # Shweta Kolekar Profile Card
│   │   │   ├── NotificationsPage.jsx    # System Activity Log
│   │   │   └── ProjectFlowPage.jsx      # Interactive Flowchart & Tech Stack
│   │   ├── App.jsx              # App Routes
│   │   ├── main.jsx             # Entry Point
│   │   └── index.css            # Tailwind & Custom Glassmorphism CSS
│   ├── vite.config.js           # Vite config & API Proxy
│   └── package.json             # Frontend Dependencies
│
├── server/                      # Node.js & Express Backend Server
│   ├── config/                  # Database connection (db.js)
│   ├── controllers/             # API Controllers (auth, item, claim, admin)
│   ├── middleware/              # Auth Protection & Multer Uploads
│   ├── models/                  # Mongoose Schemas (User, Item, Claim, Notification)
│   ├── routes/                  # Express API Endpoints
│   ├── uploads/                 # Uploaded item images storage
│   ├── utils/                   # Seed Data Script
│   ├── .env                     # Server Environment Config
│   └── server.js                # Express App Server Entry Point
│
├── package.json                 # Root Concurrent Runner Scripts
└── README.md                    # Project Documentation
```

---

## 🚀 How to Run the Project Locally

### 1. Prerequisites
- Node.js (v18 or higher installed)
- MongoDB (Local MongoDB Service running on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)

> **Note**: The system includes a resilient auto-fallback mode! If local MongoDB service is offline, it will run seamlessly in demo mode with full interactive features.

### 2. Quick Installation & Launch (Single Command)

Open terminal in project root directory:

```bash
# Install dependencies for both server and client
npm run install-all

# Start both backend server (Port 5000) & frontend client (Port 3000) concurrently
npm run dev
```

### 3. Alternative: Running Server and Client Separately

**Terminal 1 (Start Backend Server):**
```bash
cd server
npm install
npm run dev
```
*(Server will run on `http://localhost:5000`)*

**Terminal 2 (Start React Frontend):**
```bash
cd client
npm install
npm run dev
```
*(Frontend will run on `http://localhost:3000`)*

---

## 🔐 Default Login Credentials for Demo

### 👩‍🎓 Student Login (Shweta Tanaji Kolekar)
- **Email**: `shweta@gmail.com`
- **Password**: `password123`
- *(Or click **"Student (Shweta)"** button on Login Page)*

### 👨‍💼 Campus Admin Login
- **Email**: `admin@dypcet.ac.in`
- **Password**: `admin123`
- *(Or click **"Campus Admin"** button on Login Page / Top Bar toggle)*

---

## 🔄 Functional Workflow
`Register/Login` ➔ `Dashboard` ➔ `Report Item (Lost/Found)` ➔ `MongoDB Storage` ➔ `Item Discovery Feed` ➔ `Claim Item with Proof` ➔ `Admin Verification` ➔ `Approve (Returned Status) / Reject (Claim Closed)` ➔ `Notification Sent to User`
