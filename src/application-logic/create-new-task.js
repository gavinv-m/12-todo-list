// Exports to todo-manager.js when working on application only
// Redundant
export function createNewTask(taskDetails) {

    let taskName = taskDetails["taskName"];
    let day = taskDetails["day"];
    const taskDescription = taskDetails["taskDescription"];
    const taskProject = taskDetails["taskProject"];
    const priority = taskDetails["priority"];

    const task = {taskName, day, taskDescription, taskProject, priority};

    return task;
}