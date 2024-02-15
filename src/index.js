function addTaskId(arrayOfTasks) {

    arrayOfTasks.forEach((currentTask, indexPosition) => {
        
        currentTask.id = indexPosition + 1;
    });

    return arrayOfTasks;
}


function editTask(arrayOfTasks) {

    let response = "yes";
    const taskID = Number(prompt('Enter the task id: '));

    const propertyNames = [];
    const objectToExtractPropNames = arrayOfTasks[0];

    for (let property in objectToExtractPropNames) {

        propertyNames.push(property);
    }

    do {
        let editTaskDetail = prompt(`Which property would you like to edit? Choose from: ${propertyNames.join(", ")}`);
        const updateDetail = prompt("What should the new value be?");

        arrayOfTasks[taskID - 1][editTaskDetail] = updateDetail;
        console.log(arrayOfTasks[taskID - 1]);

        response = prompt('Would you like to edit another property?');

    }
    while (response === 'yes');

    return;


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

    let allTasks = [
        {
            "taskName": "Running",
            "day": "today",
            "taskDescription": "Run 2km",
            "taskProject": "Running",
            "priority": "high",
            "id": 1
        },

        {
            "taskName": "Walking",
            "day": "tomorrow",
            "taskDescription": "Walk 3km",
            "taskProject": "Walking",
            "priority": "low",
            "id": 2
        }
    ];

    const appendAllTasks = (task) => {

        allTasks.push(task);
        addTaskId(allTasks);

    };


    const getTaskList = () => allTasks;


    const displayAllTasks = () => {

        console.table(allTasks);
    };


    return {
        appendAllTasks,
        displayAllTasks,
        getTaskList
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

        const taskList = taskListMethods.getTaskList(); 
        const response =  prompt('Enter "yes" to see all tasks, else "no" if you wish not to see all tasks');

        (response === 'no') ? editTask(taskList) : (taskListMethods.displayAllTasks(), editTask(taskList));

    };


    return {

        addTask,
        displayAllTasks: taskListMethods.displayAllTasks, 
        updateTask   
    };
}

const taskManager = TodoManager();
