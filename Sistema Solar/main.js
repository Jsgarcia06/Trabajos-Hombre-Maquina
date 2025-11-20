const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// ACTIVAR SOMBRAS
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// --- SOL MEJORADO CON ILUMINACIÓN INTENSA ---
const sunGeometry = new THREE.SphereGeometry(15, 32, 16);

// Material del sol con emisión intensa
const sunMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffff00,
    emissive: 0xffff00, // Color de emisión amarillo intenso
    emissiveIntensity: 1.0 // Intensidad máxima de emisión
});

const sphereSol = new THREE.Mesh(sunGeometry, sunMaterial);
sphereSol.castShadow = false;
sphereSol.receiveShadow = false;
scene.add(sphereSol);

// --- LUZ PRINCIPAL DEL SOL MEJORADA ---
const sunLight = new THREE.PointLight(0xffffff, 3, 1000); 
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true;

// Configurar sombras para mejor calidad
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 1000;

scene.add(sunLight);

// --- LUZ AMBIENTAL PARA MEJORAR LA VISIBILIDAD ---
const ambientLight = new THREE.AmbientLight(0x333333, 0.3); // Luz ambiental suave
scene.add(ambientLight);

// --- EFECTO DE GLOW/BRillo alrededor del sol ---
// Crear un segundo sol más grande y transparente para efecto de halo
const sunGlowGeometry = new THREE.SphereGeometry(16, 32, 16);
const sunGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    transparent: true,
    opacity: 0.3,
    side: THREE.BackSide
});
const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
sphereSol.add(sunGlow); // Hacer que el glow siga al sol

// Helper opcional para depuración (puedes comentarlo después)
const lightHelper = new THREE.PointLightHelper(sunLight, 5);
scene.add(lightHelper);

// Planetas con tamaños y colores realistas
function planeta(mesh) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

const sphereMercurio = planeta(new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 16),
    new THREE.MeshStandardMaterial({ color: 0x8C7853 })
));
scene.add(sphereMercurio);

const sphereVenus = planeta(new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 32, 16),
    new THREE.MeshStandardMaterial({ color: 0xE6B87E })
));
scene.add(sphereVenus);

const sphereTierra = planeta(new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 16),
    new THREE.MeshStandardMaterial({ color: 0x00AE2F })
));
scene.add(sphereTierra);

const sphereMarte = planeta(new THREE.Mesh(
    new THREE.SphereGeometry(1.8, 32, 16),
    new THREE.MeshStandardMaterial({ color: 0xFF0000 })
));
scene.add(sphereMarte);

const sphereJupiter = planeta(new THREE.Mesh(
    new THREE.SphereGeometry(4, 32, 16),
    new THREE.MeshStandardMaterial({ color: 0xE0AA70 })
));
scene.add(sphereJupiter);

const sphereSaturno = planeta(new THREE.Mesh(
    new THREE.SphereGeometry(3.5, 32, 16),
    new THREE.MeshStandardMaterial({ color: 0xE4D191 })
));
scene.add(sphereSaturno);

const sphereUrano = planeta(new THREE.Mesh(
    new THREE.SphereGeometry(2.5, 32, 16),
    new THREE.MeshStandardMaterial({ color: 0x4FD0E7 })
));
scene.add(sphereUrano);

const sphereNeptuno = planeta(new THREE.Mesh(
    new THREE.SphereGeometry(2.5, 32, 16),
    new THREE.MeshStandardMaterial({ color: 0x4B70DD })
));
scene.add(sphereNeptuno);

// -------------------------
// LUNAS (CANTIDADES DISTINTAS)
// -------------------------

function crearLunas(cantidad, size, color) {
    let lunas = [];
    for (let i = 1; i <= cantidad; i++) {
        const luna = new THREE.Mesh(
            new THREE.SphereGeometry(size, 16, 16),
            new THREE.MeshStandardMaterial({ color })
        );
        luna.castShadow = true;
        luna.receiveShadow = true;
        scene.add(luna);

        lunas.push(luna);
    }
    return lunas;
}

