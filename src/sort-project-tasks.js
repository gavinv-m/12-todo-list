import { taskManager } from "./todo-manager.js";
import { TaskDisplayHandler } from './task-display-handler.js';


function handleSortByDueDate(projectName) {

    // Get array of tasks in project
    const projectTasksSortedByEarliest = taskManager.sortProjectTasksByDate(projectName);
}


export function sortProjectTasks(projectName) {

    const sortOptions = document.querySelector('.dropdown-content');

    while (sortOptions.firstChild) {
        sortOptions.removeChild(sortOptions.firstChild);
    }

    const sortByDueDate = document.createElement('h2');
    sortByDueDate.textContent = 'Sort By Due Date';
    sortByDueDate.addEventListener('click', () => handleSortByDueDate(projectName));


    const sortByPriority = document.createElement('h2');
    sortByPriority.textContent = 'Sort By Task Priority';
  
    sortOptions.appendChild(sortByDueDate);
    sortOptions.appendChild(sortByPriority);

    return;
}

