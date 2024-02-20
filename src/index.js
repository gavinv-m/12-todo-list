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

    const dateGroups = {
        dueToday,
        dueTomorrow,
        dueSomeDay
    };


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


    const getTasksByDateGroup = (dueDateChosen) => {

        const selectedDay = dateGroups[dueDateChosen];

        for (let project in selectedDay) {

            console.log(`${project}:`);

            const projectArray = selectedDay[project];

            for (let task of projectArray) {
                console.log(task);
            }
        }
    }


    const removeTaskFromDateGroup = (taskID) => {

        outer: 
        for (let dateGroupName in dateGroups) {
            
            const dateGroup = dateGroups[dateGroupName];
            
            for (let project in dateGroup) {

                const lengthOfArrayBefore = dateGroup[project].length;
                console.log(lengthOfArrayBefore);
                dateGroup[project] = deleteTask(dateGroup[project], taskID);

                const lengthOfArrayAfter =  dateGroup[project].length;

                if (lengthOfArrayBefore !== lengthOfArrayAfter) break outer;
            }
        }

        return; 
    }

    
    return {
        assignToDueDateGroup,
        getTasksByDateGroup,
        removeTaskFromDateGroup
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


    const removeTaskFromProject = (taskID) => {
        
        for (let projectName in projects) {

            projects[projectName] = deleteTask(projects[projectName], taskID);
        }
        return;
    }


    return {

        addToProject,
        getProject,
        getProjectNames,
        removeTaskFromProject
    };

}


function editTask(arrayOfTasks, arrayWithKeys, idNumber) {

    let response = "yes";

    do {
        let editTaskDetail = prompt(`Which property would you like to edit? Choose from: ${arrayWithKeys.join(", ")}`);
        const updateDetail = prompt("What should the new value be?");

        arrayOfTasks[idNumber - 1][editTaskDetail] = updateDetail;
        console.log(arrayOfTasks[idNumber - 1]);

        response = prompt('Would you like to edit another property?');

    }
    while (response === 'yes');

    return;
}


function deleteTask(arrayOfTasks, idNumber) {

    const numberOfTasks = arrayOfTasks.length;

    for (let i = 0; i < numberOfTasks; i++) {

        if (arrayOfTasks[i]['id'] === idNumber) {

            arrayOfTasks.splice(i, 1);
            break;
        }
    }

    return arrayOfTasks;
}


function taskListManager() {

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


    const removeTask = () => {

        let taskID = Number(prompt('Enter the task id: '));

        deleteTask(taskList, taskID); 
        projectMethods.removeTaskFromProject(taskID);
        dueDateMethods.removeTaskFromDateGroup(taskID);
    }
        
    
    const updateTask = () =>  {

        const propertyNames = [];
        const objectToExtractPropNames = taskList[0];

        for (let property in objectToExtractPropNames) {

            propertyNames.push(property);
        }

        // Remove id from property names
        propertyNames.pop();

        const taskID = Number(prompt('Enter the task id: '));

        editTask(taskList, propertyNames, taskID);
    }


    return {

        addTask,
        displayAllTasks: taskListMethods.displayAllTasks,
        getProject: projectMethods.getProject,
        getProjectNames: projectMethods.getProjectNames,
        getTasksByDateGroup: dueDateMethods.getTasksByDateGroup,
        removeTask,
        updateTask
    };
}

const taskManager = TodoManager();
