import  { editTask } from './edit-task.js';


function taskListManager() {

    let allTasks = [];

    let allTimeTasksCreated = 0;

    const addTaskId = (task) => {

        allTimeTasksCreated++;
        task.id = allTimeTasksCreated;
    };

    const appendAllTasks = (task) => {
        allTasks.push(task);
        addTaskId(task);
    };


    const displayAllTasks = () => {
        console.table(allTasks);
    };


    const getTaskList = () => allTasks;


    const getTask = (taskId) => {   
        let task = allTasks.find((taskObject) => taskObject.id === taskId);
        return task;
    };


    return {
        appendAllTasks,
        displayAllTasks,
        getTaskList,
        getTask,
    };
}

// Export to todo-manager.js
export { taskListManager };