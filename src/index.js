function addTaskId(arrayOfTasks) {

    arrayOfTasks.forEach((currentTask, indexPosition) => {
        
        currentTask.id = indexPosition + 1;
    });

    return arrayOfTasks;
}


function createNewTask() {

    const taskName = prompt('Enter task name: ');
    const day = prompt('Enter the due date in the following manner: "today", "tomorrow", "DD-MM-YYYY": ');
    const taskDescription = prompt('Enter the description of the goal: '); 
    const taskProject = prompt('Enter project name: '); 
    const priority = prompt('Enter priority level: ');

    const taskDetails = {taskName, day, taskDescription, taskProject, priority};
    return taskDetails;

}



function taskListManager(task) {

    let allTasks = [];

    const appendAllTasks = (task) => {

        allTasks.push(task);
        addTaskId(allTasks);

    };


    const displayAllTasks = () => {

        console.log(allTasks);
    };


    return {
        appendAllTasks,
        displayAllTasks
    };
}


function TodoManager() {

    const taskListMethods = taskListManager();

    const addTask = () => {

        const task = createNewTask();
        taskListMethods.appendAllTasks(task);
        console.log(task);

    }


    const updateTask = () => {


    }


    return {

        addTask,
        displayAllTasks: taskListMethods.displayAllTasks        
    };
}

const taskManager = TodoManager();