// MERCURIO (0 lunas)
const lunasMercurio = [];

// VENUS (1 luna)
const lunasVenus = crearLunas(1, 0.4, 0xffffff);

// TIERRA (1 luna)
const lunasTierra = crearLunas(4, 0.5, 0xE2E3E3);

// MARTE (2 lunas)
const lunasMarte = crearLunas(3, 0.3, 0xAAAAAA);

// JÚPITER (3 lunas)
const lunasJupiter = crearLunas(5, 0.6, 0xCCCCCC);

// SATURNO (4 lunas)
const lunasSaturno = crearLunas(2, 0.5, 0xDDDDDD);

// URANO (1 luna)
const lunasUrano = crearLunas(7, 0.4, 0xffffff);

// NEPTUNO (2 lunas)
const lunasNeptuno = crearLunas(6, 0.4, 0xBBBBBB);

// Posición de la cámara
camera.position.z = 250;
sphereSol.position.x = 0;
sphereSol.position.y = 0;

// Variables de animación
var t = 0;

function animate() {
    // -------------------------
    // Mantengo TODAS TUS ANIMACIONES ORIGINALES
    // -------------------------

    sphereSol.rotation.y += 0.01;

    sphereMercurio.position.x = 30 * Math.cos(t * 4);
    sphereMercurio.position.y = 30 * Math.sin(t * 4);
    
    sphereVenus.position.x = 40 * Math.cos(t * 3);
    sphereVenus.position.y = 40 * Math.sin(t * 3);
    
    sphereTierra.position.x = 55 * Math.cos(t * 2);
    sphereTierra.position.y = 55 * Math.sin(t * 2);
    
    sphereMarte.position.x = 73 * Math.cos(t * 1.5);
    sphereMarte.position.y = 73 * Math.sin(t * 1.5);
    
    sphereJupiter.position.x = 85 * Math.cos(t * 0.8);
    sphereJupiter.position.y = 85 * Math.sin(t * 0.8);
    
    sphereSaturno.position.x = 104 * Math.cos(t * 0.6);
    sphereSaturno.position.y = 104 * Math.sin(t * 0.6);
    
    sphereUrano.position.x = 125 * Math.cos(t * 0.4);
    sphereUrano.position.y = 125 * Math.sin(t * 0.4);
    
    sphereNeptuno.position.x = 150 * Math.cos(t * 0.3);
    sphereNeptuno.position.y = 150 * Math.sin(t * 0.3);

    // -----------------------------------------------------
    // ÓRBITAS DE LUNAS — TODAS DISTINTAS Y NO REPETIDAS
    // -----------------------------------------------------

    function orbitarLunas(planet, lunas, baseDist, speed) {
        lunas.forEach((luna, i) => {
            const dist = baseDist + i * 3;
            luna.position.x = planet.position.x + dist * Math.cos(t * speed * (1 + i * 0.2));
            luna.position.y = planet.position.y + dist * Math.sin(t * speed * (1 + i * 0.2));
        });
    }

    orbitarLunas(sphereVenus, lunasVenus, 4, 4);
    orbitarLunas(sphereTierra, lunasTierra, 5, 6);
    orbitarLunas(sphereMarte, lunasMarte, 4, 5);
    orbitarLunas(sphereJupiter, lunasJupiter, 6, 3);
    orbitarLunas(sphereSaturno, lunasSaturno, 6, 2.5);
    orbitarLunas(sphereUrano, lunasUrano, 5, 4.5);
    orbitarLunas(sphereNeptuno, lunasNeptuno, 5, 3.5);

    // Mantengo tus rotaciones
    sphereMercurio.rotation.y += 0.01;
    sphereVenus.rotation.y += 0.008;
    sphereTierra.rotation.y += 0.02;
    sphereMarte.rotation.y += 0.015;
    sphereJupiter.rotation.y += 0.03;
    sphereSaturno.rotation.y += 0.025;
    sphereUrano.rotation.y += 0.01;
    sphereNeptuno.rotation.y += 0.01;

    t += 0.01;
    renderer.render(scene, camera);
}
