// Theme management
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;
const matrixBg = document.querySelector('.matrix-bg');

// Initialize theme from localStorage or default to dark
const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
        localStorage.setItem('theme', 'dark');
    }
};

const updateThemeIcon = (theme) => {
    if (theme === 'dark') {
        startMatrixRain();
    } else {
        stopMatrixRain();
    }
};

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Matrix rain effect
let matrixRainInterval;

function startMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.05';
    matrixBg.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = new Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    matrixRainInterval = setInterval(draw, 33);
}

function stopMatrixRain() {
    if (matrixRainInterval) {
        clearInterval(matrixRainInterval);
        matrixBg.innerHTML = '';
    }
}

// Type writer effect for skills
function typeWriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    return new Promise(resolve => {
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

// VS Code-like cursor animation for text
function addCursorAnimation(element) {
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '|';
    element.appendChild(cursor);
}

// Modified render functions with animations
async function renderHome() {
    // Load and animate profile image
    const profileImage = document.getElementById('profile-image');
    if (profileImage) {
        profileImage.style.backgroundImage = `url(${cvData.profileImage})`;
        setTimeout(() => {
            profileImage.classList.add('visible');
        }, 100);
    }

    const nameElement = document.getElementById('name');
    const titleElement = document.getElementById('title');
    
    await typeWriterEffect(nameElement, cvData.name);
    addCursorAnimation(nameElement);
    
    await typeWriterEffect(titleElement, cvData.title);
    
    renderSkills();
}

// Initialize theme and start animations
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    renderHome();
    renderAbout();
    renderExperience();
    renderEducation();
    renderCertifications();
    renderLanguages();
    renderProjects();
    renderContact();
    setupContactForm();

    // Setup intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('code-block')) {
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                }
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.section, .code-block').forEach((element) => {
        observer.observe(element);
    });

    // Add hover effect to skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseover', () => {
            tag.style.transform = 'scale(1.1)';
        });
        tag.addEventListener('mouseout', () => {
            tag.style.transform = 'scale(1)';
        });
    });
});

// Update active link on scroll
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function renderAbout() {
    const aboutContent = document.getElementById('about-content');
    aboutContent.innerHTML = `<div class="code-block">
        <span class="comment">// About me</span>
        <span class="keyword">const</span> developer = {
            <span class="property">"name"</span>: <span class="string">"${cvData.name}"</span>,
            <span class="property">"passion"</span>: <span class="string">"Building amazing web experiences"</span>,
            <span class="property">"description"</span>: <span class="string">${JSON.stringify(cvData.about)}</span>
        };
    </div>`;
}

function renderExperience() {
    const experienceContent = document.getElementById('experience-content');
    experienceContent.innerHTML = cvData.experience.map(exp => `
        <div class="experience-item">
            <h3 class="syntax-variable">${exp.title}</h3>
            <h4 class="syntax-string">${exp.company}</h4>
            <p class="period syntax-number">${exp.period}</p>
            <p class="syntax-string">${exp.description}</p>
        </div>
    `).join('');
}

function renderEducation() {
    const educationContent = document.getElementById('education-content');
    educationContent.innerHTML = cvData.education.map(edu => `
        <div class="education-item">
            <img src="${edu.logo}" alt="${edu.institution} logo" class="education-logo">
            <h3 class="syntax-variable">${edu.degree}</h3>
            <h4 class="syntax-string">${edu.institution}</h4>
            <p class="education-period syntax-number">${edu.period}</p>
            <p class="education-description syntax-string">${edu.description}</p>
        </div>
    `).join('');
}

function renderCertifications() {
    const certificationsContent = document.getElementById('certifications-content');
    certificationsContent.innerHTML = cvData.certifications.map(cert => `
        <div class="certification-item">
            <img src="${cert.logo}" alt="${cert.issuer} logo" class="certification-logo">
            <h3 class="syntax-variable">${cert.title}</h3>
            <p class="certification-issuer syntax-string">${cert.issuer}</p>
            <p class="certification-date syntax-number">${cert.date}</p>
            ${cert.credentialId ? `
                <a href="${cert.credentialId}" 
                   class="credential-button" 
                   target="_blank">
                    <i class="ri-verified-badge-fill"></i>
                    View Certificate
                </a>
            ` : ''}
            <div class="certification-skills">
                ${cert.skills.map(skill => `
                    <span class="certification-skill">${skill}</span>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function renderLanguages() {
    const languagesContent = document.getElementById('languages-content');
    languagesContent.innerHTML = cvData.languages.map(lang => `
        <div class="language-item">
            <div class="language-icon">${lang.icon}</div>
            <h3 class="language-name syntax-variable">${lang.language}</h3>
            <p class="language-level syntax-string">${lang.level}</p>
        </div>
    `).join('');
}

function renderProjects() {
    const projectsContent = document.getElementById('projects-content');
    projectsContent.innerHTML = cvData.projects.map(project => `
        <div class="project-card">
            <div class="project-preview">
                <img src="${project.preview}" alt="${project.title} preview">
                <div class="project-overlay">
                    <a href="${project.link}" target="_blank" class="project-link">View Project</a>
                </div>
            </div>
            <div class="project-info">
                <h3 class="syntax-variable">${project.title}</h3>
                <p class="project-description syntax-string">${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // Add hover effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-overlay').style.opacity = '1';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-overlay').style.opacity = '0';
        });
    });
}

function renderContact() {
    const contactInfo = document.getElementById('contact-info');
    contactInfo.innerHTML = `
        <div class="code-block">
            <span class="comment">// Contact information</span>
            <span class="keyword">const</span> contact = {
                <span class="property">"email"</span>: <span class="string">"<a href="mailto:${cvData.contact.email}" class="contact-link">${cvData.contact.email}</a>"</span>,
                <span class="property">"linkedin"</span>: <span class="string">"<a href="https://${cvData.contact.linkedin}" target="_blank" class="contact-link">${cvData.contact.linkedin}</a>"</span>,
                <span class="property">"github"</span>: <span class="string">"<a href="https://${cvData.contact.github}" target="_blank" class="contact-link">${cvData.contact.github}</a>"</span>
            };
        </div>
    `;
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        console.log({
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        });
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
    });
}

async function renderSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    skillsContainer.innerHTML = ''; // Clear existing skills
    
    for (const skill of cvData.skills) {
        const skillElement = document.createElement('div');
        skillElement.style.opacity = '0';
        skillElement.style.transform = 'translateY(20px)';
        skillElement.style.transition = 'all 0.6s ease';
        
        if (skill.link) {
            skillElement.innerHTML = `
                <a href="${skill.link}" 
                   target="_blank" 
                   class="skill-tag" 
                   title="Click to view ${skill.name} documentation">
                    ${skill.name}
                </a>`;
        } else {
            skillElement.innerHTML = `<span class="skill-tag">${skill.name}</span>`;
        }
        
        skillsContainer.appendChild(skillElement);
        
        // Increased delay for slower loading
        await new Promise(resolve => setTimeout(resolve, 200));
        skillElement.style.opacity = '1';
        skillElement.style.transform = 'translateY(0)';
    }
    
    // Add hover effect to skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseover', () => {
            tag.style.transform = 'scale(1.1)';
        });
        tag.addEventListener('mouseout', () => {
            tag.style.transform = 'scale(1)';
        });
    });
}

// Sidebar functionality
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const sidebarLinks = document.querySelectorAll('.sidebar-links a');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('shifted');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            mainContent.classList.remove('shifted');
        }
    }
});

// Close sidebar when clicking a link on mobile
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            mainContent.classList.remove('shifted');
        }
    });
});