# স্বপ্নস্বাক্ষর সমিতি (ShopnoShakkhor Somiti)

![স্বপ্নস্বাক্ষর সমিতি Banner](https://i.ibb.co/40rfGD5/IMG-3815.jpg)

A feature-rich, role-based cooperative society management application designed to simplify the operations of a community savings and credit system. The platform offers a centralized dashboard for admins to manage users, transactions, and statistics, while allowing members to view and manage their profiles.

🌐 **Live Demo:** [shopno-somiti.vercel.app](https://shopno-somiti.vercel.app)  
🔐 **Admin Access:**  
- **Email:** `admin@somiti.com`  
- **Password:** `Admin123@`

---

## 🧭 Table of Contents

- [Features](#features)
- [Routes Overview](#routes-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

---

## 🚀 Features

- 🔐 **Authentication System** – Secure login and registration system.
- 🧑‍💼 **Admin Panel**:
  - Add new members with credentials via **Firebase Admin SDK**
  - Deposit, withdraw, and impose penalties for members
  - Manage user roles and access
  - View real-time transaction reports and statistics
- 👥 **Member Features**:
  - Update personal profile (name, phone number, profile picture)
  - View own profile and transaction history
  - Participate in leaderboard rankings
- 📊 **Data Visualization** – Real-time charts and statistics for admins using **Recharts**
- 🎨 **Modern UI** – Built with **TailwindCSS** and **Radix UI**
- 🔄 **Asynchronous Data Fetching** – Handled with **React Query**
- ⚙️ **Role-Based Access Control** – Routes protected by authentication and role checks

---

## 🛣 Routes Overview

### Public Routes


| Path          | Component      | Description               |
|---------------|----------------|---------------------------|
| `/login`      | `Login`        | Login page                |
| `/register`   | `Register`     | Registration page         |

### Protected Dashboard Routes

All `/dashboard` routes are protected and role-based.

| Path                                  | Component               | Access Role     |
|---------------------------------------|--------------------------|-----------------|
| `/dashboard/leaderboard`             | `LeaderboardPage`        | All users       |
| `/dashboard/profile`                 | `MemberProfilePage`      | All users          |
| `/dashboard/member-profile/:id`      | `MemberProfilePage`      | Member/Admin    |
| `/dashboard/admin/manage-users`      | `ManageUsers`            | Admin only      |
| `/dashboard/admin/transaction-report`| `TransactionDashboard`   | Admin only      |
| `/dashboard/admin/statistics`        | `Statistics`             | Admin only      |

---

## 🛠 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/shopno-somiti.git
cd shopno-somiti
npm install
