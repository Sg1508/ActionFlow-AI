# ActionFlow AI - Features Documentation

## 1. Implemented Features
- **JSON Import:** Secure file upload with Pydantic validation.
- **AI Analysis:** Gemini summarizes, categorizes, detects intent, and assigns priority.
- **Intelligent Task Generation:** Extracts tasks and avoids hallucinating deadlines.
- **Dashboard UI:** React + Tailwind interface.
- **Task Management:** Edit task titles/descriptions, change priorities, update statuses.
- **Search/Filter:** Real-time search and priority filtering.
- **Analyzed Count:** Tracks analyzed vs total messages.

## 2. Application Modules
- `backend/main.py`: FastAPI routes.
- `backend/models.py`: SQLAlchemy models.
- `backend/schemas.py`: Pydantic validation.
- `backend/ai_service.py`: Gemini API logic.
- `frontend/src/App.jsx`: Main React layout.
- `frontend/src/components/`: UI components.

## 3. APIs and Endpoints
- `POST /api/import-json`: Validates and saves JSON.
- `POST /api/analyze/{message_id}`: AI analysis and task generation.
- `GET /api/messages` & `GET /api/tasks`: Fetch data.
- `PATCH /api/tasks/{task_id}`: Update task details.

## 4. AI Prompts & Workflows
- Uses `response_mime_type="application/json"` for strict output.
- Prompt explicitly prevents inventing deadlines (e.g., ignores "Thursday") and avoids tasks for informational messages.

## 5. Database Tables
- **`messages`**: Original emails and AI results.
- **`tasks`**: Extracted tasks linked via Foreign Key.

## 6. Third-Party Integrations
- Google Gemini API, FastAPI, React, Tailwind, SQLAlchemy.

## 7. Optional Features Implemented
- CSV Export.
- Search and Filtering.

## 8. Planned but Not Completed
- Gmail API OAuth integration.