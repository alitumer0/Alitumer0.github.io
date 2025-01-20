const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;
const matrixBg = document.querySelector('.matrix-bg');
let matrixRainInterval;
let particleCanvas = null;

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
        if (particleCanvas) {
            particleCanvas.remove();
            particleCanvas = null;
        }
        startMatrixRain();
    } else {
        stopMatrixRain();
        particleCanvas = startParticleEffect();
    }
};

function updateTheme(newTheme) {
    document.body.classList.add('theme-transition');
    
    document.querySelectorAll('.container').forEach(container => {
        container.style.animation = 'none';
        container.offsetHeight;
        container.style.animation = null;
    });

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
        if (particleCanvas) {
            particleCanvas.remove();
            particleCanvas = null;
        }
        startMatrixRain();
    } else {
        stopMatrixRain();
        particleCanvas = startParticleEffect();
    }

    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 500);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    updateTheme(newTheme);
});

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
    
    // Mouse pozisyonu için değişkenler
    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 100;
    let isClicked = false;
    let clickX = 0;
    let clickY = 0;
    let clickRadius = 0;
    let clickColor = '#0F0';

    // Mouse olayları
    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    canvas.addEventListener('click', (e) => {
        isClicked = true;
        clickX = e.clientX;
        clickY = e.clientY;
        clickRadius = 0;
        // Rastgele renk seç
        const colors = ['#0F0', '#00F', '#F00', '#FF0', '#0FF', '#F0F'];
        clickColor = colors[Math.floor(Math.random() * colors.length)];
    });

    function draw() {
        // Yarı saydam siyah arka plan
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < drops.length; i++) {
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Mouse pozisyonuna yakınlık hesapla
            const distanceToMouse = Math.sqrt(
                Math.pow(x - mouseX, 2) + 
                Math.pow(y - mouseY, 2)
            );

            // Tıklama dalgası efekti
            let clickEffect = 0;
            if (isClicked) {
                const distanceToClick = Math.sqrt(
                    Math.pow(x - clickX, 2) + 
                    Math.pow(y - clickY, 2)
                );
                if (distanceToClick < clickRadius) {
                    clickEffect = 1 - (distanceToClick / clickRadius);
                }
            }

            // Karakter ve renk ayarları
            const text = characters[Math.floor(Math.random() * characters.length)];
            
            if (distanceToMouse < mouseRadius) {
                // Mouse yakınındaki karakterler için özel efekt
                const intensity = 1 - (distanceToMouse / mouseRadius);
                ctx.fillStyle = `rgba(0, 255, 0, ${0.5 + intensity * 0.5})`;
                ctx.font = `${fontSize + intensity * 8}px monospace`;
            } else if (clickEffect > 0) {
                // Tıklama dalgası efekti
                ctx.fillStyle = clickColor;
                ctx.font = `${fontSize + clickEffect * 10}px monospace`;
            } else {
                // Normal karakterler
                ctx.fillStyle = '#0F0';
                ctx.font = `${fontSize}px monospace`;
            }

            ctx.fillText(text, x, y);

            // Karakterlerin düşme hızını ayarla
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }

        // Tıklama dalgası animasyonu
        if (isClicked) {
            clickRadius += 10;
            if (clickRadius > Math.max(canvas.width, canvas.height)) {
                isClicked = false;
            }
        }
    }

    // Pencere boyutu değiştiğinde canvas'ı güncelle
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drops.length = Math.floor(canvas.width / fontSize);
        drops.fill(1);
    });

    matrixRainInterval = setInterval(draw, 33);
}

function stopMatrixRain() {
    if (matrixRainInterval) {
        clearInterval(matrixRainInterval);
        matrixBg.innerHTML = '';
    }
}

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

function addCursorAnimation(element) {
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '|';
    element.appendChild(cursor);
}

