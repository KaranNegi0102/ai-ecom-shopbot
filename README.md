# 🛒 AI E-Commerce Chatbot

AI E-Commerce Chatbot is an intelligent conversational web application designed to provide a seamless shopping experience. Built with **Next.js**, **Redux**, **FastAPI**, and integrated with **Gemini 1.5 Flash**, it enables users to browse products, filter categories, and interact naturally via an AI-powered chatbot. The app features a **responsive UI**, **secure authentication**, and a **dynamic product search system**.

---

## 🚀 Live Demo

🔗 [Open AI E-Commerce Chatbot](https://ai-ecom-shopbot.vercel.app/) in your browser to try it out.

**Demo Credentials**  
- Email: `admin@gmail.com`  
- Password: `admin@123`

---

## ✨ Features

### 💬 AI-Powered Chatbot
Real-time product queries handled by **Gemini 1.5 Flash** with dynamic tool calling for precise responses.

### 🛍️ Product Browsing & Filtering
Browse 10 product categories with 7–8 items each, filterable by category for a streamlined shopping experience.

### 🔍 Dynamic Product Search
Natural language queries like _"Show me AC"_ or _"Display AC products"_ intelligently fetch relevant results.

### 🔐 Secure Authentication
Login and registration system using **JWT**, storing user data in **MongoDB**.

### 📦 State Management (Redux)
App-wide state (auth, products, chat) managed with **Redux Toolkit** for seamless UX.

> Redux slices are located in the `/redux` directory.  
> Store is configured with **Redux DevTools** and middleware for async actions.

### ⚙️ Backend with FastAPI
Robust API endpoints (`/sendquery`, `/getproducts`) powered by **FastAPI**, integrated with **PostgreSQL** via **Aiven**.

### 🌐 Cloud Deployment
- Backend hosted on **Render**
- Database on **Aiven PostgreSQL**
- Frontend optionally deployed on **Vercel**

### 🎨 Responsive UI with Tailwind CSS
Modular React components styled using **Tailwind CSS**, enhanced with images and subtle animations.

---

## ✅ TODO / Upcoming Features

- 🛒 Cart & Checkout System  
- 📊 AI-based Product Recommendations  
- 📸 Image Upload for Visual Search  
- 📬 Order History & Tracking  
- 📱 Mobile App Support (PWA/Native)  
- 🔔 Real-Time Notifications (via WebSocket)

---

## 🛠️ Tech Stack

| Layer      | Technology                                |
|------------|--------------------------------------------|
| Frontend   | Next.js, React, Redux Toolkit, Tailwind CSS |
| Backend    | Python, FastAPI                            |
| Database   | PostgreSQL (Aiven), MongoDB (for auth)     |
| AI         | Gemini 1.5 Flash (Tool Calling)            |
| Deployment | Render (Backend), Aiven (DB), Vercel (Frontend) |
| Auth       | JWT                                        |
| Real-time  | Socket.IO (Future Planning)                |

---

## 📦 Setup Instructions

### 1️⃣ Clone the Repository


## 2️⃣ Frontend Setup

- cd frontend
- npm install
- npm run dev
  
## 3️⃣ Backend Setup

- cd backend
- pip install -r requirements.txt
- uvicorn main:app --reload

## 📸 Screenshots
Available in the report file.



## 👤Author
Built by Karan Negi.
Feel free to open issues or contribute to the project!

