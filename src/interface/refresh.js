import { displayDayTasks } from './display-day-tasks.js';
import { displayProjectTasks } from './display-project-tasks.js';
import  { taskManager } from '../application-logic/todo-manager.js';


// Exports to close-edit-window.js
function refreshAfterEditTask() {
    const currentDisplayCategory = document.querySelector('.category').innerHTML;

    const projectNames = taskManager.getProjectNames();
    const isProject = projectNames.some((projectName) => projectName === currentDisplayCategory); 

    if (isProject) {
        displayProjectTasks(currentDisplayCategory);
        return;
    }

    else {
        const dateDisplays = taskManager.getDateDisplays();

        for (let day in dateDisplays) {
            if (day === currentDisplayCategory) {
                displayDayTasks(dateDisplays[day]);
                return;
            }
        }
    }
}

// Exports to add-task.js 
function refreshAfterAddTask(task) {

    const currentDisplayCategory = document.querySelector('.category').innerHTML;

    if (task.taskProject === currentDisplayCategory) {
        displayProjectTasks(currentDisplayCategory); 
        return; 
    }

    else {
        let today = new Date ();
        today = today.toDateString();
        
        let tomorrow = new Date ();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow = tomorrow.toDateString();

        let taskDay = task.day;
        taskDay = new Date(taskDay); 
        taskDay = taskDay.toDateString();

        const dateSelected = (taskDay === today) ? 'dueToday' :
                            (taskDay === tomorrow) ? 'dueTomorrow' : 'dueSomeDay';

        if ((taskDay === today && currentDisplayCategory === 'Today') || 
        (taskDay === tomorrow && currentDisplayCategory === 'Tomorrow') ||
        (currentDisplayCategory === 'Someday')) {

            displayDayTasks(dateSelected);
        }
        return;
    }
}

export { refreshAfterAddTask, refreshAfterEditTask }