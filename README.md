🛒 AI E-Commerce Chatbot

AI E-Commerce Chatbot is an intelligent conversational web application designed to provide a seamless shopping experience. Built with Next.js, Redux, FastAPI, and integrated with Gemini 1.5 Flash, it enables users to browse products, filter categories, and interact naturally via an AI-powered chatbot. The app features a responsive UI, secure authentication, and a dynamic product search system.



🚀 Live Demo

🔗 Open AI E-Commerce Chatbot in your browser to try it out.

Demo Credentials
Email: demo@ecomchat.com
Password: demo@123



✨ Features





💬 AI-Powered Chatbot
Real-time product queries handled by Gemini 1.5 Flash with dynamic tool calling for precise responses.



🛍️ Product Browsing & Filtering
Browse 10 product categories with 7–8 items each, filterable by category for a streamlined shopping experience.



🔍 Dynamic Product Search
Natural language queries like "Show me AC" or "Display AC products" intelligently fetch relevant results.



🔐 Secure Authentication
Login and registration system with JWT, storing user data in MongoDB.



📦 State Management (Redux)
App-wide state (auth, products, chat) managed with Redux Toolkit for seamless user experience.





Redux slices located in the /redux directory.



Store configured with Redux DevTools and middleware for async actions.



⚙️ Backend with FastAPI
Robust API endpoints (/sendquery, /getproducts) powered by FastAPI, integrated with PostgreSQL via Aiven.



🌐 Cloud Deployment
Backend hosted on Render, database on Aiven PostgreSQL, ensuring scalability and reliability.



🎨 Responsive UI with Tailwind CSS
Modular React components styled with Tailwind CSS, enhanced with images and subtle animations.



✅ TODO / Upcoming Features





🛒 Cart & Checkout System
Add-to-cart functionality and a streamlined checkout process.



📊 Product Recommendations
AI-driven personalized product suggestions based on user queries.



📸 Image Upload Support
Allow users to upload images for visual product searches.



📬 Order History & Tracking
View past orders and track delivery status.



📱 Mobile App Support
Develop a PWA or native mobile app for enhanced accessibility.



🔔 Real-Time Notifications
Alerts for promotions, order updates, and chatbot responses.



🛠️ Tech Stack





Frontend: Next.js, React, Redux Toolkit, Tailwind CSS



Backend: Python, FastAPI



Database: PostgreSQL (Aiven), MongoDB (for auth)



AI: Gemini 1.5 Flash (LLM with tool calling)



Deployment: Render (backend), Aiven (database), Vercel (frontend, optional)



Others: Socket.IO (planned for real-time features), JWT for authentication



📦 Setup Instructions





Clone the Repository

git clone https://github.com/your-username/ai-ecom-chatbot.git
cd ai-ecom-chatbot



Frontend Setup

cd frontend
npm install
npm run dev



Backend Setup

cd backend
pip install -r requirements.txt
uvicorn main:app --reload



Environment Variables





Create .env files in both frontend and backend directories.



Frontend: Add NEXT_PUBLIC_API_URL (backend URL).



Backend: Add DATABASE_URL (Aiven PostgreSQL), MONGO_URI, and GEMINI_API_KEY.



Database Setup





Configure PostgreSQL on Aiven and populate with mock data (schema in /backend/db/schema.sql).



Set up MongoDB for authentication data.



Run the Application





Access the frontend at http://localhost:3000.



Backend APIs available at http://localhost:8000.



📸 Screenshots





Homepage: Welcoming interface with login prompt.



Chat Interface: Clean UI with AI chatbot and product cards.



Product Filter: Category-based filtering in action.



Profile Page: User details and session management.

(Screenshots available in the /screenshots directory.)



🌟 Future Enhancements





Integrate WebSocket for real-time chat updates.



Expand LLM capabilities with multi-turn conversations.



Add support for multilingual queries.



Implement CI/CD pipelines for automated deployments.



📝 License

This project is licensed under the MIT License. See the LICENSE file for details.



👨‍💻 Author

Built with 💻 by Your Name.
Feel free to open issues or contribute to the project!
