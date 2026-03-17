
# 🏨 Hotel Reservation System

A full-stack **Hotel Reservation System** developed as a graduation project.  
The system includes **three main components**:

1. 🌐 Web Application (Customer & Admin)  
2. 📱 Android Mobile Application  
3. 🗄️ Backend API & Database  

---

## 📌 Project Overview
The Hotel Reservation System provides customers with a seamless way to browse and book rooms using either the **web interface** or the **Android mobile app**.  
Administrators can manage rooms, bookings, and users through an advanced web-based admin dashboard.

This project demonstrates strong full-stack development skills, including UI/UX design, backend API development, database management, and mobile development.

---

## 🎯 Objectives
- Deliver a unified booking experience across web and mobile platforms.
- Enable administrators to handle reservations, rooms, and users efficiently.
- Build a scalable backend API used by both clients.
- Apply industry best practices in system architecture, UI/UX, and development.

---

## ✨ Features

### 👤 Customer Features (Web & Android)
- Browse available rooms with images, amenities, price, and type.
- Search and filter by date, category, or price.
- Secure login and account creation.
- Book, view, and cancel reservations.
- Access booking history.
- Receive confirmation notifications.

### 🛠️ Admin Features (Web Only)
- Add, edit, and delete rooms.
- Manage users and view their booking records.
- Update room availability and status.
- Access system statistics and activity insights.

---

## 🛠️ Technologies Used

### 🌐 Web Frontend
- React  
- Tailwind CSS  

### 📱 Android Application
- Android Studio  
- Java / Kotlin  
- Retrofit for API communication  
- XML UI layouts  
- SharedPreferences / Room (local storage)

### 🗄️ Backend
- Node.js  
- Express  

### 🛢️ Database
- MongoDB  

### 🔧 Tools & Others
- Git & GitHub  
- Postman  
- JWT Authentication  
- RESTful API Architecture  

---

## 📁 Project Structure
```plaintext
Final_Project
│── client/              # Web frontend
│── api/                 # Backend API
│── androidClient/       # Android mobile application
│── README.md
│── .env.example
````

---

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/Sakan-OnlineReservationSystem/Final_Project.git
cd Final_Project
```

---

## ▶️ Run the Backend (API)

### Install dependencies:

```bash
cd api
npm install
```

### Configure environment variables:

Create a `.env` file containing:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
JWT_SECRET=yourSecretKey
```

### Start the server:

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

## 📱 Run the Android Mobile Application

1. Open the **androidClient/** folder in Android Studio.
2. Set your API base URL in Retrofit/Volley:

   ```java
   BASE_URL = "http://YOUR_LOCAL_IP:API_PORT/";
   ```
3. Connect a physical device or use an emulator.
4. Click **Run ▶** in Android Studio.

---

## 🧪 Testing

* REST API tested using **Postman**
* Android API calls verified using Retrofit logs
* UI/UX tested on different screen sizes (mobile & desktop)

---

## 📸 Screenshots

---

## 🌐 Web Application

<details>
  <summary><strong>Click to expand Web Application Screenshots</strong></summary>
  <br>

  <p align="center">
    <img src="https://github.com/user-attachments/assets/f672c133-e269-43be-b94e-3bf0d72bfe23" width="800">
  </p>

  <p align="center">
    <img src="https://github.com/user-attachments/assets/4bc66609-e538-49ab-8109-8f3c859ac3be" width="800">
  </p>

  <p align="center">
    <img src="https://github.com/user-attachments/assets/a76540e9-035e-463b-afc0-e58e981f551d" width="800">
  </p>

  <p align="center">
    <img src="https://github.com/user-attachments/assets/dff21a4d-9efe-4d99-8661-d2c39f8bbd4b" width="800">
  </p>

  <p align="center">
    <img src="https://github.com/user-attachments/assets/4c8da6cd-3e01-4d6d-9636-e80a4fdb67c8" width="800">
  </p>

</details>

---

## 📱 Android Mobile Application

<details>
  <summary><strong>Click to expand Android App Screenshots</strong></summary>
  <br>

  <p align="center">
    <img src="https://github.com/user-attachments/assets/4081ec10-823d-46bf-8f50-bb9be7677526" width="360">
    <img src="https://github.com/user-attachments/assets/71d22c45-7263-4c68-aaa6-fe427a47bfca" width="360">
  </p>

  <p align="center">
    <img src="https://github.com/user-attachments/assets/187b9c13-d34f-497d-9e36-30e40d075c31" width="360">
    <img src="https://github.com/user-attachments/assets/cbb521c7-9ed1-40b9-bb8c-5c42a27859b7" width="360">
  </p>

</details>

---

## 📄 License

This project was developed solely for **educational and academic purposes** as a university graduation project.

