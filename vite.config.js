// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Вказуємо відносний шлях, це найпростіший варіант для GitHub Pages
  // Або, якщо у вас репозиторій "my-awesome-project", тоді:
  // base: '/my-awesome-project/',
  build: {
    outDir: 'dist', // Це папка, куди Vite збере збірку
  },
  // Якщо у вас є інші налаштування Vite, додайте їх сюди
});