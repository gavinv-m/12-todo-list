import  { taskManager } from '../application-logic/todo-manager.js';
import { displayDayTasks } from './display-day-tasks.js';
import { displayProject } from './display-project.js';
import { updateSortOptions } from './sort-due-date-tasks.js';


function getRandomDate() {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7); // Random date within the next week
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    return randomDate.toISOString().slice(0, 10);
}

function getToday() {
    const today = new Date();

    const year = String(today.getFullYear());
    
    let month = today.getMonth() + 1;
    if (month < 10) month = '0' + month;
    
    let day = today.getDate(); 
    if (day < 10) day = '0' + day;
    
    const dateString = `${year}-${month}-${day}`;
    return dateString;
}


function getTomorrow() {
    let tomorrow = new Date ();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const year = String(tomorrow.getFullYear());
    
    let month = tomorrow.getMonth() + 1;
    if (month < 10) month = '0' + month;
    
    let day = tomorrow.getDate(); 
    if (day < 10) day = '0' + day;
    
    const dateString = `${year}-${month}-${day}`;
    return dateString;
}


const defaultTasks = [
    {
        taskName: "Complete report",
        day: getToday(),
        taskProject: "Work",
        priority: "high",
        taskDescription: "Finish the quarterly report for the finance team."
    },
    {
        taskName: "Grocery shopping",
        day: getTomorrow(),
        taskProject: "Personal",
        priority: "low",
        taskDescription: "Buy groceries for the week."
    },
    {
        taskName: "Call mom",
        day: getRandomDate(),
        taskProject: "Personal",
        priority: "none",
        taskDescription: "Check in with mom and see how she's doing."
    },
    {
        taskName: "Write blog post",
        day: getToday(),
        taskProject: "Work",
        priority: "high",
        taskDescription: "Create a new blog post about recent industry trends."
    },
    {
        taskName: "Exercise",
        day: getTomorrow(),
        taskProject: "Personal",
        priority: "low",
        taskDescription: "Go for a run in the park."
    },
    {
        taskName: "Meeting with client",
        day: getRandomDate(),
        taskProject: "Work",
        priority: "high",
        taskDescription: "Discuss project updates with the client."
    },
    {
        taskName: "Read book",
        day: getToday(),
        taskProject: "Personal",
        priority: "none",
        taskDescription: "Spend some time reading a new novel."
    },
    {
        taskName: "Prepare presentation",
        day: getRandomDate(),
        taskProject: "Work",
        priority: "high",
        taskDescription: "Get ready for the upcoming presentation to the team."
    },
    {
        taskName: "Clean the house",
        day: getTomorrow(),
        taskProject: "Personal",
        priority: "low",
        taskDescription: "Tidy up the living room and kitchen."
    },
    {
        taskName: "Plan weekend getaway",
        day: getToday(),
        taskProject: "Personal",
        priority: "none",
        taskDescription: "Research and book accommodations for a weekend trip."
    }
];

function addDefaultTasks() {
    for (let task of defaultTasks) {
        taskManager.addTask(task);
    }
}

export function displayDefaultTaks() {

    const headingTitle = document.querySelector('.category');
    headingTitle.textContent = 'Today';
    
    addDefaultTasks();
    displayDayTasks('dueToday');
    updateSortOptions('dueToday');
    displayProject();

}