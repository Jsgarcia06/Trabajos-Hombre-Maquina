
let scenes = {};
let objects = {};

window.onload = function() {
    initCube();
    initSphere();
    initCylinder();
    animate();
};


function initCube() {
    const container = document.getElementById('cube-container');
    

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);
    

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x3498db,
        wireframe: false
    });
    

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    

    scenes.cube = { scene, camera, renderer };
    objects.cube = cube;
    

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}


function initSphere() {
    const container = document.getElementById('sphere-container');
    

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    

    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xe74c3c,
        wireframe: false
    });
    

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    

    scenes.sphere = { scene, camera, renderer };
    objects.sphere = sphere;
    

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

function initCylinder() {
    const container = document.getElementById('cylinder-container');
    

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);
    

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    

    const geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x9b59b6,
        wireframe: false
    });
    

    const cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);
    

    scenes.cylinder = { scene, camera, renderer };
    objects.cylinder = cylinder;
    

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}


function animate() {
    requestAnimationFrame(animate);
    

    if (objects.cube) {
        objects.cube.rotation.x += 0.01;
        objects.cube.rotation.y += 0.01;
        scenes.cube.renderer.render(scenes.cube.scene, scenes.cube.camera);
    }
    

    if (objects.sphere) {
        objects.sphere.rotation.x += 0.01;
        objects.sphere.rotation.y += 0.01;
        scenes.sphere.renderer.render(scenes.sphere.scene, scenes.sphere.camera);
    }
    

    if (objects.cylinder) {
        objects.cylinder.rotation.x += 0.01;
        objects.cylinder.rotation.y += 0.01;
        scenes.cylinder.renderer.render(scenes.cylinder.scene, scenes.cylinder.camera);
    }
}