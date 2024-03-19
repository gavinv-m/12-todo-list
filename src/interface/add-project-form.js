import { displayProject } from './display-project.js';

class AddProjectHandler {

    constructor(dialogName){
        this.dialog = document.querySelector(dialogName);
    }


    listenForSubmitProject(submitProjectBtn, paragraphContainer, selectProject) {
        const submitBtn = document.querySelector(submitProjectBtn);
        const paragraph = document.querySelector(paragraphContainer); 
        const select = document.querySelector(selectProject);
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
                displayProject();

                // Add option to add task form 
                const option = document.createElement('option');
                option.textContent = projectName;
                select.appendChild(option);

                this.dialog.close();
                document.body.removeChild(this.dialog); 
            }
        });
    }
}

export function displayAddProjectDialog() {
    const addProjectDialog = document.createElement('dialog');
    addProjectDialog.setAttribute('id', 'add-project-dialog');
    const container = document.createElement('div');
    container.classList.add('add-project-form-container');

    const form = document.createElement('form');
    form.classList.add('add-project-form');

    const topRow = document.createElement('div');
    const textBox = document.createElement('input');
    textBox.setAttribute('type', 'text');
    textBox.setAttribute('id', 'project-name');
    textBox.setAttribute('placeholder', 'Enter project name');

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
        document.body.removeChild(addProjectDialog);
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
    submitButtonListener.listenForSubmitProject('.submit-project', '#project-exists-para', '#select-project');

}