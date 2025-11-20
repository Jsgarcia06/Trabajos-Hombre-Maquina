import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const escena = new THREE.Scene();
escena.background = new THREE.Color(0xffe6ea); 
escena.fog = new THREE.Fog(0xffe6ea, 5, 30);

const camara = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camara.position.set(10, 7, 10); 
camara.lookAt(0, 0, 0);

const renderizador = new THREE.WebGLRenderer({ antialias: true });
renderizador.setSize(window.innerWidth, window.innerHeight);
renderizador.shadowMap.enabled = true;
renderizador.shadowMap.type = THREE.PCFSoftShadowMap; 
document.body.appendChild(renderizador.domElement);

const controles = new OrbitControls(camara, renderizador.domElement);
controles.enableDamping = true; 
controles.maxPolarAngle = Math.PI / 2.1;


const matSuelo = new THREE.MeshStandardMaterial({ color: 0xEeb7b4, roughness: 0.8 });
const matPared = new THREE.MeshStandardMaterial({ color: 0xFFC0CB, side: THREE.DoubleSide });
const matBlanco = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
const matOscuro = new THREE.MeshStandardMaterial({ color: 0x444444 });
const matColchon = new THREE.MeshStandardMaterial({ color: 0xD87093 }); 
const matAlfombra = new THREE.MeshStandardMaterial({ color: 0xFF69B4, roughness: 1 });
const matVidrio = new THREE.MeshStandardMaterial({ 
    color: 0x88CCFF, 
    transparent: true, 
    opacity: 0.6, 
    emissive: 0x004488, 
    emissiveIntensity: 0.2 
});


const matPoster1 = new THREE.MeshStandardMaterial({ color: 0xFFD700 });
const matPoster2 = new THREE.MeshStandardMaterial({ color: 0x00CED1 }); 
const matMaderaClara = new THREE.MeshStandardMaterial({ color: 0xD2B48C, roughness: 0.7 }); 
const matLibro = new THREE.MeshStandardMaterial({ color: 0x8B0000 }); 
const matCaraReloj = new THREE.MeshStandardMaterial({ color: 0xEEEEEE }); 
const matManecillas = new THREE.MeshStandardMaterial({ color: 0x333333 }); 
const matFlorero = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.2 }); 
const matPlantaVerde = new THREE.MeshStandardMaterial({ color: 0x228B22 }); 
const matFlor = new THREE.MeshStandardMaterial({ color: 0xFF1493 }); 




const suelo = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), matSuelo);
suelo.rotation.x = -Math.PI / 2;
suelo.receiveShadow = true;
escena.add(suelo);


const grupoParedes = new THREE.Group();
const paredTrasera = new THREE.Mesh(new THREE.PlaneGeometry(12, 5), matPared);
paredTrasera.position.set(0, 2.5, -6);
paredTrasera.receiveShadow = true;
grupoParedes.add(paredTrasera);

const paredIzquierda = new THREE.Mesh(new THREE.PlaneGeometry(12, 5), matPared);
paredIzquierda.rotation.y = Math.PI / 2;
paredIzquierda.position.set(-6, 2.5, 0);
paredIzquierda.receiveShadow = true;
grupoParedes.add(paredIzquierda);
escena.add(grupoParedes);


function crearCaja(ancho, alto, prof, material, x, y, z, padre, generarSombra = true) {
    const malla = new THREE.Mesh(new THREE.BoxGeometry(ancho, alto, prof), material);
    malla.position.set(x, y, z);
    malla.castShadow = generarSombra;
    malla.receiveShadow = true;
    padre.add(malla);
    return malla;
}




const grupoVentana = new THREE.Group();
crearCaja(2.2, 1.7, 0.1, matBlanco, 0, 0, 0, grupoVentana); 
const vidrio = new THREE.Mesh(new THREE.PlaneGeometry(2, 1.5), matVidrio);
vidrio.position.z = 0.06;
grupoVentana.add(vidrio);
grupoVentana.position.set(2, 3, -5.95);
escena.add(grupoVentana);


