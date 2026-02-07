// Global değişkenler
let matrixRainInterval;
let particleCanvas = null;

const htmlElement = document.documentElement;
const matrixBg = document.querySelector('.matrix-bg');

// Ana DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // Tema başlatma
    const themeSwitch = document.getElementById('themeSwitch');
    if (themeSwitch) {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeSwitch.checked = savedTheme === 'dark';
        
        if (savedTheme === 'dark') {
            startMatrixRain();
        }
        
        themeSwitch.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            if (newTheme === 'dark') {
                if (particleCanvas) {
                    particleCanvas.remove();
                    particleCanvas = null;
                }
                startMatrixRain();
            } else {
                clearInterval(matrixRainInterval);
                const canvas = document.querySelector('.matrix-bg canvas');
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    canvas.remove();
                }
            }
        });
    }

    // Sayfa içeriğini yükle
    document.body.classList.add('theme-transition');
    renderHome();
    renderAbout();
    renderExperience();
    renderEducation();
    renderCertifications();
    renderLanguages();
    renderProjects();
    renderOngoingProjects();
    renderProfessionalSkills();
    renderVolunteer();
    renderHeroExtras();
    renderHighlights();
    renderSkillsCarousel();
    renderProjectFilters();
    renderContact();
    setupContactForm();
    initScrollProgress();
    initLibraries();
    initHeroScene();
    initFridgeScene();
    initMagneticButtons();
    initSidebarNavigation();
    initGlitchTransitions();

    // Intersection Observer kurulumu
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

    optimizePerformance();
    init3DCards();

    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 500);
});

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

// Matrix yağmuru efekti
function startMatrixRain() {
    const matrixBg = document.querySelector('.matrix-bg');
    if (!matrixBg) return;

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
    const headlineElement = document.getElementById('headline');
    
    if (nameElement) {
        await typeWriterEffect(nameElement, cvData.name);
        addCursorAnimation(nameElement);
        nameElement.setAttribute('data-text', cvData.name);
    }

    if (titleElement) {
        await typeWriterEffect(titleElement, cvData.title);
    }

    if (headlineElement) {
        headlineElement.textContent = cvData.heroHeadline || cvData.about;
    }
    
    renderSkills();
}

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
        <div class="experience-item" data-aos="fade-up">
            <h3 class="syntax-variable">${exp.title}</h3>
            <h4 class="syntax-string">${exp.company}</h4>
            ${exp.location ? `<p class="syntax-string">${exp.location}</p>` : ''}
            <p class="period syntax-number">${exp.period}</p>
            ${exp.description ? `<p class="syntax-string">${exp.description}</p>` : ''}
            ${exp.highlights ? `
                <ul class="experience-list">
                    ${exp.highlights.map(item => `<li>${item}</li>`).join('')}
                </ul>
            ` : ''}
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
            ${edu.location ? `<p class="syntax-string">${edu.location}</p>` : ''}
            <p class="education-period syntax-number">${edu.period}</p>
            <p class="education-description syntax-string">${edu.description}</p>
        </div>
    `).join('');
}

function renderCertifications() {
    const certificationsContent = document.getElementById('certifications-content');
    certificationsContent.innerHTML = cvData.certifications.map(cert => `
        <div class="certification-item" data-aos="zoom-in">
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
        <div class="language-item" data-aos="fade-up">
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
    projectsContent.innerHTML = cvData.projects.map(project => {
        const isFeatured = project.featured || project.slug === 'whats-my-fridge';
        return `
            <div class="project-card ${isFeatured ? 'project-card--featured' : ''}" data-tech="${project.technologies.join(',')}" data-project="${project.slug || ''}" data-aos="fade-up">
                ${isFeatured ? `
                    <div class="project-preview project-preview--canvas">
                        <canvas class="project-canvas" data-fridge-canvas></canvas>
                        <div class="project-overlay">
                            <a href="${project.link}" target="_blank" class="project-link magnetic">View Project</a>
                        </div>
                    </div>
                ` : `
                    <div class="project-preview">
                        <img src="${project.preview}" alt="${project.title} preview">
                        <div class="project-overlay">
                            <a href="${project.link}" target="_blank" class="project-link magnetic">View Project</a>
                        </div>
                    </div>
                `}
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
        `;
    }).join('');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-overlay').style.opacity = '1';
            if (card.classList.contains('project-card--featured')) {
                card.classList.add('is-hovered');
            }
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-overlay').style.opacity = '0';
            card.classList.remove('is-hovered');
        });
    });
}

