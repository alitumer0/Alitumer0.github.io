const cvData = {
    name: "Ali Eren Tümer",
    title: "Full-Stack Developer",
    profileImage: "assets/images/profile.jpg",
    contact: {
        email: "aetumer50@gmail.com",
        phone: "+90 541 271 8051",
        linkedin: "linkedin.com/in/alitumer",
        github: "github.com/alitumer0",
        portfolio: "alitumer0.github.io"
    },
    about: "I am a passionate Full-Stack Developer with strong problem-solving skills and a focus on creating user-friendly applications. I have experience in various technology stacks including backend, frontend, and React Native. I value teamwork and strong communication, continuously striving to improve my skills and stay current with the latest technology trends.",
    skills: [
        { name: "React.js", link: "https://react.dev/" },
        { name: "Next.js", link: "https://nextjs.org/" },
        { name: "HTML5", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { name: "CSS3", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { name: "JavaScript", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "Bootstrap", link: "https://getbootstrap.com/" },
        { name: "Tailwind CSS", link: "https://tailwindcss.com/" },
        { name: "ASP.NET Core", link: "https://learn.microsoft.com/en-us/aspnet/core/" },
        { name: "RESTful APIs", link: "https://restfulapi.net/" },
        { name: "C#", link: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
        { name: "Python", link: "https://www.python.org/doc/" },
        { name: "SQL Server", link: "https://learn.microsoft.com/en-us/sql/sql-server/" },
        { name: "MongoDB", link: "https://www.mongodb.com/" },
        { name: "Git", link: "https://git-scm.com/" },
        { name: "GitHub", link: "https://github.com/" },
        { name: "Docker", link: "https://www.docker.com/" },
        { name: "CI/CD", link: "https://www.redhat.com/en/topics/devops/what-is-ci-cd" },
        { name: "Agile Methodology", link: "https://www.atlassian.com/agile" }
    ],
    professionalSkills: [
        {
            category: "Core Competencies",
            items: ["Problem-Solving", "Analytical Thinking", "Time Management"]
        },
        {
            category: "Team Collaboration",
            items: ["Effective Communication", "Team Leadership", "Cross-functional Collaboration"]
        },
        {
            category: "Project Management",
            items: ["Agile Methodologies", "Deadline-Oriented", "Resource Planning"]
        }
    ],
    experience: [
        {
            period: "October 2024 - Present",
            title: "Full-Stack Developer - Intern",
            company: "BilgeAdam Akademi",
            location: "Istanbul, Turkey"
        },
        {
            period: "2024 - Present",
            title: "Full-Stack Developer",
            company: "Freelance",
            location: "Remote",
            highlights: [
                "Student Management System: Developed a comprehensive web application using ASP.NET Core, SQL, and React with CRUD operations and authentication.",
                "Asset-Inventory Management System: Designed and implemented an inventory tracking system using ASP.NET MVC and SQL database.",
                "Asset Assignment System: Built asset tracking with a user-friendly interface and QR code integration.",
                "Library Automation System: Developed a library management system using ASP.NET MVC with role-based access.",
                "Advance Management System: Delivered an application for managing advance requests with approvals and reporting.",
                "AllerCheck: Created a web app to manage food allergens, blacklists, and favorite products."
            ]
        }
    ],
    projects: [
        {
            title: "Student Management System",
            description: "Comprehensive web application featuring CRUD operations, role-based access, and responsive dashboards.",
            technologies: ["ASP.NET Core", "SQL", "React"],
            link: "https://github.com/alitumer0",
            preview: "assets/images/rentacar-logo.png"
        },
        {
            title: "Asset-Inventory Management System",
            description: "Inventory tracking solution with real-time insights and secure authentication.",
            technologies: ["ASP.NET MVC", "SQL Server", "Bootstrap"],
            link: "https://github.com/alitumer0",
            preview: "assets/images/Depo-Zimmet Yönetimi Web Uygulaması LOGO.jpg"
        },
        {
            title: "Library Automation System",
            description: "Library automation platform enabling borrowing, return, and catalog management workflows.",
            technologies: ["ASP.NET MVC", "SQL Server", "HTML/CSS"],
            link: "https://github.com/alitumer0",
            preview: "assets/images/Library Otomation System Logo.jpg"
        },
        {
            title: "AllerCheck",
            description: "Web app helping users track allergens, manage blacklists, and curate favorite products safely.",
            technologies: ["ASP.NET Core", "REST APIs", "JavaScript"],
            link: "https://github.com/alitumer0",
            preview: "assets/images/summarizer-logo.png"
        }
    ],
    ongoingProjects: [
        {
            title: "Stock Trading Bot",
            description: "Developing a trading bot in C with automated strategies and a React-powered UI.",
            technologies: ["C", "React"]
        },
        {
            title: "AI-Powered Note-Taking App",
            description: "Building a mobile app for audio-to-text conversion with AI summarization.",
            technologies: ["React Native", "AI", "Speech-to-Text"]
        },
        {
            title: "Recipe Suggestion App",
            description: "Creating a mobile app that recommends recipes based on available ingredients.",
            technologies: ["Mobile", "Recommendation Systems"]
        }
    ],
    volunteerExperience: [
        {
            organization: "UNICEF",
            role: "Volunteer",
            location: "Turkey",
            period: "January 2021 - June 2021",
            highlights: [
                "Contributed to UNICEF’s youth programs supporting children’s rights and development.",
                "Participated in community outreach initiatives and awareness campaigns."
            ]
        }
    ],
    education: [
        {
            degree: "Full-Stack Development Program",
            institution: "BilgeAdam Boost",
            period: "September 2024 - July 2025",
            description: "Full-stack development training with hands-on projects and modern web practices.",
            location: "Sakarya, Türkiye",
            logo: "assets/images/bilgeadam-logo.png"
        },
        {
            degree: "Associate’s Degree in Web Design and Coding; GPA: 3.00",
            institution: "Anadolu University",
            period: "September 2023 - June 2025",
            description: "Web development technologies and responsive design principles.",
            location: "Eskişehir, Türkiye",
            logo: "assets/images/anadolu-logo.png"
        },
        {
            degree: "Associate’s Degree in Electrical Technology; GPA: 3.11",
            institution: "Dokuz Eylül University",
            period: "September 2020 - June 2022",
            description: "Electrical technology education with applied engineering fundamentals.",
            location: "Izmir, Türkiye",
            logo: "assets/images/deu-logo.png"
        }
    ],
    certifications: [
        {
            title: "Workflow and Process Management: Git, GitHub, GitLab and Jira",
            issuer: "Miuul",
            date: "2024",
            credentialId: "https://learning.miuul.com/certificates/kndnijuzup",
            skills: ["Git", "GitHub", "GitLab", "Jira"],
            logo: "assets/images/miuul-logo.png"
        },
        {
            title: "Web Scraping: Beautiful Soup and Selenium",
            issuer: "Miuul",
            date: "2024",
            logo: "assets/images/miuul-logo.png",
            credentialId: "https://learning.miuul.com/certificates/fcwwayyqby",
            skills: ["Python", "Beautiful Soup", "Selenium"]
        },
        {
            title: "Python Programming: 46 Hours Course with 210 Exercises, 5 Projects, 2 Exams",
            issuer: "Udemy",
            date: "2024",
            credentialId: "https://www.udemy.com/certificate/UC-4fdfd77b-c214-4ec9-9830-1d8666e4bd2c/",
            skills: ["Python", "OOP"],
            logo: "assets/images/Udemy-Logo.png"
        }
    ],
    languages: [
        {
            language: "English",
            level: "B2 (Upper Intermediate)",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
                    <path fill="#012169" d="M0 0h640v480H0z"/>
                    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
                    <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
                    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
                    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
                  </svg>`
        },
        {
            language: "German",
            level: "B1 (Intermediate) - Goethe-Zertifikat B1",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
                    <path fill="#ffce00" d="M0 320h640v160H0z"/>
                    <path d="M0 0h640v160H0z"/>
                    <path fill="#d00" d="M0 160h640v160H0z"/>
                  </svg>`
        },
        {
            language: "Turkish",
            level: "Native",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
                    <rect width="1200" height="800" fill="#E30A17"/>
                    <circle cx="425" cy="400" r="200" fill="#ffffff"/>
                    <circle cx="475" cy="400" r="160" fill="#E30A17"/>
                    <polygon fill="#ffffff" points="583.334,400 764.235,458.779 652.431,304.894 652.431,495.106 764.235,341.221"/>
                  </svg>`
        }
    ]
};
