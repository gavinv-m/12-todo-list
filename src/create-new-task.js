function createNewTask(taskDetails) {

    let taskName = taskDetails["taskName"];
    let day = taskDetails["day"];
    const taskDescription = taskDetails["taskDescription"];
    const taskProject = taskDetails["taskProject"];
    const priority = taskDetails["priority"];

    const task = {taskName, day, taskDescription, taskProject, priority};

    return task;
}

export { createNewTask };