const grupoPuerta = new THREE.Group();
crearCaja(0.1, 3.6, 2.2, matBlanco, 0, 1.8, 0, grupoPuerta); 
crearCaja(0.05, 3.5, 2, matSuelo, 0, 1.75, 0, grupoPuerta); 
const manija = new THREE.Mesh(new THREE.SphereGeometry(0.08), matOscuro);
manija.position.set(0.08, 1.7, 0.8);
grupoPuerta.add(manija);
grupoPuerta.position.set(-5.95, 0, 3);
escena.add(grupoPuerta);


const geoAlfombra = new THREE.CircleGeometry(2, 32);
const alfombra = new THREE.Mesh(geoAlfombra, matAlfombra);
alfombra.rotation.x = -Math.PI / 2;
alfombra.position.set(0, 0.01, 0);
alfombra.receiveShadow = true;
escena.add(alfombra);


const geoPoster = new THREE.BoxGeometry(0.8, 1.2, 0.05);
const poster1 = new THREE.Mesh(geoPoster, matPoster1);
poster1.position.set(-3.5, 3, -5.95);
escena.add(poster1);

const poster2 = new THREE.Mesh(geoPoster, matPoster2);
poster2.position.set(-2, 3.2, -5.95);
poster2.rotation.z = -0.1;
escena.add(poster2);


const grupoRelojPared = new THREE.Group();
const caraReloj = new THREE.Mesh(new THREE.CircleGeometry(0.5, 32), matCaraReloj);
crearCaja(0.5, 0.05, 0.05, matManecillas, 0, 0, 0.03, grupoRelojPared); 
crearCaja(0.7, 0.05, 0.05, matManecillas, 0, 0, 0.03, grupoRelojPared); 

grupoRelojPared.add(caraReloj);
grupoRelojPared.position.set(-5.9, 3.5, -3);
grupoRelojPared.rotation.y = Math.PI / 2;
escena.add(grupoRelojPared);




const grupoCama = new THREE.Group();
crearCaja(3.2, 0.6, 4.2, matBlanco, 0, 0.3, 0, grupoCama); 
crearCaja(3, 0.4, 4, matColchon, 0, 0.8, 0, grupoCama); 
crearCaja(3.2, 1.5, 0.2, matBlanco, 0, 0.75, -2.1, grupoCama); 
crearCaja(1, 0.2, 0.6, matBlanco, -0.8, 1.1, -1.6, grupoCama); 
crearCaja(1, 0.2, 0.6, matBlanco, 0.8, 1.1, -1.6, grupoCama); 
grupoCama.position.set(-4.3, 0, -3.7);
escena.add(grupoCama);


const grupoArmario = new THREE.Group();
crearCaja(2, 3.5, 1, matBlanco, 0, 1.75, 0, grupoArmario);
crearCaja(0.05, 3.4, 0.02, matOscuro, 0, 1.75, 0.51, grupoArmario);
grupoArmario.rotation.y = Math.PI / 2;
grupoArmario.position.set(-5.4, 0, 0.5);
escena.add(grupoArmario);


const grupoEscritorio = new THREE.Group();
crearCaja(3, 0.1, 1.2, matBlanco, 0, 1.2, 0, grupoEscritorio); 
crearCaja(0.1, 1.2, 1, matBlanco, -1.3, 0.6, 0, grupoEscritorio);
crearCaja(0.1, 1.2, 1, matBlanco, 1.3, 0.6, 0, grupoEscritorio);

crearCaja(0.8, 0.5, 0.05, matOscuro, 0, 1.6, -0.3, grupoEscritorio);
crearCaja(0.2, 0.4, 0.05, matOscuro, 0, 1.2, -0.35, grupoEscritorio); 
grupoEscritorio.position.set(3, 0, -5.4);
escena.add(grupoEscritorio);


const grupoSilla = new THREE.Group();
crearCaja(0.7, 0.1, 0.7, matOscuro, 0, 0.7, 0, grupoSilla);
crearCaja(0.7, 1, 0.1, matOscuro, 0, 1.2, 0.3, grupoSilla);
crearCaja(0.1, 0.7, 0.1, matOscuro, 0, 0.35, 0, grupoSilla);
grupoSilla.position.set(3, 0, -4.2);
grupoSilla.rotation.y = -Math.PI / 4;
escena.add(grupoSilla);


