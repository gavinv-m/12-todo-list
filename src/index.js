function addTaskId(arrayOfTasks) {

    arrayOfTasks.forEach((currentTask, indexPosition) => {
        
        currentTask.id = indexPosition + 1;
    });

    return arrayOfTasks;
}


function createNewTask() {

    const taskName = prompt('Enter task name: ');
    const day = prompt('Enter the due date in the following format: "YYYY-MM-DD": ');
    // const taskDescription = prompt('Enter the description of the goal: '); 
    const taskProject = prompt('Enter project name: '); 
    // const priority = prompt('Enter priority level: ');

    // const taskDetails = {taskName, day, taskDescription, taskProject, priority};

    const taskDetails = {taskName, day, taskProject};

    return taskDetails;

}


function dueDateCatalog() {

    const dueToday = {};
    const dueTomorrow = {};
    const dueSomeDay = {};


    const currentDate = new Date ();
    const today = currentDate.toDateString();

    let tomorrow = new Date ();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = tomorrow.toDateString();


    const assignToDateObject = (dateObject, projectName, task) => {
    
        if (dateObject[projectName]) dateObject[projectName].push(task);
        else {
            dateObject[projectName] = [];
            dateObject[projectName].push(task);
        }
        
        console.log(dateObject);
    }
    
    
    const assignToDueDateGroup = (task) => {

        let dueDate = task.day;
        const projectName = task.taskProject;

        dueDate = new Date(dueDate);
        dueDate = dueDate.toDateString();

        dueDate === today ? assignToDateObject(dueToday, projectName, task) : 
            dueDate === tomorrow ? assignToDateObject(dueTomorrow, projectName, task) : 
            assignToDateObject(dueSomeDay, projectName, task);
    }

    
    return {
        assignToDueDateGroup,
    }
}


function projectManager() {

    const projects = {};

    const addToProject = (task) => {

        const projectName = task["taskProject"];

        if (projects[projectName]) projects[projectName].push(task);

        else {

            projects[projectName] = [];
            projects[projectName].push(task);
        }

    };


    const getProjectNames = () => {

        const projectNames = Object.keys(projects);

        projectNames.forEach((projectName) => {

            console.log(projectName);
        });

        return;
    };


    const getProject = (project) => {

        console.log('I work');

        for (let projectName in projects) {

            if (projectName === project) {

                console.log(`${projectName}:`);

                // Get the array
                const projectTasks = projects[project];

                for (let task of projectTasks) {

                    console.log(task);
                }

                return;
            }
        }

        return;
    };


    return {

        addToProject,
        getProject,
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

    const projectMethods = projectManager();

    const dueDateMethods = dueDateCatalog();

    const addTask = () => {

        const task = createNewTask();
        taskListMethods.appendAllTasks(task);
        
        projectMethods.addToProject(task);

        dueDateMethods.assignToDueDateGroup(task);
    };


    const removeTask = () => deleteTask(taskList); 

    const updateTask = () =>  editTask(taskList);


    return {

        addTask,
        displayAllTasks: taskListMethods.displayAllTasks,
        getProject: projectMethods.getProject,
        getProjectNames: projectMethods.getProjectNames,
        removeTask,
        updateTask
    };
}

const taskManager = TodoManager();
