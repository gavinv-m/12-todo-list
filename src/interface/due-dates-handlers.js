import { updateSortOptions } from './sort-due-date-tasks.js';
import { displayDayTasks } from './display-day-tasks.js';


export function setUpDueDatesEventListeners()  {

    const days = document.querySelectorAll('.due-day');

    days.forEach((day) => {
        day.addEventListener('click', (event) => {

            const headingTitle = document.querySelector('.category');
            const dateSelectedName = event.target.innerHTML; 
            headingTitle.textContent = dateSelectedName;

            const dateSelectedID = event.target.id;
            updateSortOptions(dateSelectedID);

            const dateSelected = event.target.id;
            displayDayTasks(dateSelected);
        });
    });
}