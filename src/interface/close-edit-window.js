import  { taskManager } from '../application-logic/todo-manager.js';


function verifyUpdateStatus(taskID) {
    // taskObject represents the unedited one 
    const taskObject = taskManager.getTask(taskID);

    const editedTask = {
        taskName: document.getElementById('edit-task-name').value,
        id: taskID,
        day: document.getElementById('edit-date').value,
        taskProject: document.getElementById('edit-project').value,
        priority: document.getElementById('edit-priority').value,
        taskDescription: document.getElementById('edit-task-description').value
    };

    for (let property in taskObject) {
        if (taskObject[property] !== editedTask[property]) {
            console.log(`Not the same`);
            break;
        }
        
    }
    return;
}


// Exports to edit-window.js 
export function setUpEditClose(closeButton, taskID) {

    closeButton.addEventListener('click', () => {
        verifyUpdateStatus(taskID); 
    });
}