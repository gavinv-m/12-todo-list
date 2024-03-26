import { createCalendar, createCloseIcon } from './add-images.js';
import  { taskManager } from '../application-logic/todo-manager.js';


function styleMainContent(dialog) {
    dialog.style.display = 'block';
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
    mainContent.classList.add('multi-main-content');

    const container = document.createElement('div');
    container.classList.add('edit-window');

    const formContainer = document.createElement('div');
    formContainer.classList.add('edit-form-container');
    const form = document.createElement('form');

            const nameOfTask = document.createElement('h1');
                nameOfTask.textContent = taskObject.taskName;
                form.appendChild(nameOfTask);

            const priorityContainer = document.createElement('div'); 
                const priorityHeading = document.createElement('h4');
                priorityHeading.textContent = 'Priority';



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

    formContainer.appendChild(form);
    container.appendChild(formContainer);
    mainContent.appendChild(container);

    styleMainContent(formContainer);

    return;
}