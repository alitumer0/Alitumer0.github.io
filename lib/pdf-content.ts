import type { LanguageCode } from "@/lib/i18n";

export type ContactItem = {
  label: string;
  value: string;
  href: string;
};

export type ExperienceItem = {
  period: string;
  org: string;
  role: string;
  detail: string;
};

export type ProjectTag = "featured" | "enterprise" | "product";

export type ProjectCaseStudy = {
  overview: string;
  contributions: string[];
  caseStudyUrl?: string;
};

export type ProjectItem = {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  logo?: string;
  tag: ProjectTag;
  featured?: boolean;
  repoUrl?: string;
  liveUrl?: string;
  caseStudy: ProjectCaseStudy;
};

export type CertificationItem = {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
  logo?: string;
};

export type LanguageItem = {
  name: string;
  level: string;
  note?: string;
};

export type ChatCopy = {
  title: string;
  subtitle: string;
  greeting: string;
  send: string;
  sending: string;
  placeholders: {
    name: string;
    email: string;
    message: string;
  };
  feedback: {
    required: string;
    success: string;
    error: string;
  };
};

export type ProjectShowcaseCopy = {
  caseStudy: string;
  viewCode: string;
  openLive: string;
  openCode: string;
  tags: {
    featured: string;
    enterprise: string;
    product: string;
  };
  modal: {
    overview: string;
    techStack: string;
    contributions: string;
    links: string;
    close: string;
  };
};