async function renderHome() {
    const profileImage = document.getElementById('profile-image');
    if (profileImage) {
        // Profil fotoğrafını ayarla
        profileImage.style.backgroundImage = `url(${cvData.profileImage})`;
        
        // Neon efektleri ekle
        const wrapper = profileImage.parentElement;
        
        // Neon çerçeve
        const neonBorder = document.createElement('div');
        neonBorder.className = 'profile-neon-border';
        wrapper.appendChild(neonBorder);
        
        // Köşe aksentleri
        const corners = ['tl', 'tr', 'bl', 'br'];
        corners.forEach(corner => {
            const cornerElement = document.createElement('div');
            cornerElement.className = `profile-corner corner-${corner}`;
            wrapper.appendChild(cornerElement);
        });
        
        // Siber çizgiler
        const lines = [
            { class: 'cyber-line cyber-line-h cyber-line-1' },
            { class: 'cyber-line cyber-line-h cyber-line-2' },
            { class: 'cyber-line cyber-line-v cyber-line-3' },
            { class: 'cyber-line cyber-line-v cyber-line-4' }
        ];
        
        lines.forEach(line => {
            const lineElement = document.createElement('div');
            lineElement.className = line.class;
            wrapper.appendChild(lineElement);
        });
        
        // Scan line efekti
        const scanLine = document.createElement('div');
        scanLine.className = 'scan-line';
        wrapper.appendChild(scanLine);

        // Mouse hareketi efekti
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 10;
            const y = (e.clientY - rect.top - rect.height / 2) / 10;
            
            wrapper.style.transform = `
                perspective(1000px)
                rotateY(${x}deg)
                rotateX(${-y}deg)
                scale3d(1.02, 1.02, 1.02)
            `;
            
            // Neon parlaklığını ayarla
            const distance = Math.sqrt(x * x + y * y);
            const brightness = Math.min(1, 0.5 + distance / 20);
            neonBorder.style.filter = `blur(1px) brightness(${brightness})`;
        });

        // Mouse ayrıldığında
        wrapper.addEventListener('mouseleave', () => {
            wrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            neonBorder.style.filter = 'blur(1px) brightness(0.8)';
        });

        // Glitch efekti
        let glitchInterval;
        wrapper.addEventListener('mouseenter', () => {
            glitchInterval = setInterval(() => {
                const glitchX = Math.random() * 10 - 5;
                const glitchY = Math.random() * 10 - 5;
                profileImage.style.transform = `translate(${glitchX}px, ${glitchY}px)`;
                
                setTimeout(() => {
                    profileImage.style.transform = 'translate(0, 0)';
                }, 50);
            }, 3000);
        });

        wrapper.addEventListener('mouseleave', () => {
            clearInterval(glitchInterval);
            profileImage.style.transform = 'translate(0, 0)';
        });

        // Görünür olma animasyonu
        setTimeout(() => {
            profileImage.classList.add('visible');
            wrapper.style.opacity = '1';
        }, 100);
    }

    const nameElement = document.getElementById('name');
    const titleElement = document.getElementById('title');
    
    await typeWriterEffect(nameElement, cvData.name);
    addCursorAnimation(nameElement);
    
    await typeWriterEffect(titleElement, cvData.title);
    
    renderSkills();
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('theme-transition');
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

    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseover', () => {
            tag.style.transform = 'scale(1.1)';
        });
        tag.addEventListener('mouseout', () => {
            tag.style.transform = 'scale(1)';
        });
    });

    createTimeline();
    initTimelineAnimation();
    optimizePerformance();
    init3DCards();

    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 500);
});

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
            <div class="language-flag">${lang.icon}</div>
            <h3 class="language-name syntax-variable">${lang.language}</h3>
            <p class="language-level">${lang.level}</p>
        </div>
    `).join('');

    // Bayraklar için hover efektlerini ekle
    document.querySelectorAll('.language-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const flag = item.querySelector('.language-flag');
            flag.style.transform = 'rotateY(360deg)';
        });

        item.addEventListener('mouseleave', () => {
            const flag = item.querySelector('.language-flag');
            flag.style.transform = 'rotateY(0)';
        });
    });
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
    skillsContainer.innerHTML = ''; 
    
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
        
        await new Promise(resolve => setTimeout(resolve, 200));
        skillElement.style.opacity = '1';
        skillElement.style.transform = 'translateY(0)';
    }
    
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseover', () => {
            tag.style.transform = 'scale(1.1)';
        });
        tag.addEventListener('mouseout', () => {
            tag.style.transform = 'scale(1)';
        });
    });
}

const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const sidebarLinks = document.querySelectorAll('.sidebar-links a');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('shifted');
});

document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            mainContent.classList.remove('shifted');
        }
    }
});

sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            mainContent.classList.remove('shifted');
        }
    });
});

// Timeline Animation
function createTimeline() {
    const experienceSection = document.getElementById('experience-content');
    experienceSection.className = 'timeline';
    
    experienceData.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${exp.period}</div>
                <h3 class="timeline-title">${exp.title} at ${exp.company}</h3>
                <p class="timeline-description">${exp.description}</p>
            </div>
        `;
        
        experienceSection.appendChild(timelineItem);
    });
}

