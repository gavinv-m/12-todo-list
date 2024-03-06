import  { taskManager } from './todo-manager.js';


class AddProjectHandler {

    constructor(dialogName){
        this.dialog = document.querySelector(dialogName);
    }


    listenForSubmitProject(submitProjectBtn, paragraphContainer) {
        const submitBtn = document.querySelector(submitProjectBtn);
        const paragraph = document.querySelector(paragraphContainer); 
        submitBtn.addEventListener('click', (event) => {

            event.preventDefault(); // Don't submit form
            const projectName = document.getElementById('project-name').value;
            const projectNames = taskManager.getProjectNames();
            
            const projectNameExists = projectNames.some((pName) => {
                return pName === projectName;
            });

            if (projectNameExists) {
                paragraph.textContent = 'Project Already Exists';
            }

            else {
                taskManager.createProject(projectName);
                this.dialog.close();
            }
        });
    }
}


function displayAddProjectDialog() {

    const addProjectDialog = document.createElement('dialog');
    addProjectDialog.setAttribute('id', 'add-project-dialog');
    const container = document.createElement('div');
    container.classList.add('add-project-form');

    const form = document.createElement('form');

    const topRow = document.createElement('div');
    const textBox = document.createElement('input');
    textBox.setAttribute('type', 'text');
    textBox.setAttribute('id', 'project-name');

    const paragraph = document.createElement('p');
    paragraph.setAttribute('id', 'project-exists-para');
    topRow.appendChild(textBox);
    topRow.appendChild(paragraph);
    form.appendChild(topRow);


    const bottomRow = document.createElement('div');
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-add-project');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', (event) => {
        event.preventDefault();
        addProjectDialog.close(); 
    });
    bottomRow.appendChild(cancelButton);

    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-project');
    submitButton.textContent = 'Add';


    bottomRow.appendChild(submitButton);
    form.appendChild(bottomRow);

    container.appendChild(form);
    addProjectDialog.appendChild(container);

    document.body.appendChild(addProjectDialog);
    addProjectDialog.showModal();

    const submitButtonListener = new AddProjectHandler('#add-project-dialog');
    submitButtonListener.listenForSubmitProject('.submit-project', '#project-exists-para');

}

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
            // const taskProject = document.getElementById('select-project').value;
            const taskProject = 'Running';
            const priority = document.getElementById('select-priority').value;
            const taskDescription = document.getElementById('task-description').value;

            const task = {
                taskName, 
                day, 
                taskProject, 
                priority, 
                taskDescription
            };

            taskManager.addTask(task);
            this.dialog.close();
        }); 
    }
}



export function setupClickEventListeners() {
    const taskDialogHandler = new TaskDialogHandler('.create-task-dialog');

    taskDialogHandler.listenForAddTaskButton('.add-task-btn');
    taskDialogHandler.listenForCancelFormButton('.cancel-form-sub');
    taskDialogHandler.listenForSubmitFormButton('.submit-form-button');
    
    const addProject = document.getElementById('add-project'); 
    addProject.addEventListener('click', () => {

        displayAddProjectDialog();
    })

}
