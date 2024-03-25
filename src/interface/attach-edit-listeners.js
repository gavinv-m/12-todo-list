import { displayEditDialog } from './edit-window.js';


// Export to display-day-tasks
export function attachEditListeners(classList) {

    const tasksToEdit = document.querySelectorAll(classList);
    console.log(classList);
    console.log(typeof(classList));

    // Task represents the container on the display, with an id attribute 
    tasksToEdit.forEach((task) => {
        task.addEventListener('click', () => displayEditDialog(task)); 
    });
}