// Intersection Observer for Timeline Animation
function initTimelineAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}

// Performance Optimizations
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            // Scroll handling code here
        });
    });

    // Cache DOM elements
    const frequentlyAccessedElements = {
        nav: document.querySelector('.right-nav'),
        sections: document.querySelectorAll('.section'),
        themeToggle: document.querySelector('.theme-toggle')
    };

    // Use passive event listeners
    window.addEventListener('scroll', () => {}, { passive: true });
    window.addEventListener('touchstart', () => {}, { passive: true });
}

function init3DCards() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        const height = card.clientHeight;
        const width = card.clientWidth;
        
        // Mouse hareketi
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const rotateY = ((mouseX - width/2) / width) * 20;
            const rotateX = -((mouseY - height/2) / height) * 20;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
            
            // Paralaks efekti için içerik öğelerini hareket ettir
            const preview = card.querySelector('.project-preview');
            const info = card.querySelector('.project-info');
            const title = card.querySelector('h3');
            const description = card.querySelector('.project-description');
            const tags = card.querySelectorAll('.tech-tag');
            
            preview.style.transform = `translateZ(50px)`;
            info.style.transform = `translateZ(30px)`;
            title.style.transform = `translateZ(40px)`;
            description.style.transform = `translateZ(30px)`;
            tags.forEach(tag => {
                tag.style.transform = `translateZ(20px)`;
            });
        });
        
        // Mouse ayrıldığında
        card.addEventListener('mouseleave', () => {
            card.style.transform = `
                perspective(1000px)
                rotateX(0)
                rotateY(0)
                scale3d(1, 1, 1)
            `;
            
            const elements = card.querySelectorAll('.project-preview, .project-info, h3, .project-description, .tech-tag');
            elements.forEach(el => {
                el.style.transform = 'translateZ(0)';
            });
        });
        
        // Dokunmatik cihazlar için
        card.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = card.getBoundingClientRect();
            const touchX = touch.clientX - rect.left;
            const touchY = touch.clientY - rect.top;
            
            const rotateY = ((touchX - width/2) / width) * 20;
            const rotateX = -((touchY - height/2) / height) * 20;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
        });
    });
}

function startParticleEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    matrixBg.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Parçacık sistemi
    const particles = [];
    const particleCount = 100;
    const colors = ['#FFD700', '#FFA500', '#FF6347', '#87CEEB', '#98FB98'];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = Math.random() * 0.5 + 0.5;
            this.connection = 150;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
        }
    }

    // Parçacıkları oluştur
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Mouse pozisyonu
    let mouse = {
        x: null,
        y: null,
        radius: 150
    };

    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Parçacıkları güncelle ve çiz
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Parçacıklar arası bağlantılar
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < particles[i].connection) {
                    ctx.beginPath();
                    ctx.strokeStyle = particles[i].color;
                    ctx.globalAlpha = 1 - (distance / particles[i].connection);
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }

            // Mouse etkileşimi
            if (mouse.x) {
                const dx = mouse.x - particles[i].x;
                const dy = mouse.y - particles[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = dx / distance;
                    const directionY = dy / distance;
                    particles[i].x -= directionX * force * 2;
                    particles[i].y -= directionY * force * 2;
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    // Pencere boyutu değiştiğinde canvas'ı güncelle
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    return canvas;
}