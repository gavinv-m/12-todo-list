import { taskManager } from "./todo-manager.js";
import { createDeleteIcon, setUpDeleteClickEvent } from './delete-task-icon-handlers.js';
import { displayDayTasks } from './display-day-tasks.js';


function handleSortByEarliestEvent(dateGroup) {

    const tasksSortedByEarliest = taskManager.sortDueSomeDayByEarliest(); // Get array

    const displayContainer = document.querySelector('.tasks');
    if (displayContainer.firstChild) displayContainer.removeChild(displayContainer.firstChild);

    const innerContainer = document.createElement('div');

    const earliestDateContainer = document.createElement('div');
    earliestDateContainer.classList.add('sort-earliest');

    const sortTypeHeading = document.createElement('h2');
    sortTypeHeading.textContent = 'Sort By Earliest Date';
    earliestDateContainer.appendChild(sortTypeHeading);

    const tasksContainer = document.createElement('div');
    tasksContainer.classList.add('earliest-sort-group');

    for (let task of tasksSortedByEarliest) {

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('earliest-task');
        
        const taskName = document.createElement('h2'); 
        taskName.textContent = task.taskName; 
        taskContainer.appendChild(taskName);

        const projectName = document.createElement('h2');
        projectName.textContent = task.taskProject;
        taskContainer.appendChild(projectName);

        const dueDate = document.createElement('h2');
        dueDate.textContent = task.day; 
        taskContainer.appendChild(dueDate);
        
        const deleteSVG = createDeleteIcon();
        deleteSVG.classList.add('delete-task');
        setUpDeleteClickEvent(deleteSVG, task.id, dateGroup);
        taskContainer.appendChild(deleteSVG);

        tasksContainer.appendChild(taskContainer);
    }

    innerContainer.appendChild(tasksContainer);
    displayContainer.appendChild(innerContainer);
    return;
}


function handleSortByPriorityEvent(dateGroup) {

    const tasksSortedInPriorityGroups = taskManager.sortDueDatesTasksByPriority(dateGroup);

    const displayContainer = document.querySelector('.tasks');
    if (displayContainer.firstChild) displayContainer.removeChild(displayContainer.firstChild);

    const innerContainer = document.createElement('div');

    for (let priorityGroup in tasksSortedInPriorityGroups) {

        const priorityGroupContainer = document.createElement('div');
        priorityGroupContainer.classList.add('priority-group');

        const priorityGroupHeading = document.createElement('div');
        priorityGroupHeading.classList.add('priority-group-heading');
        priorityGroupHeading.textContent = 
            (priorityGroup === 'highPriority') ? 'High Priority' : 
            (priorityGroup === 'lowPriority') ? 'Low Priority' : 'No Priority';

        // Don't Display Priority Group Heading With No Tasks
        if (tasksSortedInPriorityGroups[priorityGroup].length >= 1) priorityGroupContainer.appendChild(priorityGroupHeading);

        const priorityTasks = document.createElement('div');
        priorityTasks.classList.add('priority-tasks');

        for (let task of tasksSortedInPriorityGroups[priorityGroup]) {
            const taskContainer = document.createElement('div');
            taskContainer.classList.add('priority-task');

            const taskName = document.createElement('h2');
            taskName.textContent = task.taskName;
            taskContainer.appendChild(taskName);

            const projectName = document.createElement('h2');
            projectName.textContent = task.taskProject;
            taskContainer.appendChild(projectName);

            const deleteSVG = createDeleteIcon();
            deleteSVG.classList.add('delete-task');
            setUpDeleteClickEvent(deleteSVG, task.id, dateGroup);
            taskContainer.appendChild(deleteSVG);

            priorityTasks.appendChild(taskContainer);
        }

        priorityGroupContainer.appendChild(priorityTasks); 
        innerContainer.appendChild(priorityGroupContainer);
    }

    displayContainer.appendChild(innerContainer);
    return;
}


function updateSortOptions(date) {

    const sortOptions = document.querySelector('.dropdown-content');

    while (sortOptions.firstChild) {
        sortOptions.removeChild(sortOptions.firstChild);
    }

    const sortByPriority = document.createElement('h2');
    sortByPriority.textContent = 'Sort By Priority';
    sortByPriority.addEventListener('click', () => handleSortByPriorityEvent(date));
    
    const sortByProject = document.createElement('h2');
    sortByProject.textContent = 'Sort By Project';
    sortByProject.addEventListener('click', () => displayDayTasks(date));


    const sortByEarliest = document.createElement('h2');
    sortByEarliest.textContent = 'Sort By Earliest';
    sortByEarliest.addEventListener('click', () =>  handleSortByEarliestEvent(date));

    sortOptions.appendChild(sortByEarliest);
    sortOptions.appendChild(sortByPriority);
    sortOptions.appendChild(sortByProject);

    if (date === 'dueToday' || date === 'dueTomorrow') sortOptions.removeChild(sortOptions.firstChild);
    
    return;
}


export { updateSortOptions };