// Información para los objetos
const objectInfoData = {
    dice: {
        title: "Dados - El Azar Engañoso",
        description: "Los dados representan el azar y la ilusión de control. En los juegos de azar, cada tirada es independiente, pero la mente del jugador a menudo busca patrones donde no los hay.",
        info: "La aleatoriedad de los dados puede crear una falsa sensación de control. Los jugadores pueden creer que tienen 'suerte' o 'mala suerte', lo que refuerza el comportamiento adictivo."
    },
    card: {
        title: "Cartas - La Ilusión de Habilidad",
        description: "Los juegos de cartas pueden crear la falsa impresión de que la habilidad del jugador influye en el resultado, cuando en realidad el azar es el factor determinante.",
        info: "Esta ilusión de control puede llevar a los jugadores a sobreestimar sus posibilidades de ganar, aumentando el riesgo de desarrollar adicción."
    },
    slot: {
        title: "Tragamonedas - El Engaño Visual",
        description: "Las tragamonedas están diseñadas para proporcionar recompensas intermitentes que activan el sistema de recompensa del cerebro, similar a las drogas adictivas.",
        info: "Los sonidos, luces y 'casi ganancias' en las tragamonedas están cuidadosamente diseñados para mantener a los jugadores en un estado de excitación constante."
    },
    online: {
        title: "Casinos Online - Accesibilidad Peligrosa",
        description: "Los casinos online han hecho que el juego sea accesible 24/7 desde cualquier lugar, eliminando barreras físicas y aumentando exponencialmente el riesgo de adicción.",
        info: "La facilidad de acceso y el anonimato de los casinos online pueden llevar a sesiones de juego prolongadas y pérdidas financieras significativas sin la conciencia del paso del tiempo."
    }
};

// Variables para el arrastre de objetos
let isDragging = false;
let currentObject = null;
let initialX, initialY;
let initialTransform;

// Navegación por puntos 
const navDots = document.querySelectorAll('.nav-dot');
const sections = document.querySelectorAll('section');

// Función para actualizar puntos de navegación
function updateNavDots() {
    let currentSection = '';
    const scrollPosition = window.scrollY + (window.innerHeight / 3);
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === currentSection) {
            dot.classList.add('active');
        }
    });
}

// Navegación al hacer clic en puntos
navDots.forEach(dot => {
    dot.addEventListener('click', function() {
        const targetSection = this.getAttribute('data-section');
        const targetElement = document.getElementById(targetSection);
        
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Actualizar puntos al hacer scroll
window.addEventListener('scroll', updateNavDots);
// Actualizar puntos al cargar la página
window.addEventListener('load', updateNavDots);
// Actualizar puntos al cambiar el tamaño de la ventana
window.addEventListener('resize', updateNavDots);

// Modal functionality
const modal = document.getElementById('info-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const objectInfo = document.getElementById('object-info');
const closeModal = document.querySelector('.close-modal');

// Mostrar información del objeto en el modal
function showObjectInfo(objectType) {
    const info = objectInfoData[objectType];
    
    if (info) {
        modalTitle.textContent = info.title;
        modalDescription.textContent = info.description;
        objectInfo.innerHTML = `<p><span class="highlight">Consejo:</span> ${info.info}</p>`;
        modal.style.display = 'flex';
    }
}

// Cerrar modal
function closeModalFunc() {
    modal.style.display = 'none';
}

closeModal.addEventListener('click', closeModalFunc);
modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModalFunc();
});

// Funcionalidad de arrastre para objetos 3D
function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    currentObject = this;
    
    // Guardar posición inicial
    initialX = e.clientX || e.touches[0].clientX;
    initialY = e.clientY || e.touches[0].clientY;
    initialTransform = currentObject.style.transform;
    
    // Cambiar cursor
    currentObject.style.cursor = 'grabbing';
    
    // Agregar eventos de movimiento y fin de arrastre
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', stopDrag);
}

function drag(e) {
    if (!isDragging || !currentObject) return;
    
    // Calcular diferencia de movimiento
    const currentX = e.clientX || e.touches[0].clientX;
    const currentY = e.clientY || e.touches[0].clientY;
    const deltaX = currentX - initialX;
    const deltaY = currentY - initialY;
    
    // Aplicar transformación
    const rotationY = deltaX * 0.5;
    const rotationX = -deltaY * 0.5;
    
    // Mantener la traslación Z original y agregar rotación
    const translateZMatch = initialTransform.match(/translateZ\(([^)]+)\)/);
    const translateZ = translateZMatch ? translateZMatch[1] : '100px';
    
    currentObject.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) translateZ(${translateZ})`;
}

function stopDrag() {
    if (!isDragging || !currentObject) return;
    
    isDragging = false;
    currentObject.style.cursor = 'grab';
    
    // Aplicar transición suave para volver a la posición inicial
    currentObject.style.transition = 'transform 1s ease';
    currentObject.style.transform = initialTransform;
    
    // Remover la transición después de que termine la animación
    setTimeout(() => {
        if (currentObject) {
            currentObject.style.transition = '';
        }
    }, 1000);
    
    currentObject = null;
    
    // Remover eventos
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('touchend', stopDrag);
}

// Agregar eventos a los objetos 3D
const objects = document.querySelectorAll('.banner-3d .object');
objects.forEach(object => {
    // Evento de clic para mostrar información
    object.addEventListener('click', function(e) {
        // Si estamos arrastrando, no mostrar modal
        if (isDragging) return;
        
        const objectType = this.getAttribute('data-type');
        showObjectInfo(objectType);
        
        // Animación adicional para cada tipo de objeto
        if (objectType === 'dice') {
            this.style.transition = 'transform 1s';
            this.style.transform = this.style.transform.replace(/rotateX\([^)]+\) rotateY\([^)]+\)/, 
                `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`);
            
            setTimeout(() => {
                this.style.transition = '';
            }, 1000);
        } else if (objectType === 'card') {
            this.classList.toggle('flipped');
        }
        // Eliminadas las animaciones para slot y online
    });
    
    // Eventos de arrastre
    object.addEventListener('mousedown', startDrag);
    object.addEventListener('touchstart', startDrag);
});

// Crear partículas flotantes
function createParticles(containerId, count) {
    const container = document.getElementById(containerId);
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Tamaño aleatorio entre 2px y 8px
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        
        // Animación con duración aleatoria
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Retraso aleatorio
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
    }
}

// Inicializar partículas para cada sección
createParticles('particles-1', 30);
createParticles('particles-2', 25);
createParticles('particles-3', 20);
createParticles('particles-4', 15);