import './styles/style.css';
import './styles/tasks.css';
import { addImages } from './interface/add-images.js';
import { setupClickEventListeners } from './interface/button-handlers.js';
import { setUpDueDatesEventListeners } from './interface/due-dates-handlers.js';
import { displayDefaultTaks } from './interface/default-tasks.js';
import { displayNumberOfTasks } from './interface/number-of-tasks.js';

document.addEventListener("DOMContentLoaded", () => {
    addImages();
    setUpDueDatesEventListeners();
    setupClickEventListeners();
    displayDefaultTaks();
    displayNumberOfTasks(); 

});




