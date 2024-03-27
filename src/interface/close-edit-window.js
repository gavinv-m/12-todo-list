import  { taskManager } from '../application-logic/todo-manager.js';


function verifyUpdateStatus(taskID) {
    // taskObject represents the unedited one 
    const taskObject = taskManager.getTask(taskID);
    console.log(taskObject);

    const editDateValue = document.getElementById('date-input'); 
    console.log(editDateValue.value); // Correctly retrieving on edit


}


// Exports to edit-window.js 
export function setUpEditClose(closeButton, taskID) {

    closeButton.addEventListener('click', () => {
        verifyUpdateStatus(taskID); 
    });
}