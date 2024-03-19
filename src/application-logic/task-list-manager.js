import  { editTask } from './edit-task.js';


function taskListManager() {

    let allTasks = [
    ];

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


    const updateTask = (taskIDNum) => {

        for (let task of allTasks) {

            if (task.id === taskIDNum) {

                task = editTask(task);
                break;
            }
        }
    }; 


    return {
        appendAllTasks,
        displayAllTasks,
        getTaskList,
        updateTask
    };
}

// Export to todo-manager.js
export { taskListManager };