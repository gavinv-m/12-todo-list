import  './style.css';
import  { taskManager } from './todo-manager.js';
import { addImages } from './add-images.js';
import { setupClickEventListeners } from "./button-handlers";


document.addEventListener("DOMContentLoaded", () => {
    setupClickEventListeners();
});


addImages();

