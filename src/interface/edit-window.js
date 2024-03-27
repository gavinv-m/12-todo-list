import { createCalendar, createCloseIcon, createThreeDotsIcon } from './add-images.js';
import  { taskManager } from '../application-logic/todo-manager.js';
import { setUpEditClose } from './close-edit-window.js';


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
    let taskDueDate = new Date(taskObject.day);

    // Set value attribute on calendar
    let month = taskDueDate.getMonth() + 1; 
    if (month < 10) month = '0' + month;

    let day = taskDueDate.getDate();
    if (day < 10) day = '0' + day;

    calendar.setAttribute('value', `${taskDueDate.getFullYear()}-${month}-${day}`);

    // Set text content
    taskDueDate = taskDueDate.toDateString();
    taskDueDate = taskDueDate.split(" ");

    const text = `${taskDueDate[0]}, ${taskDueDate[2]} ${taskDueDate[1]}`;
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

    const select = document.createElement('select');
    select.setAttribute('id', 'edit-project');
    const selectedProject = taskObject.taskProject;

    const projectNames = taskManager.getProjectNames();

    projectNames.forEach((project) => {

        const option = document.createElement('option');
        option.setAttribute('value', project);
        option.innerHTML = project;

        if (project === selectedProject) {
            option.setAttribute('selected', '');
        }
        
        select.appendChild(option);
    });

    projectContainer.appendChild(select);

    return projectContainer;
}


function createPriorityContainer(taskObject) {

    const container = document.createElement('div');

    const heading = document.createElement('h4');
    heading.textContent = 'Priority';
    container.appendChild(heading);

    // Create select element
    const currentPriority = taskObject.priority;

    const select = document.createElement('select');
    const firstOption = document.createElement('option');
    firstOption.innerHTML = 'High Priority';
    firstOption.setAttribute('value', 'high');

    const secondOption = document.createElement('option');
    secondOption.innerHTML = 'Low Priority';
    secondOption.setAttribute('value', 'low');
    

    const thirdOption = document.createElement('option');
    thirdOption.innerHTML = 'No Priority';
    thirdOption.setAttribute('value', 'none');

    (currentPriority === 'high') ? firstOption.setAttribute('selected', '') :
    (currentPriority === 'low')  ? secondOption.setAttribute('selected', '') : 
    thirdOption.setAttribute('selected', '');


    select.appendChild(thirdOption);
    select.appendChild(secondOption);
    select.appendChild(firstOption);

    container.appendChild(select);

    return container;
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
    const nameOfTask = document.createElement('input');
    nameOfTask.setAttribute('type', 'text');
    nameOfTask.setAttribute('value', taskObject.taskName);
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

    // Append priority container 
    detailsContainer.appendChild(createPriorityContainer(taskObject));

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

    // Set up close event listener
    const taskID = taskObject.id;
    setUpEditClose(closeIcon, taskID);

    closeContainer.appendChild(closeIcon);


    formContainer.appendChild(closeContainer);
    container.appendChild(formContainer);
    mainContent.appendChild(container);
            

    styleMainContent(formContainer);

    return;
}