function renderOngoingProjects() {
    const ongoingContent = document.getElementById('ongoing-projects-content');
    if (!ongoingContent) return;
    ongoingContent.innerHTML = cvData.ongoingProjects.map(project => `
        <div class="project-card" data-aos="fade-up">
            <div class="project-info">
                <h3 class="syntax-variable">${project.title}</h3>
                <p class="project-description syntax-string">${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function renderProfessionalSkills() {
    const skillsContent = document.getElementById('professional-skills-content');
    if (!skillsContent) return;
    skillsContent.innerHTML = cvData.professionalSkills.map(skill => `
        <div class="skill-slide" data-aos="fade-up">
            <h3>${skill.category}</h3>
            <ul class="experience-list">
                ${skill.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

function renderVolunteer() {
    const volunteerContent = document.getElementById('volunteer-content');
    if (!volunteerContent) return;
    volunteerContent.innerHTML = cvData.volunteerExperience.map(item => `
        <div class="experience-item" data-aos="fade-up">
            <h3 class="syntax-variable">${item.organization}</h3>
            <h4 class="syntax-string">${item.role}</h4>
            <p class="syntax-string">${item.location}</p>
            <p class="period syntax-number">${item.period}</p>
            <ul class="experience-list">
                ${item.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

function renderContact() {
    const contactInfo = document.getElementById('contact-info');
    contactInfo.innerHTML = `
        <div class="contact-card">
            <h3>Let’s Collaborate</h3>
            <p class="syntax-string">${cvData.about}</p>
            <div class="contact-list">
                <a href="mailto:${cvData.contact.email}">
                    <i class="ri-mail-line"></i>
                    ${cvData.contact.email}
                </a>
                <a href="tel:${cvData.contact.phone}">
                    <i class="ri-smartphone-line"></i>
                    ${cvData.contact.phone}
                </a>
                <a href="https://${cvData.contact.linkedin}" target="_blank">
                    <i class="ri-linkedin-box-line"></i>
                    ${cvData.contact.linkedin}
                </a>
                <a href="https://${cvData.contact.github}" target="_blank">
                    <i class="ri-github-line"></i>
                    ${cvData.contact.github}
                </a>
                <a href="https://${cvData.contact.portfolio}" target="_blank">
                    <i class="ri-global-line"></i>
                    ${cvData.contact.portfolio}
                </a>
            </div>
        </div>
    `;
}

function renderHeroExtras() {
    const heroContact = document.getElementById('hero-contact');
    const heroTags = document.getElementById('hero-tags');
    if (heroContact) {
        heroContact.innerHTML = `
            <a href="mailto:${cvData.contact.email}">
                <i class="ri-mail-line"></i>
                ${cvData.contact.email}
            </a>
            <a href="tel:${cvData.contact.phone}">
                <i class="ri-smartphone-line"></i>
                ${cvData.contact.phone}
            </a>
            <a href="https://${cvData.contact.linkedin}" target="_blank">
                <i class="ri-linkedin-box-line"></i>
                ${cvData.contact.linkedin}
            </a>
            <a href="https://${cvData.contact.github}" target="_blank">
                <i class="ri-github-line"></i>
                ${cvData.contact.github}
            </a>
            <a href="https://${cvData.contact.portfolio}" target="_blank">
                <i class="ri-global-line"></i>
                ${cvData.contact.portfolio}
            </a>
        `;
    }

    if (heroTags) {
        const tags = cvData.skills.slice(0, 6).map(skill => `
            <span class="hero-tag">${skill.name}</span>
        `).join('');
        heroTags.innerHTML = tags;
    }
}

function renderHighlights() {
    const highlightsContainer = document.getElementById('about-highlights');
    const statsContainer = document.getElementById('stats');
    if (!highlightsContainer) return;

    const totalProjects = cvData.projects.length;
    const totalCerts = cvData.certifications.length;
    const experienceYears = calculateExperienceYears();

    highlightsContainer.innerHTML = `
        <div class="highlight-card">
            <h4>Product-minded Engineering</h4>
            <p>Clean architecture, pixel-perfect UI, and scalable systems that keep users engaged.</p>
        </div>
        <div class="highlight-card">
            <h4>${totalProjects}+ Shipped Projects</h4>
            <p>From enterprise dashboards to productivity extensions, delivering end-to-end solutions.</p>
        </div>
        <div class="highlight-card">
            <h4>${totalCerts}+ Certifications</h4>
            <p>Continuous learning across software engineering, automation, and team collaboration.</p>
        </div>
    `;

    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-value">${experienceYears}+</div>
                <div class="stat-label">Years Experience</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${totalProjects}</div>
                <div class="stat-label">Projects Delivered</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${cvData.skills.length}</div>
                <div class="stat-label">Core Skills</div>
            </div>
        `;
    }
}

function calculateExperienceYears() {
    const yearMatches = cvData.experience
        .flatMap(exp => exp.period.match(/\d{4}/g) || [])
        .map(Number);
    if (!yearMatches.length) return 1;
    const minYear = Math.min(...yearMatches);
    const maxYear = Math.max(...yearMatches, new Date().getFullYear());
    return Math.max(1, maxYear - minYear);
}

function renderSkillsCarousel() {
    const carousel = document.getElementById('skills-carousel');
    if (!carousel) return;
    carousel.innerHTML = cvData.skills.map(skill => `
        <div class="swiper-slide">
            <div class="skill-slide">
                <h3>${skill.name}</h3>
                <span>Explore documentation and best practices.</span>
                ${skill.link ? `<a href="${skill.link}" target="_blank" class="contact-link">Learn more</a>` : ''}
            </div>
        </div>
    `).join('');
}

function renderProjectFilters() {
    const filterContainer = document.getElementById('project-filters');
    if (!filterContainer) return;

    const technologies = new Set(['All']);
    cvData.projects.forEach(project => {
        project.technologies.forEach(tech => technologies.add(tech));
    });

    filterContainer.innerHTML = Array.from(technologies).map((tech, index) => `
        <button class="filter-btn ${index === 0 ? 'active' : ''}" data-filter="${tech}">${tech}</button>
    `).join('');

    filterContainer.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            filterContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(button.dataset.filter);
        });
    });
}

