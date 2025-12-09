# Assignment 2 – Cloud Based Web Application  
**Student Name:** Stephanie Valerie  
**Unit:** CSE3CWA / CSE5006  
**Institution:** La Trobe University  

---

## 📌 Project Overview

This project is a Next.js web application developed as part of Assignment 2.  
The application extends Assignment 1 and includes:

- A game-based interface (Escape Room or Court Room)
- API routes with full CRUD functionality
- Prisma ORM with a **cloud-hosted PostgreSQL database (Neon)**
- Automated testing using Playwright
- Performance and accessibility testing
- Instrumentation and observability
- Cloud deployment readiness

✅ This project uses a **real cloud database (Neon)**, not a local SQLite database.

---

## 🧰 Technologies Used

- Next.js (App Router)
- TypeScript
- Prisma ORM
- **PostgreSQL (Cloud – Neon)**
- Playwright (Automated Testing)
- Docker
- Lighthouse
- JMeter

---

# 🚀 FULL SETUP & INSTALLATION GUIDE (FOR MARKERS & DEVELOPERS)

⚠️ IMPORTANT:  
This project uses a **CLOUD-HOSTED PostgreSQL database (Neon)**.  
A local database is **NOT** used.  
You **MUST** create a `.env` file to connect to the cloud database before Prisma can run.

---

## ✅ 1. Clone the Repository
```bash
git clone <YOUR_GITHUB_REPO_LINK>
cd <YOUR_PROJECT_FOLDER>
