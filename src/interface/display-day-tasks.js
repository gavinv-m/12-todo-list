import  { taskManager } from '../application-logic/todo-manager.js';
import { TaskDisplayHandler } from './task-display-handler.js';

// Exports to due-dates-handlers.js & refresh.js
export function displayDayTasks(dateSelected) {
    // dateSelected represents dateGroups keys in due-date-catalogs
    // Get dueDate object
    const date = taskManager.sendDateGroup(dateSelected);

    const displayDayTasks = new TaskDisplayHandler('.inner-container');

    // Clear innerContainer
    displayDayTasks.clearInnerContainer();

    // Go through projects in date group 
    for (let project in date) {

        // Check if empty, don't display heading
        if (!date[project]) return;
        
        // Make container that will hold both the heading and tasks
        displayDayTasks.createContainerWithTasksAndHeading('project-container');
        displayDayTasks.createHeading('project-heading', project);
        displayDayTasks.createContainerWithTasks('project-tasks');

        for (let task of date[project]) {

            // Create container and pass task object
            displayDayTasks.createTask('day-task', task);
            displayDayTasks.addTaskName();
            displayDayTasks.addDeleteButton(dateSelected); 

            // Append new task to list of tasks
            displayDayTasks.containerWithTasks.appendChild(displayDayTasks.task);
        }

        displayDayTasks.appendTasksToGroupContainer(); 
        displayDayTasks.appendToInnerContainer(); 
    }
    return;
}