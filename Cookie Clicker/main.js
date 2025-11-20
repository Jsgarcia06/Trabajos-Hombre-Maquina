const hero = document.getElementById("hero");
const floatingTexts = document.getElementById("floatingTexts");
const particles = document.getElementById("particles");


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a1a);

const camera = new THREE.PerspectiveCamera(75, hero.clientWidth / hero.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setSize(hero.clientWidth, hero.clientHeight);
renderer.setAnimationLoop(animate);
hero.appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x4dffea, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);


const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
const material = new THREE.MeshPhongMaterial({ 
    color: 0x19ff3f,
    shininess: 100,
    specular: 0x222222
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


const glowGeometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);
const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffaa,
    transparent: true,
    opacity: 0.2,
    side: THREE.BackSide
});
const glowCube = new THREE.Mesh(glowGeometry, glowMaterial);
cube.add(glowCube);

camera.position.z = 5;


let score = 0;
let perClick = 1;
let totalClicks = 0;

const upgrades = [
  { name: 'Click Simple', cost: 10, type: 'add', value: 1, owned: 0, icon: '+' },
  { name: 'Multiplicador', cost: 50, type: 'mult', value: 2, owned: 0, icon: '×2' },
  { name: 'Click Potente', cost: 200, type: 'add', value: 10, owned: 0, icon: '++' },
  { name: 'Multiplicador Épico', cost: 1000, type: 'mult', value: 2, owned: 0, icon: '★' }
];


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


function createFloatingText(x, y, value) {
    const text = document.createElement('div');
    text.className = 'floating-text';
    text.textContent = `+${value}`;
    text.style.left = `${x}px`;
    text.style.top = `${y}px`;
    floatingTexts.appendChild(text);
    

    setTimeout(() => {
        if (text.parentNode) {
            text.parentNode.removeChild(text);
        }
    }, 1500);
}


function createParticles(x, y, count = 8) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        

        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        particles.appendChild(particle);
        

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}


function createGlow(x, y) {
    const glow = document.createElement('div');
    glow.className = 'glow';
    glow.style.left = `${x - 50}px`;
    glow.style.top = `${y - 50}px`;
    glow.style.width = '100px';
    glow.style.height = '100px';
    document.body.appendChild(glow);
    

    setTimeout(() => {
        if (glow.parentNode) {
            glow.parentNode.removeChild(glow);
        }
    }, 500);
}

function onClick(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);
    if (intersects.length > 0) {
        addScore(perClick);
        totalClicks++;
        

        cube.scale.set(1.3, 1.3, 1.3);
        cube.rotation.x += 0.2;
        cube.rotation.y += 0.2;
        

        setTimeout(() => cube.scale.set(1, 1, 1), 150);
        

        createFloatingText(event.clientX, event.clientY, perClick);
        createParticles(event.clientX, event.clientY);
        createGlow(event.clientX, event.clientY);
        

        if (totalClicks % 25 === 0) {
            material.color.setHex(Math.random() * 0xffffff);
        }
    }
}

renderer.domElement.addEventListener('mousedown', onClick);


const scoreEl = document.getElementById('score');
const perClickEl = document.getElementById('perClick');

function addScore(amount) {
    score += amount;
    score = Math.round(score);
    updateUI();
}

function updateUI() {
    scoreEl.textContent = score.toLocaleString();
    perClickEl.textContent = perClick;
    

    upgrades.forEach((u, i) => {
        const costEl = document.getElementById('cost' + i);
        const ownedEl = document.getElementById('owned' + i);
        
        costEl.textContent = u.cost.toLocaleString();
        ownedEl.textContent = 'x' + u.owned;
        
        const btn = document.getElementById('upg' + i);
        if (score >= u.cost) {
            btn.disabled = false;
            btn.classList.remove('disabled');
        } else {
            btn.disabled = true;
            btn.classList.add('disabled');
        }
    });
}


function buyUpgrade(i) {
    const u = upgrades[i];
    if (score >= u.cost) {
        score -= u.cost;
        u.owned += 1;
        

        if (u.type === 'add') {
            perClick += u.value;
        } else if (u.type === 'mult') {
            perClick *= u.value;
        }
        

        u.cost = Math.ceil(u.cost * 1.7);
        

        const btn = document.getElementById('upg' + i);
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);
        
        updateUI();
    }
}


upgrades.forEach((u, i) => {
    const btn = document.getElementById('upg' + i);
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        buyUpgrade(i);
    });
});


updateUI();


let time = 0;
function animate() {
    time += 0.01;
    

    cube.position.y = Math.sin(time) * 0.1;
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.008;
    

    glowCube.scale.set(
        1 + Math.sin(time * 2) * 0.05,
        1 + Math.sin(time * 2) * 0.05,
        1 + Math.sin(time * 2) * 0.05
    );
    
    renderer.render(scene, camera);
}


window.addEventListener('resize', () => {
    renderer.setSize(hero.clientWidth, hero.clientHeight);
    camera.aspect = hero.clientWidth / hero.clientHeight;
    camera.updateProjectionMatrix();
});


setInterval(() => {
    const gameData = {
        score,
        perClick,
        upgrades,
        totalClicks
    };
    localStorage.setItem('cookieBlockSave', JSON.stringify(gameData));
}, 30000);