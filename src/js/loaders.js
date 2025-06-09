import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Функція завантаження GLTF моделі
export function loadGLTFModel(path, onLoad, onProgress, onError) {
    const loader = new GLTFLoader();

    loader.load(
        path, 
        (gltf) => {
            console.log(`Модель з ${path} успішно завантажена.`);
            onLoad(gltf); // Передаємо завантажену модель у callback
        },
        (xhr) => {
            if (onProgress) {
                onProgress(xhr.loaded / xhr.total); // Викликаємо callback для оновлення прогресу
            } else {
                console.log(`${(xhr.loaded / xhr.total * 100).toFixed(2)}% завантажено`);
            }
        },
        (error) => {
            console.error(`Помилка завантаження GLTF моделі з ${path}:`, error);
            if (onError) onError(error); // Викликаємо callback помилки, якщо заданий
        }
    );
}


import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export function loadOBJModel(path) {
    return new Promise((resolve, reject) => {
        const loader = new OBJLoader();

        loader.load(
            path,
            (object) => {
                resolve(object); // Успішно завантажено
            },
            undefined, // Опціонально: функція для відстеження прогресу
            (error) => {
                reject(error); // Помилка завантаження
            }
        );
    });
}
