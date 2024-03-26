import { createCalendar, createCloseIcon, createThreeDotsIcon } from './add-images.js';
import  { taskManager } from '../application-logic/todo-manager.js';


function styleMainContent(dialog) {
    dialog.style.display = 'block';
}

function fetchTaskDetails(task) {
    let taskID = Number(task.getAttribute("id"));
    const taskObject = taskManager.getTask(taskID);
    return taskObject;
}


function createDateContainer(taskObject) {
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

    return dateContainer;
}


function createProjectContainer(taskObject) {
    const projectContainer = document.createElement('div');

    const icon = createThreeDotsIcon();
    projectContainer.appendChild(icon);

    const projectHeading = document.createElement('h4');
    projectHeading.textContent = 'Project';
    projectContainer.appendChild(projectHeading);

    const project = document.createElement('h4');
    project.textContent = taskObject.taskProject;
    projectContainer.appendChild(project); 

    return projectContainer;
}


// Exports to attach edit listeners 
// Task parameter represents the task displayed in DOM
export function displayEditDialog(task) {
    
    const taskObject = fetchTaskDetails(task);

    const mainContent = document.querySelector('.main-content');
    mainContent.classList.add('multi-main-content');

    const container = document.createElement('div');
    container.classList.add('edit-window');

    // Create form container
    const formContainer = document.createElement('div');
    formContainer.classList.add('edit-form-container');
    const form = document.createElement('form');

    // Add task name to form
    const nameOfTask = document.createElement('h1');
    nameOfTask.textContent = taskObject.taskName;
    form.appendChild(nameOfTask);

    // Create task details container
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('task-details'); 

    const hr = document.createElement('hr');
    detailsContainer.appendChild(hr);

    // Append date container
    detailsContainer.appendChild(createDateContainer(taskObject));
                
    // Append project container
    detailsContainer.appendChild(createProjectContainer(taskObject));

    const hrTwo = document.createElement('hr');
    detailsContainer.appendChild(hrTwo);

    // Append textarea to details container
    const taskDescription = document.createElement('textarea');
    taskDescription.classList.add('edit-task-description');
    detailsContainer.appendChild(taskDescription);

    form.appendChild(detailsContainer);
    formContainer.appendChild(form);

    const closeContainer = document.createElement('div');
    const closeIcon = createCloseIcon();
    closeIcon.setAttribute('id', 'close-edit');
    closeContainer.appendChild(closeIcon);

    formContainer.appendChild(closeContainer);
    container.appendChild(formContainer);
    mainContent.appendChild(container);
            

    styleMainContent(formContainer);

    return;
}