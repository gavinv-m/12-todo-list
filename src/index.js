function addTaskId(arrayOfTasks) {

    arrayOfTasks.forEach((currentTask, indexPosition) => {
        
        currentTask.id = indexPosition + 1;
    });

    return arrayOfTasks;
}


function createNewTask() {

    let taskName = prompt('Enter task name: ');
    while (!taskName) {
        taskName = prompt('Enter task name: ');
    }

    let day = prompt('Enter the due date in the following format: "YYYY-MM-DD": ');
    let dueDate = new Date(day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    while (dueDate < today) {
        day = prompt('Enter the due date in the following format: "YYYY-MM-DD": ');
        dueDate = new Date(day);
    }

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


    const getTasksByDateGroup = () => {

        let selectedDay = prompt(`Which date group do you wish to see ${Object.keys(dateGroups).join(", ")}`)
        selectedDay = dateGroups[selectedDay];

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


    const getProject = () => {

        let selectedProject = prompt(`Which project would you like to see ${Object.keys(projects).join(", ")}`);

        for (let projectName in projects) {

            if (projectName === selectedProject) {

                console.log(`${projectName}:`);

                // Get the array
                const projectTasks = projects[selectedProject];

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


function editTask(task) {

    let response = "yes";

    // Get property names 
    const propertyNames = [];
    for (let property in task) {

        if (property !== 'id') propertyNames.push(property);
    }

    do {
        let editTaskDetail = prompt(`Which property would you like to edit? Choose from: ${propertyNames.join(", ")}`);
        const updateDetail = prompt("What should the new value be?");

        task[editTaskDetail] = updateDetail;
        console.log(task);

        response = prompt('Would you like to edit another property?');
    }
    while (response === 'yes');

    return task;
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
    }


    return {
        appendAllTasks,
        displayAllTasks,
        getTaskList,
        updateTask
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

        const taskID = Number(prompt('Enter the task id: '));

        taskListMethods.updateTask(taskID);
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
