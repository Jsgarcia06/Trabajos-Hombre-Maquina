// Variables del juego
let score = 0;
let timeLeft = 60;
let gameActive = true;
let cube = null;
let timeInterval;

// Configuración de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Añadir luces para mejor visualización
const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Crear un solo cubo
function createCube() {
    // Eliminar cubo existente si hay uno
    if (cube) {
        scene.remove(cube);
    }
    
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5)
    });
    cube = new THREE.Mesh(geometry, material);
    
    // Posición aleatoria
    cube.position.x = (Math.random() - 0.5) * 40;
    cube.position.y = (Math.random() - 0.5) * 40;
    cube.position.z = (Math.random() - 0.5) * 20;
    
    // Velocidades aleatorias
    cube.speedX = (Math.random() - 0.5) * 0.02;
    cube.speedY = (Math.random() - 0.5) * 0.02;
    cube.speedZ = (Math.random() - 0.5) * 0.02;
    cube.rotationSpeedY = (Math.random() - 0.5) * 0.01;
    
    scene.add(cube);
}

// Inicializar cubo
createCube();

// Configurar raycaster para detección de clics
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Configurar cámara
camera.position.z = 50;

// Configurar temporizador
function startTimer() {
    timeInterval = setInterval(() => {
        if (gameActive) {
            timeLeft--;
            document.getElementById('timer').textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }
    }, 1000);
}

// Finalizar juego
function endGame() {
    gameActive = false;
    clearInterval(timeInterval);
    
    document.getElementById('final-score').textContent = score;
    document.getElementById('game-over').style.display = 'block';
}

// Reiniciar juego
document.getElementById('restart-btn').addEventListener('click', () => {
    score = 0;
    timeLeft = 60;
    gameActive = true;
    
    document.getElementById('score').textContent = '0';
    document.getElementById('timer').textContent = '60';
    document.getElementById('game-over').style.display = 'none';
    
    createCube();
    startTimer();
});

// Detectar movimiento del ratón
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('mousemove', onMouseMove, false);

// Detectar clic del ratón
window.addEventListener('click', (event) => {
    if (!gameActive || !cube) return;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);
    
    if (intersects.length > 0) {
        // Añadir puntuación
        score += 10;
        document.getElementById('score').textContent = score;
        
        // Crear nuevo cubo en posición aleatoria
        createCube();
    }
});

// Iniciar temporizador
startTimer();

// Función de animación
function animate() {
    if (cube && gameActive) {
        // Movimiento
        cube.position.x += cube.speedX;
        cube.position.y += cube.speedY;
        cube.position.z += cube.speedZ;
        
        // Rotación solo en Y
        cube.rotation.y += cube.rotationSpeedY;
        
        // Rebotar en los bordes
        if (Math.abs(cube.position.x) > 25) cube.speedX *= -1;
        if (Math.abs(cube.position.y) > 25) cube.speedY *= -1;
        if (Math.abs(cube.position.z) > 15) cube.speedZ *= -1;
    }
    
    renderer.render(scene, camera);
}

// Ajustar tamaño al redimensionar ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});