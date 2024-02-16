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


function addTaskToProject() {

    const projectManager = {};


    const addToProject = (task) => {

        const projectName = task.taskProject;

        if (projectManager[projectName]) projectManager[projectName].push(task);

        else {

            projectManager[projectName] = [];
            projectManager[projectName].push(task);
        }
    };


    const getProjectNames = () => {

        const projectNames = Object.keys(projectManager);

        projectNames.forEach((projectName) => {

            console.log(projectName);
        });
    };


    return {

        addToProject,
        getProjectNames
    };

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


function deleteTask(arrayOfTasks) {

    let response = 'yes';

    do {

        let taskID = Number(prompt('Enter the task id: '));

        const numberOfTasks = arrayOfTasks.length;

        for (let i = 0; i < numberOfTasks; i++) {

            if (arrayOfTasks[i]['id'] === taskID) {

                arrayOfTasks.splice(i, 1);
                break;
            }
        }

        response = prompt('Would you like to edit another property?');

    }
    while (response === 'yes');

    console.table(arrayOfTasks);

    return;
}


function taskListManager(task) {

    let allTasks = [
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
    const taskList = taskListMethods.getTaskList();

    const projectMethods = addTaskToProject();

    const addTask = () => {

        const task = createNewTask();
        taskListMethods.appendAllTasks(task);
        
        projectMethods.addToProject(task);
    };


    const removeTask = () => deleteTask(taskList); 

    const updateTask = () =>  editTask(taskList);


    return {

        addTask,
        displayAllTasks: taskListMethods.displayAllTasks,
        getProjectNames: projectMethods.getProjectNames,
        removeTask,
        updateTask
    };
}

const taskManager = TodoManager();