function filterProjects(filter) {
    document.querySelectorAll('.project-card').forEach(card => {
        const techList = card.dataset.tech || '';
        if (filter === 'All' || techList.includes(filter)) {
            card.style.display = 'grid';
        } else {
            card.style.display = 'none';
        }
    });
}

function initScrollProgress() {
    const progress = document.querySelector('.scroll-progress');
    if (!progress) return;

    window.addEventListener('scroll', () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progressWidth = total ? (window.scrollY / total) * 100 : 0;
        progress.style.width = `${progressWidth}%`;
    });
}

function initLibraries() {
    if (window.AOS) {
        window.AOS.init({
            duration: 800,
            once: true
        });
    }

    if (window.Swiper) {
        new window.Swiper('.skills-carousel', {
            slidesPerView: 1.2,
            spaceBetween: 16,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    if (window.gsap) {
        window.gsap.from('.hero-content', {
            opacity: 0,
            y: 40,
            duration: 1
        });
        window.gsap.from('.hero-card', {
            opacity: 0,
            y: 40,
            duration: 1,
            delay: 0.2
        });
    }
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        submitButton.disabled = true;
        submitButton.textContent = 'Gönderiliyor...';
        
        const formData = {
            from_name: form.querySelector('input[name="name"]').value,
            from_email: form.querySelector('input[name="email"]').value,
            message: form.querySelector('textarea[name="message"]').value,
            to_email: 'aetumer50@gmail.com'
        };

        console.log('Form verileri:', formData);

        try {
            console.log('EmailJS gönderimi başlıyor...');
            const response = await emailjs.send(
                "service_qqvxwzk",
                "template_xcy6kkv",
                formData
            );

            console.log('EmailJS yanıtı:', response);

            if (response.status === 200) {
                console.log('E-posta başarıyla gönderildi');
                alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.');
                form.reset();
            } else {
                console.error('Beklenmeyen yanıt:', response);
                throw new Error('Beklenmeyen yanıt: ' + response.status);
            }
        } catch (error) {
            console.error('Hata detayları:', error);
            console.error('Hata mesajı:', error.message);
            console.error('Hata stack:', error.stack);
            alert('Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Gönder';
        }
    });

    // Form inputlarına animasyon ekle
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transform = 'scale(1.02)';
            input.style.transition = 'all 0.3s ease';
        });

        input.addEventListener('blur', () => {
            input.style.transform = 'scale(1)';
        });
    });
}

async function renderSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) {
        return;
    }
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

