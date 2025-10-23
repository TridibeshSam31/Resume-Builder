//dummy resume data dena hoga so that it can render something and after  connecting to backend we will able to update the resumes


const dummyResume = {
  userId: "6718e4f9b1a23c0e889f1b42", // example ObjectId
  title: "Full Stack Developer Resume",
  public: true,
  template: "modern",
  accent_color: "#2563EB",
  professional_summary:
    "Highly motivated Full Stack Developer with 3+ years of experience building scalable web applications using React, Node.js, and MongoDB. Passionate about clean code, performance optimization, and solving real-world problems through technology.",

  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "REST APIs",
    "Git & GitHub"
  ],

  personal_info: {
    image: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    full_name: "Tridibesh Samantroy",
    profession: "Full Stack Developer",
    email: "tridibesh.sam@example.com",
    phone: "+91 9876543210",
    location: "New Delhi, India",
    ConnectMeAt: "email",

    experience: [
      {
        company: "TechNova Labs",
        position: "Full Stack Developer Intern",
        start_date: "2024-05-01",
        end_date: "2024-09-30",
        description:
          "Developed RESTful APIs using Express.js, integrated frontend components in React, and improved dashboard load time by 25%.",
        is_current: false
      },
      {
        company: "Fflyn",
        position: "Frontend Developer (Freelance)",
        start_date: "2025-01-10",
        end_date: "",
        description:
          "Building responsive, component-based UI for a social chat app using React and Tailwind CSS, focusing on usability and clean animations.",
        is_current: true
      }
    ],

    project: [
      {
        name: "AI Resume Builder",
        type: "Web App",
        description:
          "A MERN-based web app that generates modular resumes using OpenAI API. Includes customizable templates, PDF export, and live preview."
      },
      {
        name: "School Attendance System",
        type: "Full Stack App",
        description:
          "Developed an attendance tracking platform with teacher restrictions, weekly analytics, and automated reporting features."
      }
    ],

    education: [
      {
        institution: "Guru Gobind Singh Indraprastha University",
        degree: "Bachelor of Technology (B.Tech)",
        field: "Computer Science and Engineering",
        graduation_date: "2027-06-30",
        gpa: "8.9 CGPA"
      },
      {
        institution: "DAV Public School",
        degree: "Senior Secondary (Class 12)",
        field: "Science - PCM",
        graduation_date: "2023-03-15",
        gpa: "92%"
      }
    ]
  }
};


export default dummyResume
