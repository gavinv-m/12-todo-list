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

    const taskDescription = prompt('Enter the description of the goal: '); 
    const taskProject = prompt('Enter project name: '); 
    const priority = prompt('Enter priority level: ');

    const taskDetails = {taskName, day, taskDescription, taskProject, priority};

    return taskDetails;
}

export  { createNewTask };