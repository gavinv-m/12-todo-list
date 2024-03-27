import { taskManager } from '../application-logic/todo-manager.js';


function displayNumberOfTasksInDays() {

    const dayCategories = document.querySelectorAll('.date'); 

    dayCategories.forEach((day) => {
        const dateGroupId = day.getAttribute('id');
        const number = taskManager.getNumberOfTasksInDateGroup(dateGroupId);
        day.lastElementChild.innerHTML = number;
    });
}


function displayNumberOfTasksInProject() {
    
    const projects = document.querySelectorAll('.project');

    projects.forEach((project) => {
        const projectName = project.querySelector(':nth-child(2)').innerHTML;
        const number = taskManager.getNumberOfTasksInProject(projectName);
        project.lastElementChild.innerHTML = number;
    });
}


export function displayNumberOfTasks() {
    displayNumberOfTasksInDays();
    displayNumberOfTasksInProject();
}
