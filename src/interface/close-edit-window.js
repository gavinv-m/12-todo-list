import  { taskManager } from '../application-logic/todo-manager.js';
import { editTask } from '../application-logic/edit-task.js';
import { refreshAfterEditTask } from './refresh.js';

function verifyUpdateStatus(taskID) {
    const originalTaskObject = taskManager.getTask(taskID);

    // Create edited task
    const editedTask = {
        taskName: document.getElementById('edit-task-name').value,
        id: taskID,
        day: document.getElementById('edit-date').value,
        taskProject: document.getElementById('edit-project').value,
        priority: document.getElementById('edit-priority').value,
        taskDescription: document.getElementById('edit-task-description').value
    };

    for (let property in originalTaskObject) {
        if (originalTaskObject[property] !== editedTask[property]) {
            editTask(editedTask, originalTaskObject);
            taskManager.updateTask(taskID);
            refreshAfterEditTask();
            break;
        }
        continue;
    }
    return;
}


// Exports to edit-window.js 
export function setUpEditClose(closeButton, taskID) {

    closeButton.addEventListener('click', () => {
        verifyUpdateStatus(taskID); 
    });
}