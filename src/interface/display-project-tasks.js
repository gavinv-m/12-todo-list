import  { taskManager } from '../application-logic/todo-manager.js';
import { TaskDisplayHandler } from './task-display-handler.js';
import { attachEditListeners } from './attach-edit-listeners.js';


// Exports to project-handlers.js & refresh.js
export function displayProjectTasks(projectName) {
    // Get array of the tasks in a project
    const projectTaskList = taskManager.getProject(projectName);

    const displayProjectTasks = new TaskDisplayHandler('.inner-container');

    // Clear inner container
    displayProjectTasks.clearInnerContainer();

    // Create container that will hold tasks
    displayProjectTasks.createContainerWithTasks('project-tasks');

    for (let task of projectTaskList) {

        displayProjectTasks.createTask('project-task', task); 
        displayProjectTasks.addTaskName(); 
        displayProjectTasks.addDueDate(); 
        displayProjectTasks.addDeleteButton(projectName);

        // Append new task to list of tasks
        displayProjectTasks.containerWithTasks.appendChild(displayProjectTasks.task);
    }

    displayProjectTasks.innerContainer.appendChild(displayProjectTasks.containerWithTasks);

    attachEditListeners('.project-task');
    return; 
}

