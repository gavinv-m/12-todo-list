import { taskManager } from '../application-logic/todo-manager.js';
import { displayDayTasks } from './display-day-tasks.js';
import { TaskDisplayHandler } from './task-display-handler.js';

// Sort tasks Due Someday by earliest
function handleSortByEarliestEvent(dateGroup) {

    // Get array of tasks sorted by earliest due date
    const tasksSortedByEarliest = taskManager.sortDueSomeDayByEarliest(); 

   const handleSortByEarliestEvent = new TaskDisplayHandler('.inner-container');
   
   // Clear innerContainer
   handleSortByEarliestEvent.clearInnerContainer();

   handleSortByEarliestEvent.createContainerWithTasksAndHeading('sort-earliest'); 

   handleSortByEarliestEvent.createHeading('sort-type', 'Sort By Earliest Date'); 

   handleSortByEarliestEvent.createContainerWithTasks('earliest-sort-group');

   for (let task of tasksSortedByEarliest) {

        handleSortByEarliestEvent.createTask('earliest-task', task); 
        handleSortByEarliestEvent.addTaskName();
        handleSortByEarliestEvent.addProjectName();
        handleSortByEarliestEvent.addDueDate();
        handleSortByEarliestEvent.addDeleteButton(dateGroup);

        // Append to container with tasks
        handleSortByEarliestEvent.containerWithTasks.appendChild(handleSortByEarliestEvent.task); 
   }

   // Apend the container with tasks to the container with the sort by heading
   handleSortByEarliestEvent.appendTasksToGroupContainer();

   // Append to inner container 
   handleSortByEarliestEvent.appendToInnerContainer(); 
   return;
}

// Sort tasks in date group by highest priority
function handleSortByPriorityEvent(dateGroup) {

    // Get tasks sorted into priority groups
    const tasksSortedInPriorityGroups = taskManager.sortDueDatesTasksByPriority(dateGroup);

    const handleSortByPriorityEvent = new TaskDisplayHandler('.inner-container');
    
    // Clear innerContainer 
    handleSortByPriorityEvent.clearInnerContainer();

    for (let priorityGroup in tasksSortedInPriorityGroups) {

        // Check if empty, if so don't display heading 
        if (tasksSortedInPriorityGroups[priorityGroup].length < 1) continue; 

        handleSortByPriorityEvent.createContainerWithTasksAndHeading('priority-group'); 

        const heading = (priorityGroup === 'highPriority') ? 'High Priority' :
                        (priorityGroup === 'lowPriority') ? 'Low Priority' : 'No Priority';
        
        handleSortByPriorityEvent.createHeading('priority-group-heading', heading); 

        handleSortByPriorityEvent.createContainerWithTasks('priority-tasks'); 


        for (let task of tasksSortedInPriorityGroups[priorityGroup]) {

            // Create container and pass task object
            handleSortByPriorityEvent.createTask('priority-task', task); 
            handleSortByPriorityEvent.addTaskName();
            handleSortByPriorityEvent.addProjectName();
            handleSortByPriorityEvent.addDeleteButton(dateGroup); 

            // Append task to container with ohter tasks
            handleSortByPriorityEvent.containerWithTasks.appendChild(handleSortByPriorityEvent.task);
        }

        // Append container with tasks to container with heading 
        handleSortByPriorityEvent.appendTasksToGroupContainer();
        handleSortByPriorityEvent.appendToInnerContainer(); 

    };
    return;
}

// Exports to due-dates-handlers.js
export function updateSortOptions(date) {

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

