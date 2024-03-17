import { taskManager } from './todo-manager.js';
import { TaskDisplayHandler } from './task-display-handler.js';

export function displayDayTasks(dateSelected) {
    // Get dueDate object
    const date = taskManager.sendDateGroup(dateSelected);

    const displaDayTasks = new TaskDisplayHandler('.inner-container');

    // Clear innerContainer
    displaDayTasks.clearInnerContainer();

    // Go through projects in date group 
    for (let project in date) {

        // Check if empty, don't display heading
        if (!date[project]) return;
        
        // Make container that will hold both the heading and tasks
        displaDayTasks.createContainerWithTasksAndHeading('project-container');

        displaDayTasks.createHeading('project-heading', project);

        displaDayTasks.createContainerWithTasks('project-tasks');

        for (let task of date[project]) {

            displaDayTasks.createTask('day-task', task, dateSelected); 
        }

        displaDayTasks.appendTasksToProjectContainer(); 
        displaDayTasks.appendToInnerContainer(); 
    }
    return;
}