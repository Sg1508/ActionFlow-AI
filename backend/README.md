# ActionFlow AI - Intelligent Inbox & Task Management

## Overview
ActionFlow AI is an AI-powered application that converts emails and messages into organized, actionable tasks using Google's Gemini API.

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Python (FastAPI)
- **Database:** MySQL
- **AI:** Google Gemini API

## Local Setup Instructions
1. Create a MySQL database named `actionflow_db` and import `database.sql`.
2. **Backend:** Go to `backend` folder, activate venv, run `pip install -r requirements.txt`. Create `.env` from `.env.example` and add your credentials. Run `uvicorn main:app --reload`.
3. **Frontend:** Go to `frontend` folder, run `npm install`, then `npm run dev`.
4. Open `http://localhost:5173`.