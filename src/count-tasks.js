function countTasks(projects, projectName, numberOfTasksInAllProjects) {

    const taskCountInProject = projects[projectName].length;

    if (taskCountInProject === 0) {
        delete numberOfTasksInAllProjects[projectName];
    }

    else {
        numberOfTasksInAllProjects[projectName] = taskCountInProject;
    }
}

export {countTasks};