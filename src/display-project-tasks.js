import { taskManager } from './todo-manager.js';
import { createDeleteIcon, setUpDeleteClickEvent } from './delete-task-icon-handlers.js';


export function displayProjectTasks(projectName) {

    const projectTaskList = taskManager.getProject(projectName);

    const displayContainer = document.querySelector('.tasks');
    if (displayContainer.firstChild) displayContainer.removeChild(displayContainer.firstChild);

    const innerContainer = document.createElement('div');

    for (let task of projectTaskList) {

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('project-task');
        
        const taskName = document.createElement('h2'); 
        taskName.textContent = task.taskName; 
        taskContainer.appendChild(taskName);

        const dueDate = document.createElement('h2');
        dueDate.textContent = task.day; 
        taskContainer.appendChild(dueDate);
        
        const deleteSVG = createDeleteIcon();
        deleteSVG.classList.add('delete-task');
        setUpDeleteClickEvent(deleteSVG, task.id, projectName);
        taskContainer.appendChild(deleteSVG);

        innerContainer.appendChild(taskContainer);
    }

    displayContainer.appendChild(innerContainer);
}