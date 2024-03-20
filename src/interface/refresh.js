import { displayDayTasks } from './display-day-tasks.js';
import { displayProjectTasks } from './display-project-tasks.js'; 

// Exports to add-task.js
export function refreshManager(task) {

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