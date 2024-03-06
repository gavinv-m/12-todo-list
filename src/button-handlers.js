import  { taskManager } from './todo-manager.js';

class TaskDialogHandler {
    constructor(dialogClass) {
        this.dialog = document.querySelector(dialogClass);
    }

    listenForAddTaskButton(addTaskBtnClass) {
        const addTaskButton = document.querySelector(addTaskBtnClass);
        addTaskButton.addEventListener('click', () => {

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

            const taskName = document.getElementById('task-name').value;
            const day = document.getElementById('due-date').value;
            const taskProject = document.getElementById('select-project').value;
            const priority = document.getElementById('select-priority').value;
            const taskDescription = document.getElementById('task-description').value;

            const taskDetails = {
                taskName, 
                day, 
                taskProject, 
                priority, 
                taskDescription
            };

            taskManager.addTask(taskDetails);

            this.dialog.close();
        }); 
    }


}


export function setupClickEventListeners() {
    const taskDialogHandler = new TaskDialogHandler('.create-task-dialog');

    taskDialogHandler.listenForAddTaskButton('.add-task-btn');
    taskDialogHandler.listenForCancelFormButton('.cancel-form-sub');
    taskDialogHandler.listenForSubmitFormButton('.submit-form-button');    
}
