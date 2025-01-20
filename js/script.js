// Parçacık efekti için container oluştur
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    // 50 parçacık oluştur (sayıyı artırdım)
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

// Tek bir parçacık oluştur
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Rastgele pozisyon
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    
    // Rastgele boyut (6px - 12px) - boyutu artırdım
    const size = 6 + Math.random() * 6;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
    
    // Parçacık animasyonu bittiğinde yeniden konumlandır
    particle.addEventListener('animationend', () => {
        // Yeni pozisyon
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Animasyonu yeniden başlat
        particle.style.animation = 'none';
        particle.offsetHeight; // Reflow
        particle.style.animation = null;
    });
}

// Tema değiştiğinde parçacıkları kontrol et
function updateParticles() {
    const theme = document.documentElement.getAttribute('data-theme');
    const existingParticles = document.querySelector('.particles');
    
    if (theme === 'light') {
        if (!existingParticles) {
            createParticles();
        }
    } else {
        if (existingParticles) {
            existingParticles.remove();
        }
    }
}

// Tema değişikliğini dinle
document.addEventListener('themeChanged', updateParticles);

// Sayfa yüklendiğinde parçacıkları başlat
document.addEventListener('DOMContentLoaded', () => {
    // Mevcut temayı kontrol et ve parçacıkları başlat
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'light') {
        createParticles();
    }
});

// Pencere boyutu değiştiğinde parçacıkları yeniden konumlandır
window.addEventListener('resize', () => {
    const existingParticles = document.querySelector('.particles');
    if (existingParticles) {
        existingParticles.remove();
        createParticles();
    }
}); 