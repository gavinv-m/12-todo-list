import { taskManager } from './todo-manager.js';
import { createDeleteIcon, setUpDeleteClickEvent } from './delete-task-icon-handlers.js'


function displayDayTasks(dateSelected) {
    // Get dueDate object
    const date = taskManager.sendDateGroup(dateSelected);

    const displayContainer = document.querySelector('.tasks');
    if (displayContainer.firstChild) displayContainer.removeChild(displayContainer.firstChild);

    const innerContainer = document.createElement('div');

    for (let project in date) {

        if (!date[project]) return; // Check if empty

        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        const heading = document.createElement('div');
        heading.classList.add('project-heading');
        heading.textContent = project;
        projectContainer.appendChild(heading);

        const projectTasks = document.createElement('div');
        projectTasks.classList.add('project-tasks');

        for (let task of date[project]) {

            const taskContainer = document.createElement('div');
            taskContainer.classList.add('day-task');
            const taskName = document.createElement('h2');
            taskName.textContent = task.taskName;
            taskContainer.appendChild(taskName);

            const deleteSVG = createDeleteIcon();
            deleteSVG.classList.add('delete-task');
            setUpDeleteClickEvent(deleteSVG, task.id, dateSelected);

            taskContainer.appendChild(deleteSVG);
            projectTasks.appendChild(taskContainer);
        }

        projectContainer.appendChild(projectTasks);

        innerContainer.appendChild(projectContainer);
    }

    displayContainer.appendChild(innerContainer);

    return;
}

export { displayDayTasks };
