<div align="center">

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai&logoColor=white" />
<img src="https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />

<br/><br/>

# 🧠 AI Resume Builder

**Build job-winning resumes in minutes — powered by AI.**
<br/>
Real-time editor · ATS scoring · AI rewriting · Shareable links · Custom templates

<br/>

</div>

---

## ✨ What It Does

| | Feature | Description |
|---|---|---|
| ✍️ | **Resume Editor** | Full-featured editor for personal info, summary, skills, experience, projects, and education |
| 🤖 | **AI Enhancement** | Rewrites your professional summary and job descriptions using OpenAI |
| 📊 | **ATS Analyzer** | Scores your resume on keywords, formatting, and content with specific fix suggestions |
| 📄 | **Resume Upload** | Paste raw resume text — AI extracts and fills all fields automatically |
| 🖼️ | **Profile Image** | Upload a photo with optional AI background removal via ImageKit |
| 🔗 | **Public Links** | Share any resume publicly via `/view/:resumeId` |
| 🎨 | **Theming** | Pick from multiple templates and accent colors |

---

## 🏗️ Tech Stack

```
Frontend                          Backend
─────────────────────────         ──────────────────────────────
React 19          (UI)            Node.js + Express  (server)
Vite              (build)         MongoDB + Mongoose  (database)
Tailwind CSS v4   (styling)       JWT                 (auth)
React Router v7   (routing)       Multer              (file uploads)
Axios             (HTTP)          ImageKit            (image CDN)
Lucide React      (icons)         OpenAI SDK          (AI features)
```

---

## 📁 Project Structure

```
ai-resume-builder/
│
├── 📦 client/resumebuilder/
│   ├── src/
│   │   ├── components/
│   │   │   ├── home/               # Landing page sections
│   │   │   │   ├── Banner.jsx
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── Features.jsx
│   │   │   │   ├── Testimonial.jsx
│   │   │   │   ├── CallToAction.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── ColorPicker.jsx     # Accent color selector
│   │   │   ├── EducationForm.jsx   # Education section form
│   │   │   ├── Navbar.jsx
│   │   │   └── TemplateSelector.jsx
│   │   └── pages/
│   │       ├── Home.jsx            # Landing page
│   │       ├── Dashboard.jsx       # User's resume list
│   │       ├── ResumeBuilder.jsx   # Main builder page
│   │       ├── Preview.jsx         # Public resume view
│   │       ├── Login.jsx
│   │       └── Layout.jsx
│   └── configs/api.js              # Axios base instance
│
└── 🖥️ server/
    ├── config/
    │   ├── db.js                   # MongoDB connection
    │   └── ai.js                   # OpenAI client
    ├── controllers/
    │   ├── user.controller.js      # Register, login, profile
    │   ├── resume.controller.js    # CRUD + image upload
    │   └── ai.controller.js        # AI enhance, upload, ATS
    ├── middleware/
    │   ├── auth.middleware.js      # JWT verification
    │   ├── imageKit.js             # ImageKit SDK
    │   └── muilter.middleware.js   # File upload handler
    ├── models/
    │   ├── user.model.js
    │   └── resume.model.js
    ├── routes/
    │   ├── userRoutes.js
    │   ├── resumeRoute.js
    │   └── aiRoute.js
    └── server.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **18+**
- A **MongoDB** URI (local or Atlas)
- **OpenAI** API key
- **ImageKit** account (free tier works)

---

### 1 — Clone & Install

```bash
# Clone the repo
git clone https://github.com/TridibeshSam31/ai-resume-builder.git
cd ai-resume-builder

# Install backend deps
cd server && npm install

# Install frontend deps
cd ../client/resumebuilder && npm install
```

---

### 2 — Configure Environment Variables

**`server/.env`**
```env
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

OPENAI_API_KEY=your_openai_key
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

**`client/resumebuilder/.env`**
```env
VITE_BASE_URL=http://localhost:4000
```

---

### 3 — Run

```bash
# Terminal 1 — Backend
cd server
node server.js

# Terminal 2 — Frontend
cd client/resumebuilder
npm run dev
```

Frontend runs at `http://localhost:5173` · Backend at `http://localhost:4000`

---

## 🔌 API Reference

### 👤 Auth &nbsp;—&nbsp; `/api/users`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Login and receive JWT |
| `GET` | `/data` | Get logged-in user info |
| `GET` | `/resumes` | Get all resumes for user |

### 📄 Resumes &nbsp;—&nbsp; `/api/resumes`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/create` | Create a new blank resume |
| `GET` | `/:resumeId` | Get resume by ID |
| `GET` | `/public/:resumeId` | Get publicly shared resume |
| `PUT` | `/update` | Update resume + optional image |
| `DELETE` | `/delete/:resumeId` | Delete resume |

### 🤖 AI &nbsp;—&nbsp; `/api/ai`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/enhance-pro-sum` | Rewrite professional summary |
| `POST` | `/enhance-job-desc` | Rewrite a job description |
| `POST` | `/upload-resume` | Extract fields from raw resume text |
| `POST` | `/analyze` | Run ATS analysis |
| `GET` | `/ats-score` | Fetch saved ATS score |

---

## 📜 License

MIT 
