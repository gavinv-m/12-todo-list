import './styles/style.css';
import './styles/tasks.css';
import { addImages } from './interface/add-images.js';
import { setupClickEventListeners } from './interface/button-handlers.js';
import { setUpDueDatesEventListeners } from './interface/due-dates-handlers.js';
import { displayDefaultTaks } from './interface/default-tasks.js';

document.addEventListener("DOMContentLoaded", () => {
    addImages();
    setUpDueDatesEventListeners();
    setupClickEventListeners();
    displayDefaultTaks();
});




