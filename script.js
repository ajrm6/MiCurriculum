// Configuración de Particles.js para un fondo interactivo y dinámico
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": ["#00f2fe", "#4facfe", "#66FCF1"]
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#00f2fe",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// Navegación (Sticky y Menú Móvil)
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Integración Dinámica con GitHub API
// Obteniendo proyectos públicos del usuario ajrm6
async function fetchGitHubProjects() {
    const username = 'ajrm6';
    const portfolioGrid = document.getElementById('github-projects');
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
        if (!response.ok) throw new Error('Error fetching repos');
        
        const repos = await response.json();
        
        // Remove static placeholders once dynamic data is loaded
        // (Optional: you can keep them if you want, here we append the dynamic ones)
        
        repos.forEach(repo => {
            if (!repo.fork) { // Omitir forks si lo deseas
                const card = document.createElement('div');
                card.className = 'project-card glass-card';
                
                // Generar un ícono aleatorio basado en el nombre del repo o lenguajes
                let iconClass = 'fa-code';
                if(repo.language === 'Python') iconClass = 'fa-python fab';
                if(repo.language === 'JavaScript' || repo.language === 'TypeScript') iconClass = 'fa-js fab';
                if(repo.language === 'Java') iconClass = 'fa-java fab';
                if(repo.language === 'HTML') iconClass = 'fa-html5 fab';

                card.innerHTML = `
                    <div class="project-img"><i class="${iconClass}"></i></div>
                    <div class="project-info">
                        <h3>${repo.name.replace(/-/g, ' ')}</h3>
                        <p>${repo.description || 'Sin descripción disponible.'}</p>
                        <div style="margin-bottom: 1rem; font-size: 0.85rem; color: var(--primary);">
                            <i class="fas fa-circle"></i> ${repo.language || 'Code'}
                            <i class="fas fa-star" style="margin-left: 10px;"></i> ${repo.stargazers_count}
                        </div>
                        <a href="${repo.html_url}" target="_blank" class="btn btn-small">Ver en GitHub <i class="fab fa-github"></i></a>
                    </div>
                `;
                portfolioGrid.appendChild(card);
            }
        });

    } catch (error) {
        console.error('No se pudieron cargar los repositorios de GitHub:', error);
    }
}

// Inicializar la carga de proyectos
document.addEventListener('DOMContentLoaded', fetchGitHubProjects);
