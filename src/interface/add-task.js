import  { taskManager } from '../application-logic/todo-manager.js';
import { refreshAfterAddTask } from './refresh.js';
import { displayNumberOfTasks } from './number-of-tasks.js';

class TaskDialogHandler {
    constructor(dialogClass) {
        this.dialog = document.querySelector(dialogClass);
    }

    listenForAddTaskButton(addTaskBtnClass) {
        const addTaskButton = document.querySelector(addTaskBtnClass);
        addTaskButton.addEventListener('click', () => {

            // Set minimum day
            const today = new Date();
            const year = today.getFullYear();

            let month = today.getMonth() + 1;
            if (month < 10) month = '0' + month;
            
            let day = today.getDate(); 
            if (day < 10) day = '0' + day;

            const minString = `${year}-${month}-${day}`;

            const dueDate = document.getElementById('due-date');
            dueDate.setAttribute("min", minString);

            this.dialog.showModal();
        });
    }

    listenForCancelFormButton(cancelFormBtnClass) {
        const cancelFormButton = document.querySelector(cancelFormBtnClass);
        cancelFormButton.addEventListener("click", (event) => {
            event.preventDefault(); // Page was flickering
            this.dialog.close();
          });
    }


    listenForSubmitFormButton(submitFormBtn) {
        const submitButton = document.querySelector(submitFormBtn);
        submitButton.addEventListener('click', (event) => {

            event.preventDefault(); // Don't submit form

            let taskName = document.getElementById('task-name').value;
            let day = document.getElementById('due-date').value;
            let taskProject = document.getElementById('select-project').value;
            let priority = document.getElementById('select-priority').value;
            let taskDescription = document.getElementById('task-description').value;

            const task = {
                taskName, 
                day, 
                taskProject, 
                priority, 
                taskDescription
            };

            taskManager.addTask(task);

            // Check if we need to reload page to display newly created task
            refreshAfterAddTask(task);
            
            // Check if we need to update today and project numbers
            displayNumberOfTasks();

            // Clear the input fields
            document.getElementById('task-name').value = '';
            document.getElementById('due-date').value = '';
            document.getElementById('select-project').value = '';
            document.getElementById('select-priority').value = '';
            document.getElementById('task-description').value = '';


            this.dialog.close();
        }); 
    }
}

// Exports to button-handlers.js
export function setAddTaskEventListeners() {
    const taskDialogHandler = new TaskDialogHandler('.create-task-dialog');
    taskDialogHandler.listenForAddTaskButton('.add-task-btn');
    taskDialogHandler.listenForCancelFormButton('.cancel-form-sub');
    taskDialogHandler.listenForSubmitFormButton('.submit-form-button');

    return;
}