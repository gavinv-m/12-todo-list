import { taskManager } from '../application-logic/todo-manager.js';


function displayNumberOfTasksInDays() {

    const dayCategories = document.querySelectorAll('.date'); 

    dayCategories.forEach((day) => {
        const dateGroupId = day.getAttribute('id');
        const number = taskManager.getNumberOfTasksInDateGroup(dateGroupId);
        day.lastElementChild.innerHTML = number;
    });
}


export function displayNumberOfTasks() {
    displayNumberOfTasksInDays();

}