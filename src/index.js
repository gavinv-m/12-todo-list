import  './style.css';
import { addImages } from './add-images.js';
import { setupClickEventListeners } from './button-handlers';

document.addEventListener("DOMContentLoaded", () => {
    addImages();
    setupClickEventListeners();
});