const grupoMesitaNoche = new THREE.Group();
crearCaja(1, 1, 1, matMaderaClara, 0, 0.6, 0, grupoMesitaNoche); 
crearCaja(0.9, 1, 0.9, matMaderaClara, 0, 0.3, 0, grupoMesitaNoche);


const vasoMesa = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.2, 16), matCaraReloj);
vasoMesa.position.set(-0.3, 1.2, 0);
grupoMesitaNoche.add(vasoMesa);
crearCaja(0.02, 0.08, 0.02, matManecillas, -0.3, 0.9, 0.05, grupoMesitaNoche); 

grupoMesitaNoche.position.set(-1.2, 0.2, -5.5); 
escena.add(grupoMesitaNoche);


const grupoBiblioteca = new THREE.Group();
crearCaja(0.8, 3, 0.3, matMaderaClara, 0, 1.5, 0, grupoBiblioteca); 


const numEstantes = 4;
const altoEstante = 3 / (numEstantes + 1);
for(let i = 0; i < numEstantes; i++) {
    crearCaja(0.7, 0.05, 0.25, matMaderaClara, 0, altoEstante * (i + 1) - 0.1, 0.02, grupoBiblioteca);
}

grupoBiblioteca.position.set(-1, 0, 5.8); 
escena.add(grupoBiblioteca);


const grupoFlorero = new THREE.Group();
const geoFlorero = new THREE.CylinderGeometry(0.3, 0.25, 0.8, 32);
const florero = new THREE.Mesh(geoFlorero, matFlorero);
florero.position.y = 0.4;
florero.castShadow = true;
grupoFlorero.add(florero);

const tallo = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.8, 8), matPlantaVerde);
tallo.position.y = 0.8;
grupoFlorero.add(tallo);

const hoja1 = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.3, 32), matPlantaVerde);
hoja1.position.set(0.1, 0.9, 0);
hoja1.rotation.z = -0.5;
grupoFlorero.add(hoja1);

const hoja2 = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.3, 32), matPlantaVerde);
hoja2.position.set(-0.1, 0.8, 0);
hoja2.rotation.z = 0.5;
grupoFlorero.add(hoja2);

const flor = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), matFlor);
flor.position.y = 1.2;
grupoFlorero.add(flor);

grupoFlorero.position.set(-5.5, 0, 5.5);
escena.add(grupoFlorero);



const luzAmbiental = new THREE.AmbientLight(0xffffff, 0.3);
escena.add(luzAmbiental);

const luzSolar = new THREE.DirectionalLight(0xffeedd, 1.5);
luzSolar.position.set(5, 5, -10);
luzSolar.castShadow = true;
luzSolar.shadow.mapSize.width = 2048;
luzSolar.shadow.mapSize.height = 2048;
escena.add(luzSolar);


const grupoLampara = new THREE.Group();
const baseLampara = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.05), matOscuro);
const posteLampara = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.6), matOscuro);
posteLampara.position.y = 0.3;
const pantallaLampara = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.3, 32, 1, true), new THREE.MeshStandardMaterial({color: 0xFF69B4, side: THREE.DoubleSide}));
pantallaLampara.position.set(0, 0.6, 0);

grupoLampara.add(baseLampara, posteLampara, pantallaLampara);
grupoLampara.position.set(1.2, 1.25, -0.3);
grupoEscritorio.add(grupoLampara);

const luzEscritorio = new THREE.SpotLight(0xffaaee, 10);
luzEscritorio.position.set(0, 0.5, 0);
luzEscritorio.target.position.set(0, 0, 0);
luzEscritorio.angle = Math.PI / 6;
luzEscritorio.penumbra = 0.3;
luzEscritorio.castShadow = true;
grupoLampara.add(luzEscritorio);
grupoLampara.add(luzEscritorio.target);


function animar() {
    requestAnimationFrame(animar);
    controles.update();
    renderizador.render(escena, camara);
}


window.addEventListener('resize', () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
});

animar();