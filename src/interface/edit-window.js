import { createCalendar, createCloseIcon } from './add-images.js';
import  { taskManager } from '../application-logic/todo-manager.js';


function styleMainContent(mainContent) {
    
    mainContent.classList.add('multi-main-content');
}

function fetchTaskDetails(task) {
    let taskID = Number(task.getAttribute("id"));
    const taskObject = taskManager.getTask(taskID);
    return taskObject;
}

// Exports to attach edit listeners 
// Task parameter represents the task displayed in DOM
export function displayEditDialog(task) {
    
    const taskObject = fetchTaskDetails(task);

    const mainContent = document.querySelector('.main-content');
    const editDialog = document.createElement('dialog');
    editDialog.classList.add('edit-dialog');
    const form = document.createElement('form');

            const nameOfTask = document.createElement('h1');
                nameOfTask.textContent = taskObject.taskName;
                form.appendChild(nameOfTask);

            const dateAndProjectContainer = document.createElement('div');

                const hr = document.createElement('hr');
                dateAndProjectContainer.appendChild(hr);

                const dateContainer = document.createElement('div');
                    const calendar = document.createElement('input');
                        calendar.setAttribute('type', 'date');
                        calendar.setAttribute('id', 'date-input');
                        dateContainer.appendChild(calendar);

                    const dateHeading = document.createElement('h4');
                        dateHeading.textContent = 'Due Date';
                        dateContainer.appendChild(dateHeading);

                    const dueDate = document.createElement('h4');
                        let today = new Date(taskObject.day);
                        today = today.toDateString();
                        today = today.split(" ");
                        
                        const text = `${today[0]}, ${today[2]} ${today[1]}`;
                        dueDate.textContent = text;
                        dateContainer.appendChild(dueDate);

                dateAndProjectContainer.appendChild(dateContainer);

                const projectContainer = document.createElement('div');
                    const icon = createCalendar();
                        projectContainer.appendChild(icon);

                    const projectHeading = document.createElement('h4');
                        projectHeading.textContent = 'Project';
                        projectContainer.appendChild(projectHeading);


                    const project = document.createElement('h4');
                        project.textContent = taskObject.taskProject;
                        projectContainer.appendChild(project); 
                
                dateAndProjectContainer.appendChild(projectContainer);
                dateAndProjectContainer.appendChild(hr);

        form.appendChild(dateAndProjectContainer);
            
            const taskDescription = document.createElement('textarea');
            taskDescription.classList.add('edit-task-description');
        form.appendChild(taskDescription);

            const closeContainer = document.createElement('div');
                const closeIcon = createCloseIcon();
                closeIcon.setAttribute('id', 'close-edit');
                closeContainer.appendChild(closeIcon);
        form.appendChild(closeContainer);

    editDialog.appendChild(form);
    mainContent.appendChild(editDialog);
    styleMainContent(mainContent);

    return;
}