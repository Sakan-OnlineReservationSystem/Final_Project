# 🏨 Hotel Reservation System

A full-stack **Hotel Reservation System** developed as a graduation project.  
The system includes **three main components**:

1. 🌐 Web Application (Customer & Admin)  
2. 📱 Android Mobile Application  
3. 🗄️ Backend API & Database  

---

## 📌 Project Overview
The Hotel Reservation System provides customers with an easy way to browse and book rooms, whether through the **web interface** or the **Android mobile app**.  
Administrators can manage rooms, users, and bookings through the web-based admin panel.

This project demonstrates strong full-stack capabilities, including web development, mobile development, and backend API design.

---

## 🎯 Objectives
- Provide a seamless booking experience on both web and mobile.
- Allow hotel administrators to manage rooms, availability, and reservations.
- Build a unified backend that supports multiple clients (web + Android).
- Apply best practices in software engineering, UI/UX, and database management.

---

## ✨ Features

### 👤 Customer Features (Web & Android)
- Browse available rooms with price, type, and amenities.
- Search and filter rooms by date, category, or price range.
- Create an account and log in.
- Book rooms and manage their reservations.
- View booking history.
- Receive confirmation notifications.

### 🛠️ Admin Features (Web Only)
- Add, edit, or delete rooms.
- Manage users and view their bookings.
- Modify room availability and status.
- View system statistics and booking activity.

---

## 🛠️ Technologies Used

### 🌐 Frontend (Web)
- React + Tailwind
- 
### 📱 Android Application
- Android Studio
- Java / Kotlin  
- Retrofit (or Volley) for API calls  
- XML for UI design  
- SharedPreferences / Room 

### 🗄️ Backend
- Node.js + Express  

### 🛢️ Database
- MongoDB  

### 🔧 Tools & Others
- Postman
- Git & GitHub
- JWT Authentication 
- RESTful API Architecture

---

## 📁 Project Structure
```

Final_Project
│── client/                # Web frontend
│── api/                   # Backend / API
│── androidClient/           # Android mobile application
│── README.md
│── .env.example

````

---

## 🚀 How to Run the Project

### 1. Clone the repository
```bash
git clone https://github.com/Sakan-OnlineReservationSystem/Final_Project.git
cd Final_Project
````

---

## ▶️ Run the Backend (API)

### Install backend dependencies:

```bash
cd api
npm install
```

### Configure environment variables:

Create `.env` and add:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
JWT_SECRET=yourSecretKey
```

### Start the backend server:

```bash
npm start
```

---

## 🌐 Run the Web Frontend

```bash
cd client
npm install
npm start
```

---

## 📱 Run the Android Application

1. Open **android-app/** folder in **Android Studio**.
2. Update API base URL inside your Retrofit/Volley configuration:

   ```
   BASE_URL = "http://YOUR_LOCAL_IP:API_PORT/"
   ```
3. Connect a device or use an emulator.
4. Click **Run ▶** in Android Studio.

---

## 🧪 Testing

* API tested using Postman.
* Android network testing done using Retrofit logs.
* UI/UX validation for both web and mobile apps.

---

## 📸 Screenshots (To Be Added)

<img width="1216" height="890" alt="image" src="https://github.com/user-attachments/assets/4bc66609-e538-49ab-8109-8f3c859ac3be" />

* Room List
* Booking Page
* Admin Dashboard
* Android Home Screen

---

## 👨‍💻 Team Members

* Ahmed Hesham – Role
* Ayman Mohamed – Frontend Development
* Abdelrahman Saad – Role
* Hassan Abdelwahed – Role
* Ahmed Ezz – Role
* Mohamed Saleh – Role

---

## 📄 License

This project was developed for **educational purposes** as a university graduation project.

```
