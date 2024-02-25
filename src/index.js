import { createNewTask } from './create-new-task.js';
import { taskListManager } from './task-list-manager.js';
import  { projectManager } from './project-manager.js';
import  { dueDateCatalog } from './due-date-catalog.js';
import { deleteTask } from './delete-task';

function TodoManager() {

    const taskListMethods = taskListManager();
    const taskList = taskListMethods.getTaskList();

    const projectMethods = projectManager();

    const dueDateMethods = dueDateCatalog();

    const addTask = () => {

        const task = createNewTask();
        taskListMethods.appendAllTasks(task);
        
        projectMethods.addToProject(task);

        dueDateMethods.assignToDueDateGroup(task);
    };


    const removeTask = () => {

        let taskID = Number(prompt('Enter the task id: '));

        deleteTask(taskList, taskID); 
        projectMethods.removeTaskFromProject(taskID);
        dueDateMethods.removeTaskFromDateGroup(taskID);
    };


    const sortProjects = () => {

        let selectedSort = prompt('How would you like to sort: "date" or "priority"');

        if (selectedSort === 'priority') { 
            projectMethods.sortProjectTasksByPriority();}
        else {
            projectMethods.sortProjectTasksByDate();
        }

    };


    const sortDueDatesTasksByPriority = () => {

        dueDateMethods.sortDueDatesTasksByPriority();
    }
        

    const updateTask = () =>  {

        const taskID = Number(prompt('Enter the task id: '));

        taskListMethods.updateTask(taskID);
        projectMethods.checkIfInCorrectProject(taskID);
    };


    return {

        addTask,
        displayAllTasks: taskListMethods.displayAllTasks,
        getProject: projectMethods.getProject,
        getProjectNames: projectMethods.getProjectNames,
        getTasksByDateGroup: dueDateMethods.getTasksByDateGroup,
        removeTask,
        sortProjects,
        sortDueDatesTasksByPriority,
        updateTask
    };
}

const taskManager = TodoManager();

window.taskManager = taskManager;