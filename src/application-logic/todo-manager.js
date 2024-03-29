import { taskListManager } from './task-list-manager.js';
import  { projectManager } from './project-manager.js';
import  { dueDateCatalog } from './due-date-catalog.js';
import { deleteTask } from './delete-task';

function TodoManager() {

    const taskListMethods = taskListManager();
    const taskList = taskListMethods.getTaskList();

    const projectMethods = projectManager();

    const dueDateMethods = dueDateCatalog();

    const addTask = (task) => {
        taskListMethods.appendAllTasks(task);
        projectMethods.addToProject(task);
        dueDateMethods.assignToDueDateGroup(task);
    };

    const createProject = (projectName) => projectMethods.createProject(projectName);

    const getNumberOfTasksInDateGroup = (dateGroup) => dueDateMethods.getNumberOfTasksInDateGroup(dateGroup);

    const getNumberOfTasksInProject = (projectName) => projectMethods.getNumberOfTasksInProject(projectName);

    const getProject = (projectName) => projectMethods.getProject(projectName);

    const getTask = (taskID) => taskListMethods.getTask(taskID);


    const removeTask = (id) => {
        deleteTask(taskList, id); 
        projectMethods.removeTaskFromProject(id);
        dueDateMethods.removeTaskFromDateGroup(id);
    };


    const sortProjects = () => {

        let selectedSort = prompt('How would you like to sort: "date" or "priority"');

        if (selectedSort === 'priority') { 
            projectMethods.sortProjectTasksByPriority();}
        else {
            projectMethods.sortProjectTasksByDate();
        }

    };


    const sendDateGroup = (dateSelected) => dueDateMethods.sendDateGroup(dateSelected);

    const sortDueDatesTasksByPriority = (dateSelected) => dueDateMethods.sortDueDatesTasksByPriority(dateSelected);

    const sortDueSomeDayByEarliest = () => dueDateMethods.sortDueSomeDayByEarliest();

    const sortProjectTasksByDate = (projectName) => projectMethods.sortProjectTasksByDate(projectName);
        
    const sortProjectTasksByPriority = (projectName) => projectMethods.sortProjectTasksByPriority(projectName); 
    
    const updateTask = (taskID) => {

        dueDateMethods.checkIfInCorrectDateGroup(taskID);
        projectMethods.checkIfInCorrectProject(taskID);
    };


    return {

        addTask,
        displayAllTasks: taskListMethods.displayAllTasks,
        createProject,
        getDateDisplays: dueDateMethods.getDateDisplays,
        getDateGroups: dueDateMethods.getDateGroups,
        getNumberOfTasksInAllProjects: projectMethods.getNumberOfTasksInAllProjects,
        getNumberOfTasksInProject, 
        getNumberOfTasksInDateGroup,
        getProject,
        getProjectNames: projectMethods.getProjectNames,
        getTask,
        getTasksByDateGroup: dueDateMethods.getTasksByDateGroup,
        removeTask,
        sendDateGroup,
        sortDueDatesTasksByPriority,
        sortDueSomeDayByEarliest,
        sortProjectTasksByDate,
        sortProjectTasksByPriority, 
        updateTask
    };
}

const taskManager = TodoManager();
window.taskManager = taskManager;

export { taskManager }; 