export type PortfolioContent = {
  name: string;
  title: string;
  heroHeadline: string;
  sectionTitles: {
    hero: string;
    skills: string;
    languages: string;
    experience: string;
    projects: string;
    certifications: string;
    contact: string;
    chat: string;
  };
  cta: {
    projects: string;
    contact: string;
    credential: string;
  };
  projectShowcase: ProjectShowcaseCopy;
  professionalSkills: string[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  chat: ChatCopy;
  contacts: ContactItem[];
};

const CONTACTS: ContactItem[] = [
  { label: "Email", value: "aetumer50@gmail.com", href: "mailto:aetumer50@gmail.com" },
  { label: "GitHub", value: "github.com/alitumer0", href: "https://github.com/alitumer0" },
  { label: "LinkedIn", value: "linkedin.com/in/alitumer", href: "https://linkedin.com/in/alitumer" }
];

const COMMON_SKILLS = ["C#", ".NET", "MS SQL Server", "React", "Node.js", "Git", "Docker", "REST APIs"];

const PROJECT_SHOWCASE_EN: ProjectShowcaseCopy = {
  caseStudy: "Case Study",
  viewCode: "View Code",
  openLive: "Open Live Project",
  openCode: "Open Repository",
  tags: {
    featured: "Featured",
    enterprise: "Enterprise",
    product: "Product"
  },
  modal: {
    overview: "Overview",
    techStack: "Tech Stack",
    contributions: "My Contributions",
    links: "Links",
    close: "Close"
  }
};

const PROJECTS_EN: ProjectItem[] = [
  {
    slug: "salesapp",
    title: "SalesApp",
    description:
      "Sales management system with clean architecture boundaries, modular domain design, and reliable transaction workflows.",
    technologies: ["C#", "ASP.NET Core 7.0 MVC", "Entity Framework Core", "SQL Server", "Clean Architecture"],
    image: "/assets/images/salessync-logo.png",
    tag: "featured",
    featured: true,
    repoUrl: "https://github.com/alitumer0/SalesManagement",
    caseStudy: {
      overview:
        "SalesApp organizes product, customer, and order processes in a single operational flow with maintainable architecture.",
      contributions: [
        "Designed and implemented layered architecture for domain, application, and data concerns.",
        "Built CRUD and validation flows for sales entities and management screens.",
        "Modeled SQL Server persistence with Entity Framework Core and relational consistency rules."
      ]
    }
  },
  {
    slug: "student-management-system",
    title: "Student Management System",
    description: "Role-based platform for student records, academic workflows, and administration screens.",
    technologies: ["ASP.NET Core", "SQL", "React"],
    image: "/assets/images/edupanel-logo.png",
    tag: "enterprise",
    caseStudy: {
      overview:
        "A web application for managing student lifecycle data and operational actions in a single dashboard model.",
      contributions: [
        "Implemented CRUD screens and form validation for academic records.",
        "Built role-aware access behavior for administration and user operations.",
        "Structured frontend screens to keep data entry and review flows clear."
      ]
    }
  },
  {
    slug: "asset-inventory-management",
    title: "Asset-Inventory Management",
    description: "Inventory and assignment workflow for tracking assets and operational handovers.",
    technologies: ["ASP.NET MVC", "SQL Server", "Bootstrap"],
    image: "/assets/images/inventory-management.png",
    tag: "enterprise",
    repoUrl: "https://github.com/alitumer0/Varlik-Zimmet-Depo-Yonetimi",
    caseStudy: {
      overview:
        "This application focuses on inventory visibility and assignment traceability across internal operations.",
      contributions: [
        "Developed inventory listing and assignment interfaces for daily operations.",
        "Implemented SQL-backed persistence for asset and user mappings.",
        "Organized user flows for safer updates and easier status tracking."
      ]
    }
  },
  {
    slug: "allercheck",
    title: "AllerCheck",
    description: "Food allergen management app for blacklist controls and safer product selection.",
    technologies: ["ASP.NET Core", "REST APIs", "JavaScript"],
    image: "/assets/images/food-allergy-awareness.png",
    tag: "product",
    caseStudy: {
      overview:
        "AllerCheck helps users track personal allergen constraints and evaluate products safely.",
      contributions: [
        "Designed product and allergen listing flows for quick filtering.",
        "Implemented blacklist and favorite logic in a web-first interface.",
        "Integrated API-style data handling for consistent updates."
      ]
    }
  },
  {
    slug: "whats-my-fridge",
    title: "Whats My Fridge",
    description: "Ingredient-to-recipe assistant focused on usability and practical meal suggestions.",
    technologies: ["React", "Three.js", "Tailwind CSS"],
    image: "/assets/images/whatsmyfridge.png",
    logo: "/assets/images/whatsmyfridge-logo.png",
    tag: "product",
    caseStudy: {
      overview:
        "Whats My Fridge converts available ingredients into useful recipe directions with a lightweight UX.",
      contributions: [
        "Developed interactive UI flows for ingredient selection and result rendering.",
        "Implemented frontend state handling for recipe suggestion scenarios.",
        "Built and refined visual layers to keep the experience clear and responsive."
      ]
    }
  }
];

const CERTIFICATIONS_EN: CertificationItem[] = [
  {
    title: "Workflow and Process Management: Git, GitHub, GitLab and Jira",
    issuer: "Miuul",
    date: "2024",
    credentialUrl: "https://learning.miuul.com/certificates/kndnijuzup",
    skills: ["Git", "GitHub", "GitLab", "Jira"],
    logo: "/assets/images/miuul-logo.png"
  },
  {
    title: "Web Scraping: Beautiful Soup and Selenium",
    issuer: "Miuul",
    date: "2024",
    credentialUrl: "https://learning.miuul.com/certificates/fcwwayyqby",
    skills: ["Python", "Beautiful Soup", "Selenium"],
    logo: "/assets/images/miuul-logo.png"
  },
  {
    title: "Python Programming: 46 Hours Course with 210 Exercises, 5 Projects, 2 Exams",
    issuer: "Udemy",
    date: "2024",
    credentialUrl: "https://www.udemy.com/certificate/UC-4fdfd77b-c214-4ec9-9830-1d8666e4bd2c/",
    skills: ["Python", "OOP"],
    logo: "/assets/images/Udemy-Logo.png"
  }
];

const LANGUAGES_EN: LanguageItem[] = [
  { name: "Turkish", level: "Native" },
  { name: "English", level: "B2 (Upper Intermediate)" },
  { name: "German", level: "B1 (Intermediate)", note: "Goethe-Zertifikat B1" }
];

const portfolioContentByLanguage: Record<LanguageCode, PortfolioContent> = {
  en: {
    name: "Ali Tumer",
    title: "Software Developer",
    heroHeadline: "I build reliable software products with clean architecture, maintainable backend systems, and polished user interfaces.",
    sectionTitles: {
      hero: "Hero",
      skills: "Skills",
      languages: "Languages",
      experience: "Experience",
      projects: "Projects",
      certifications: "Certifications",
      contact: "Contact",
      chat: "Chat"
    },
    cta: {
      projects: "View Projects",
      contact: "Contact",
      credential: "Credential"
    },
    projectShowcase: PROJECT_SHOWCASE_EN,
    professionalSkills: COMMON_SKILLS,
    experience: [
      {
        period: "2024 - Present",
        org: "BilgeAdam Academy",
        role: "Software Specialist Bootcamp",
        detail: "Full-stack training focused on modern software development practices and production-ready applications."
      }
    ],
    projects: PROJECTS_EN,
    certifications: CERTIFICATIONS_EN,
    languages: LANGUAGES_EN,
    chat: {
      title: "Chat With Ali",
      subtitle: "Drop a quick message and I will reply by email.",
      greeting: "Hey, Ali here. Tell me what you are building and how I can help.",
      send: "Send",
      sending: "Sending...",
      placeholders: {
        name: "Your name",
        email: "Your email",
        message: "Write your message"
      },
      feedback: {
        required: "Please fill in name, email, and message.",
        success: "Message sent successfully. I will get back to you soon.",
        error: "Message could not be sent right now. Please try again later."
      }
    },
    contacts: CONTACTS
  },
  tr: {
    name: "Ali Tumer",
    title: "Yazilim Gelistirici",
    heroHeadline: "Temiz mimari, guclu backend sistemleri ve sade kullanici deneyimi ile yuksek performansli web uygulamalari gelistiriyorum.",
    sectionTitles: {
      hero: "Giris",
      skills: "Yetenekler",
      languages: "Diller",
      experience: "Deneyim",
      projects: "Projeler",
      certifications: "Sertifikalar",
      contact: "Iletisim",
      chat: "Sohbet"
    },
    cta: {
      projects: "Projeleri Gor",
      contact: "Iletisim",
      credential: "Belge"
    },
    projectShowcase: {
      ...PROJECT_SHOWCASE_EN,
      caseStudy: "Vaka Incelemesi",
      viewCode: "Kodu Gor",
      openLive: "Canli Projeyi Ac",
      openCode: "Depoyu Ac",
      tags: {
        featured: "One Cikan",
        enterprise: "Kurumsal",
        product: "Urun"
      },
      modal: {
        overview: "Genel Bakis",
        techStack: "Teknoloji Yigini",
        contributions: "Katkilarim",
        links: "Baglantilar",
        close: "Kapat"
      }
    },
    professionalSkills: COMMON_SKILLS,
    experience: [
      {
        period: "2024 - Guncel",
        org: "BilgeAdam Academy",
        role: "Software Specialist Bootcamp",
        detail: "Modern yazilim gelistirme pratikleri ve uretim kalitesinde uygulama teslimine odakli full-stack egitim."
      }
    ],
    projects: PROJECTS_EN,
    certifications: CERTIFICATIONS_EN,
    languages: [
      { name: "Turkce", level: "Ana Dil" },
      { name: "Ingilizce", level: "B2 (Upper Intermediate)" },
      { name: "Almanca", level: "B1 (Intermediate)", note: "Goethe-Zertifikat B1" }
    ],
    chat: {
      title: "Ali ile Sohbet",
      subtitle: "Kisa bir mesaj birak, e-posta ile geri donus yapayim.",
      greeting: "Merhaba, ben Ali. Ne uzerinde calistigini yaz, nasil yardimci olabilecegimi goreyim.",
      send: "Gonder",
      sending: "Gonderiliyor...",
      placeholders: {
        name: "Adin",
        email: "E-posta adresin",
        message: "Mesajini yaz"
      },
      feedback: {
        required: "Lutfen ad, e-posta ve mesaj alanlarini doldur.",
        success: "Mesajin gonderildi. En kisa surede donus yapacagim.",
        error: "Mesaj su an gonderilemedi. Lutfen daha sonra tekrar dene."
      }
    },
    contacts: CONTACTS
  },
  de: {
    name: "Ali Tumer",
    title: "Softwareentwickler",
    heroHeadline: "Ich entwickle performante Webanwendungen mit sauberer Architektur, stabilen Backend-Systemen und klarer Benutzerfuehrung.",
    sectionTitles: {
      hero: "Start",
      skills: "Skills",
      languages: "Sprachen",
      experience: "Erfahrung",
      projects: "Projekte",
      certifications: "Zertifikate",
      contact: "Kontakt",
      chat: "Chat"
    },
    cta: {
      projects: "Projekte ansehen",
      contact: "Kontakt",
      credential: "Nachweis"
    },
    projectShowcase: {
      ...PROJECT_SHOWCASE_EN,
      caseStudy: "Fallstudie",
      viewCode: "Code ansehen",
      openLive: "Live-Projekt offnen",
      openCode: "Repository offnen",
      tags: {
        featured: "Featured",
        enterprise: "Enterprise",
        product: "Produkt"
      },
      modal: {
        overview: "Ubersicht",
        techStack: "Tech Stack",
        contributions: "Meine Beitrage",
        links: "Links",
        close: "Schliessen"
      }
    },
    professionalSkills: COMMON_SKILLS,
    experience: [
      {
        period: "2024 - Heute",
        org: "BilgeAdam Academy",
        role: "Software Specialist Bootcamp",
        detail: "Full-Stack-Ausbildung mit Fokus auf moderne Entwicklungspraktiken und produktionsreife Anwendungen."
      }
    ],
    projects: PROJECTS_EN,
    certifications: CERTIFICATIONS_EN,
    languages: [
      { name: "Turkisch", level: "Muttersprache" },
      { name: "Englisch", level: "B2 (Upper Intermediate)" },
      { name: "Deutsch", level: "B1 (Intermediate)", note: "Goethe-Zertifikat B1" }
    ],
    chat: {
      title: "Chat Mit Ali",
      subtitle: "Schreib mir kurz, ich antworte per E-Mail.",
      greeting: "Hey, hier ist Ali. Erzahl mir kurz, woran du arbeitest und wie ich helfen kann.",
      send: "Senden",
      sending: "Wird gesendet...",
      placeholders: {
        name: "Dein Name",
        email: "Deine E-Mail",
        message: "Deine Nachricht"
      },
      feedback: {
        required: "Bitte Name, E-Mail und Nachricht ausfullen.",
        success: "Nachricht gesendet. Ich melde mich bald.",
        error: "Nachricht konnte gerade nicht gesendet werden. Bitte spater erneut versuchen."
      }
    },
    contacts: CONTACTS
  }
};

export function getPortfolioContent(language: LanguageCode): PortfolioContent {
  return portfolioContentByLanguage[language] ?? portfolioContentByLanguage.en;
}
