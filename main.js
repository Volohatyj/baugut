import * as THREE from 'three';
import { initCamera } from './src/js/camera.js'; // Імпортуємо камеру
import { initRenderer } from './src/js/renderer.js'; // Імпортуємо рендерер
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { initScene } from './src/js/scene.js'; // Імпортуємо ініціалізацію сцени
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
const loader = new GLTFLoader(); // Ось де ви оголошуєте та ініціалізуєте 'loader'


// Рендерер
const renderer = initRenderer();

// Ініціалізація сцени
const scene = initScene();

// Ініціалізація камери через імпортовану функцію
const camera = initCamera();


// Положення точки обертання камери в сцені 3ds Max
const cameraTargetMaxPosition = {
    x: 4602.723,
    y: 4508.343,
    z: 1668.936
};

const cameraTargetPosition = {
    x: 0,
    y: 0.8,
    z: 0
};


// Додаємо OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Додаємо інерцію руху
controls.dampingFactor = 0.05; // Фактор інерції
controls.target.set(cameraTargetPosition.x, cameraTargetPosition.y, cameraTargetPosition.z); // Центр обертання камери (положення моделі)
controls.maxPolarAngle = Math.PI / 2 + 0.1; 

const dirLight = new THREE.DirectionalLight( 0xff6000, 0.5);
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( 2, 2, 1.2);
dirLight.position.multiplyScalar( 30 );
scene.add( dirLight );

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 4096;
dirLight.shadow.mapSize.height = 4096;
dirLight.shadow.intensity = 6;

const d = 100;

dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;

dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = - 0.0001;

const dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 10 );
// scene.add( dirLightHelper );

// const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xbababa, 1 );
// hemiLight.position.set( 0, 100, 0 );
// scene.add( hemiLight );
// const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
// scene.add( hemiLightHelper );

const gltfLoader = new GLTFLoader();

gltfLoader.load('./src/assets/glb/baugutEnv.glb', (gltf) => {
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = false;
            child.receiveShadow = false;
        }
    });

    scene.add(gltf.scene);
});

// const tableLoader = new GLTFLoader();
gltfLoader.load('./src/assets/glb/baugutSite.glb', (gltf) => {
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(gltf.scene);
});

const model = gltfLoader.load('./src/assets/glb/wohncontainer-h_9x3.glb', (gltf) => {
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(gltf.scene);
});

// Це примушує матеріали об'єктів оновитися і врахувати нове scene.environment.
scene.traverse((object) => {
    if (object.isMesh && object.material) {
        // Якщо матеріал є масивом (наприклад, для складних моделей)
        if (Array.isArray(object.material)) {
            object.material.forEach(m => {
                if (m.isMeshStandardMaterial || m.isMeshPhysicalMaterial) {
                    m.needsUpdate = true;
                }
            });
        } else {
            // Якщо це єдиний матеріал
            if (object.material.isMeshStandardMaterial || object.material.isMeshPhysicalMaterial) {
                object.material.needsUpdate = true;
            }
        }
    }
});
  


// -- ОБМЕЖЕННЯ ПОЗИЦІЇ КАМЕРИ --
const cameraMinX = -20;
const cameraMaxX = 20;
const cameraMinY = 0.1;
const cameraMaxY = 20;
const cameraMinZ = -20;
const cameraMaxZ = 20; 



// Рендер сцени в циклі
function animate() {
    requestAnimationFrame(animate); // Циклічний виклик
    controls.update(); // Оновлюємо контроллер

    // 2. Застосовуємо обмеження до позиції камери після її оновлення контролерами
    camera.position.x = Math.max(cameraMinX, Math.min(cameraMaxX, camera.position.x));
    camera.position.y = Math.max(cameraMinY, Math.min(cameraMaxY, camera.position.y));
    camera.position.z = Math.max(cameraMinZ, Math.min(cameraMaxZ, camera.position.z));

    renderer.render(scene, camera); // Рендеринг сцени
}
animate();
