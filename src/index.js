import  './style.css';
import { addImages } from './add-images.js';
import { setupClickEventListeners } from './button-handlers';
import { setUpDueDatesEventListeners } from './due-dates-handlers.js';

document.addEventListener("DOMContentLoaded", () => {
    addImages();
    setUpDueDatesEventListeners();
    setupClickEventListeners();
});




