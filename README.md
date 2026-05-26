# AI Resume Builder

A full-stack AI-powered resume builder with real-time editing, multiple export formats, ATS scoring, and shareable public resume links.

---

## Tech Stack

**Frontend** — React 19, Vite, Tailwind CSS v4, React Router v7, Axios, Lucide React

**Backend** — Node.js, Express, MongoDB (Mongoose), JWT Auth, Multer, ImageKit, OpenAI SDK

---

## Features

- **Resume Editor** — Build resumes with sections for personal info, professional summary, skills, experience, projects, and education
- **AI Enhancement** — OpenAI-powered rewriting for professional summaries and job descriptions
- **ATS Score Analyzer** — Scores your resume across keyword usage, formatting, and content quality with actionable suggestions
- **Resume Upload** — Paste raw resume text and let AI extract and populate all fields automatically
- **Profile Image** — Upload a profile photo with optional background removal via ImageKit
- **Public Resume Links** — Make any resume publicly shareable via `/view/:resumeId`
- **Template & Color Theming** — Select resume templates and accent colors

---

## Project Structure

```
├── client/
│   └── resumebuilder/
│       ├── src/
│       │   ├── assets/          # Dummy resume data
│       │   ├── components/
│       │   │   ├── home/        # Landing page sections (Hero, Features, Testimonial, etc.)
│       │   │   ├── ColorPicker.jsx
│       │   │   ├── EducationForm.jsx
│       │   │   ├── Navbar.jsx
│       │   │   └── TemplateSelector.jsx
│       │   └── pages/
│       │       ├── Home.jsx
│       │       ├── Layout.jsx
│       │       ├── Dashboard.jsx
│       │       ├── Login.jsx
│       │       ├── Preview.jsx
│       │       └── ResumeBuilder.jsx
│       └── configs/
│           └── api.js           # Axios instance
└── server/
    ├── config/
    │   ├── db.js                # MongoDB connection
    │   └── ai.js                # OpenAI client
    ├── controllers/
    │   ├── user.controller.js
    │   ├── resume.controller.js
    │   ├── ai.controller.js
    │   └── exportResume.controller.js
    ├── middleware/
    │   ├── auth.middleware.js   # JWT verification
    │   ├── imageKit.js          # ImageKit client
    │   └── muilter.middleware.js
    ├── models/
    │   ├── user.model.js
    │   └── resume.model.js
    ├── routes/
    │   ├── userRoutes.js
    │   ├── resumeRoute.js
    │   ├── aiRoute.js
    │   └── export.js
    └── server.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB URI
- OpenAI API key (or compatible endpoint)
- ImageKit account

### Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

OPENAI_API_KEY=your_openai_key
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

```bash
node server.js
```

### Frontend

```bash
cd client/resumebuilder
npm install
```

Create a `.env` file:

```env
VITE_BASE_URL=http://localhost:4000
```

```bash
npm run dev
```

---

## API Reference

### Auth — `/api/users`

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Login and receive JWT |
| GET | `/data` | Get logged-in user info |
| GET | `/resumes` | Get all resumes for user |

### Resumes — `/api/resumes`

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/create` | Create a new blank resume |
| GET | `/:resumeId` | Get resume by ID (authenticated) |
| GET | `/public/:resumeId` | Get publicly shared resume |
| PUT | `/update` | Update resume + optional image upload |
| DELETE | `/delete/:resumeId` | Delete resume |

### AI — `/api/ai`

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/enhance-pro-sum` | Rewrite professional summary |
| POST | `/enhance-job-desc` | Rewrite a job description |
| POST | `/upload-resume` | Extract resume data from pasted text |
| POST | `/analyze` | Run ATS analysis on a resume |
| GET | `/ats-score` | Fetch saved ATS analysis |

## License

MIT
