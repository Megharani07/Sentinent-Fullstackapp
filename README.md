# 💳 Sentinent Dynamics Fullstack Task

A fullstack mobile + backend project built for **Sentinent Dynamics Fullstack Task 1**.  
The app allows users to **sign up, log in, and manage payment details** using a Node.js + MongoDB backend and a React Native (Expo) frontend.

---

## 🧠 Thought Process & Stack Choices

### Frontend (Mobile App)
- **Framework:** React Native (via Expo)
- **Routing:** Expo Router
- **HTTP Client:** Axios
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Storage:** AsyncStorage (to persist user info)
- **Reasoning:**  
  - Expo allows easy cross-platform development.  
  - Axios provides clean API integration.  
  - Expo Router simplifies navigation and screen management.

### Backend (API Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT (JSON Web Tokens)
- **Reasoning:**  
  - Express + Mongoose is lightweight, fast, and widely used.  
  - MongoDB Atlas provides easy cloud database hosting.  
  - JWT authentication keeps APIs secure.

---

## ⚙️ Project Setup

### 📦 1. Clone the Repository
```bash
git clone <your-repo-url>
cd FullstackApp




BACKEND Setup 

cd backend
npm install

# Create a .env file and connection URL like below

# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/sentinent?retryWrites=true&w=majority
# JWT_SECRET=mysecretkey
# PORT=5000

Run the Backend :

node server.js

You should see :

✅ MongoDB Connected
🚀 Server running on port 5000



Frontend Setup (React Native App) : 

cd ../SentinentApp
npm install

# In SentinentApp/utils/api.ts, set your backend IP:

# export const api = axios.create({
#   baseURL: "http://192.168.x.x:5000", // Replace with your local IPv4 address
#   headers: { "Content-Type": "application/json" },
# });

Run the App: 

npx expo start

Select:

LAN mode if using Expo Go on your phone

Web mode (w) for browser testing

Scan the QR code with Expo Go.


API Endpoints
Method	 Endpoint	          Description
POST	/auth/signup	   Register a new user
POST	/auth/login	       Authenticate & get token
POST	/payment/add	   Add payment details
GET	    /payment/:userId   Get payment details


🗄️ Database Models
User
{ name, email, password (hashed), createdAt }

Payment
{ userId, bankName, accountNumber, cardNumber, expiryDate, createdAt }


▶️ Run Summary
Command	Action
node server.js	Start backend
npx expo start	Start frontend
npx expo start --web	Run frontend in browser

Author: Megharani Trimukhe
📅 Sentinent Dynamics — Fullstack Task 1