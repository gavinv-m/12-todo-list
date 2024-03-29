import { sortProjectTasks } from './sort-project-tasks.js';
import { displayProjectTasks } from './display-project-tasks.js'; 

// Exports to index.js
export function setUpProjectEventListeners(event)  {

    const projectName = event.target.innerHTML; 

    const headingTitle = document.querySelector('.category');
    headingTitle.textContent = projectName;

    sortProjectTasks(projectName);
    displayProjectTasks(projectName); 
}

