import  './style.css';
import  { taskManager } from './todo-manager.js';
import { addImages } from './add-images.js';
import { setupClickEventListeners } from './button-handlers'; // Replace './yourModule.js' with the path to your module file


document.addEventListener("DOMContentLoaded", () => {
    setupClickEventListeners();
});


addImages();

