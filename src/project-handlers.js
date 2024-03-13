import { sortProjectTasks } from './sort-project-tasks';


export function setUpProjectEventListeners(event)  {

    const projectName = event.target.innerHTML; 

    const headingTitle = document.querySelector('.category');
    headingTitle.textContent = projectName;

    sortProjectTasks();
}