import  { taskManager } from '../application-logic/todo-manager.js';
import { TaskDisplayHandler } from './task-display-handler.js';

// Exports to project-handlers.js
export function displayProjectTasks(projectName) {
    // Get array of the tasks in a project
    const projectTaskList = taskManager.getProject(projectName);

    const displayProjectTasks = new TaskDisplayHandler('.inner-container');

    // Clear inner container
    displayProjectTasks.clearInnerContainer();

    for (let task of projectTaskList) {

        displayProjectTasks.createTask('project-task', task); 
        displayProjectTasks.addTaskName(); 
        displayProjectTasks.addDueDate(); 
        displayProjectTasks.addDeleteButton(projectName);

        // NOTE: Different from other display functions
        // Tasks are added directly to inner Container
        // For styling make sure to use the selector class project-task
        displayProjectTasks.innerContainer.appendChild(displayProjectTasks.task);
    }
}

