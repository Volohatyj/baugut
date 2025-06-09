// src/js/renderer.js

import * as THREE from 'three';

export function initRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true, precision: 'highp' });
    renderer.setSize(960, 600);
    renderer.outputColorSpace = THREE.SRGBColorSpace; // для налаштування PMREM
    renderer.toneMapping = THREE.LinearToneMapping; // Налаштування тонової компресії
    renderer.toneMappingExposure = 1; // Експозиція
    renderer.physicallyCorrectLights = true; // Фізично коректне освітлення

    // Не забудь увімкнути тіні на рендерері десь в основному файлі:
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement); // Додаємо рендер до DOM
    return renderer;
}