function initHeroScene() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || !window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const uniforms = {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    };

    const auraMaterial = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            precision highp float;
            varying vec2 vUv;
            uniform float uTime;

            vec3 colorA = vec3(0.0196, 0.0196, 0.0196);
            vec3 colorB = vec3(0.1019, 0.1019, 0.1803);

            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                                    -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy));
                vec2 x0 = v - i + dot(i, C.xx);
                vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                    + i.x + vec3(0.0, i1.x, 1.0));
                vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
                m = m * m;
                m = m * m;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
                vec3 g;
                g.x = a0.x * x0.x + h.x * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            void main() {
                vec2 uv = vUv * 2.0 - 1.0;
                float noise = snoise(uv * 1.2 + uTime * 0.08);
                float glow = smoothstep(-0.3, 0.8, noise);
                vec3 color = mix(colorA, colorB, glow);
                gl_FragColor = vec4(color, 0.95);
            }
        `
    });

    const auraPlane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), auraMaterial);
    auraPlane.position.z = -60;
    scene.add(auraPlane);

    const particleCount = 180;
    const geometry = new THREE.SphereGeometry(0.35, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
    const particles = new THREE.InstancedMesh(geometry, material, particleCount);
    const dummy = new THREE.Object3D();
    const particleData = [];

    for (let i = 0; i < particleCount; i++) {
        const position = new THREE.Vector3(
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 40
        );
        particleData.push({
            position,
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.05,
                (Math.random() - 0.5) * 0.05,
                (Math.random() - 0.5) * 0.02
            )
        });
        dummy.position.copy(position);
        dummy.updateMatrix();
        particles.setMatrixAt(i, dummy.matrix);
    }
    scene.add(particles);

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x7f8cff, transparent: true, opacity: 0.2 });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const mouse = new THREE.Vector2(0, 0);
    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    const updateLines = () => {
        let idx = 0;
        for (let i = 0; i < particleCount; i++) {
            const current = particleData[i].position;
            const next = particleData[(i + 1) % particleCount].position;
            linePositions[idx++] = current.x;
            linePositions[idx++] = current.y;
            linePositions[idx++] = current.z;
            linePositions[idx++] = next.x;
            linePositions[idx++] = next.y;
            linePositions[idx++] = next.z;
        }
        lineGeometry.attributes.position.needsUpdate = true;
    };

    const animate = () => {
        uniforms.uTime.value += 0.01;
        const mouseVector = new THREE.Vector3(mouse.x * 20, mouse.y * 12, 0);

        particleData.forEach((particle, index) => {
            particle.position.add(particle.velocity);
            const distance = particle.position.distanceTo(mouseVector);
            if (distance < 12) {
                const push = particle.position.clone().sub(mouseVector).normalize().multiplyScalar(0.2);
                particle.position.add(push);
            }

            if (particle.position.x > 40 || particle.position.x < -40) particle.velocity.x *= -1;
            if (particle.position.y > 25 || particle.position.y < -25) particle.velocity.y *= -1;
            if (particle.position.z > 20 || particle.position.z < -20) particle.velocity.z *= -1;

            dummy.position.copy(particle.position);
            dummy.updateMatrix();
            particles.setMatrixAt(index, dummy.matrix);
        });
        particles.instanceMatrix.needsUpdate = true;
        updateLines();

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    });
}

function initFridgeScene() {
    const canvas = document.querySelector('[data-fridge-canvas]');
    if (!canvas || !window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 2, 6);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const spotlight = new THREE.SpotLight(0x88aaff, 1.2);
    spotlight.position.set(5, 8, 5);
    scene.add(spotlight);

    const fridgeGroup = new THREE.Group();
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x2e313a, roughness: 0.4, metalness: 0.2 });
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x3b3f4c, roughness: 0.3, metalness: 0.3, emissive: 0x5fa8ff, emissiveIntensity: 0.2 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 1.6), bodyMaterial);
    body.position.y = 1.5;
    fridgeGroup.add(body);

    const door = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.6, 1.4), doorMaterial);
    door.position.set(0, 1.4, 0.1);
    fridgeGroup.add(door);

    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.3, 0.1), new THREE.MeshStandardMaterial({ color: 0xcbd4ff, metalness: 0.7, roughness: 0.2 }));
    handle.position.set(0.75, 1.4, 0.85);
    fridgeGroup.add(handle);

    scene.add(fridgeGroup);

    let glowTarget = 0.2;
    const card = canvas.closest('.project-card');
    if (card) {
        card.addEventListener('mouseenter', () => {
            glowTarget = 1.1;
        });
        card.addEventListener('mouseleave', () => {
            glowTarget = 0.2;
        });
    }

    const animate = () => {
        fridgeGroup.rotation.y += 0.003;
        doorMaterial.emissiveIntensity += (glowTarget - doorMaterial.emissiveIntensity) * 0.08;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();

    const resizeObserver = new ResizeObserver(() => {
        const { clientWidth, clientHeight } = canvas;
        renderer.setSize(clientWidth, clientHeight);
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
    });
    resizeObserver.observe(canvas);
}

function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (event) => {
            const rect = button.getBoundingClientRect();
            const strength = 20;
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength;
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength;
            button.style.transform = `translate(${x}px, ${y}px)`;
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

function initSidebarNavigation() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    sidebar.addEventListener('mouseenter', () => sidebar.classList.add('is-expanded'));
    sidebar.addEventListener('mouseleave', () => sidebar.classList.remove('is-expanded'));
}

function initGlitchTransitions() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.add('is-transitioning');
            setTimeout(() => document.body.classList.remove('is-transitioning'), 600);
        });
    });
}
