import { taskManager } from "./todo-manager.js";
import { TaskDisplayHandler } from './task-display-handler.js';


function handleSortByDueDate(projectName) {

    // Get array of tasks in project
    const projectTasksSortedByEarliest = taskManager.sortProjectTasksByDate(projectName);

    const handleSortByDueDate = new TaskDisplayHandler('.inner-container');

    // Clear innerContainer
    handleSortByDueDate.clearInnerContainer();
    
    for (let task of projectTasksSortedByEarliest) {

        // For CSS try to maintain the same number of items in container as displayProjectTasks
        // We are using the same class project-task
        handleSortByDueDate.createTask('project-task', task); 
        handleSortByDueDate.addTaskName();
        handleSortByDueDate.addDueDate();
        handleSortByDueDate.addDeleteButton(projectName); 

        // NOTE: Different from other display functions
        // Tasks are added directly to inner Container
        // For styling make sure to use the selector class project-task
        handleSortByDueDate.innerContainer.appendChild(handleSortByDueDate.task); 
    }
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

