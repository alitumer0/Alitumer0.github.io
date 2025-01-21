const cvData = {
    name: "Ali Tümer",
    title: "Full Stack Developer",
    profileImage: "assets/images/profile.jpg",
    contact: {
        email: "aetumer50@gmail.com",
        linkedin: "www.linkedin.com/in/alitumer/",
        github: "github.com/alitumer0"
    },
    about: "Hello! I'm Ali, a passionate software developer with a strong foundation in full-stack development. I specialize in creating efficient, scalable solutions using modern technologies. My approach combines technical expertise with creative problem-solving to deliver high-quality software solutions.",
    skills: [
        { name: "JavaScript", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "C#", link: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
        { name: "Python", link: "https://www.python.org/doc/" },
        { name: ".NET", link: "https://learn.microsoft.com/en-us/dotnet/" },
        { name: "ASP.NET MVC", link: "https://learn.microsoft.com/en-us/aspnet/core/mvc/overview" },
        { name: "HTML", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { name: "CSS", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { name: "SQL Server", link: "https://learn.microsoft.com/en-us/sql/sql-server/" },
        { name: "Entity Framework Core", link: "https://learn.microsoft.com/en-us/ef/core/" }
    ],
    experience: [
        {
            period: "2023 - Şimdi",
            title: "Full Stack Developer",
            company: "Tech Co.",
            description: "Modern web uygulamaları geliştirme, API tasarımı ve implementasyonu, veritabanı yönetimi."
        },
        {
            period: "2021 - 2023",
            title: "Frontend Developer",
            company: "Digital Agency",
            description: "Responsive web siteleri, kullanıcı arayüzü geliştirme, performans optimizasyonu."
        },
        {
            period: "2020 - 2021",
            title: "Junior Developer",
            company: "Startup Inc.",
            description: "Web geliştirme projeleri, kod bakımı ve debugging, müşteri desteği."
        }
    ],
    projects: [
        {
            title: "RentACar Management System",
            description: "Modern car rental management system built with Windows Forms and Entity Framework. Features include user authentication, vehicle management, customer tracking, and rental operations.",
            technologies: ["C#", ".NET 8.0", "Entity Framework Core", "Windows Forms", "MS SQL Server"],
            link: "https://github.com/alitumer0/RentACar-EF-WinForms",
            preview: "assets/images/rentacar-logo.png"
        },
        {
            title: "Text-Summarizer Google Extension",
            description: "Developed a browser extension for summarizing text content efficiently.",
            technologies: ["JavaScript", "Browser APIs"],
            link: "https://github.com/alitumer0/text-summarizer",
            preview: "assets/images/summarizer-logo.png"
        }
    ],
    education: [
        {
            degree: "Boost Star Developer Development Program (.Net)",
            institution: "BilgeAdam Boost",
            period: "Sep 2024 - Jul 2025",
            description: "660 hours of training on C#, SQL Server, ADO.Net, Entity Framework Core, WFA, Asp.Net Core Mvc, Web API, Design Patterns, N-Tier Architecture, Scrum, Waterfall, Github with hands-on project development experience.",
            logo: "assets/images/bilgeadam-logo.png"
        },
        {
            degree: "Associate's Degree in Web Design and Coding",
            institution: "Anadolu University",
            period: "Sep 2023 - Jun 2025",
            description: "Focus on web development technologies and responsive design principles.",
            logo: "assets/images/anadolu-logo.png"
        },
        {
            degree: "Bachelor's Degree",
            institution: "Dokuz Eylül University",
            period: "2019 - 2023",
            description: "Computer Science and Programming focused education with emphasis on C++ and .NET technologies.",
            logo: "assets/images/deu-logo.png"
        }
    ],
    certifications: [
        {
            title: "Python Hands-On 46 Hours, 210 Exercises, 5 Projects, 2 Exams",
            issuer: "Udemy",
            date: "Jan 2025",
            credentialId: "https://www.udemy.com/certificate/UC-4fdfd77b-c214-4ec9-9830-1d8666e4bd2c/",
            skills: ["Python", "OOP"],
            logo: "assets/images/Udemy-Logo.png"
        },
        {
            title: "Workflow and Process Management with Git, GitHub, GitLab and Jira",
            issuer: "Miuul",
            date: "Jan 2025",
            credentialId: "https://learning.miuul.com/certificates/kndnijuzup",
            skills: ["GitLab", "Git", "JIRA", "Github"],
            logo: "assets/images/miuul-logo.png"
        },
        {
            title: "Web Scraping with Beautiful Soup and Selenium",
            issuer: "Miuul",
            date: "June 2024",
            logo: "assets/images/miuul-logo.png",
            credentialId: "https://learning.miuul.com/certificates/fcwwayyqby",
            skills: ["Python", "Beautiful Soup", "Selenium", "Web Scraping"]
        }
    ],
    languages: [
        {
            language: "German",
            level: "Limited working proficiency",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
                    <path fill="#ffce00" d="M0 320h640v160H0z"/>
                    <path d="M0 0h640v160H0z"/>
                    <path fill="#d00" d="M0 160h640v160H0z"/>
                  </svg>`
        },
        {
            language: "English",
            level: "Professional working proficiency",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
                    <path fill="#012169" d="M0 0h640v480H0z"/>
                    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
                    <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
                    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
                    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
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