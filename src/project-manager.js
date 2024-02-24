import { deleteTask } from './delete-task.js';


function projectManager() {

    const projects = {};

    const deleteProject = (projectName) => {

        // Check if array is empty
        const lengthOfProjectArray = projects[projectName].length;
        if (lengthOfProjectArray === 0) delete projects[projectName];
    }

    const addToProject = (task) => {

        const projectName = task["taskProject"];

        if (projects[projectName]) projects[projectName].push(task);

        else {

            projects[projectName] = [];
            projects[projectName].push(task);
        }
    };


    const checkIfInCorrectProject = (idNumber) => {

        for (let projectName in projects) {

            let project = projects[projectName];

            for (let task of project) {
                
                if (task.id === idNumber && task.taskProject !== projectName) {

                    addToProject(task);

                    // Delete task from previous project
                    deleteTask(projects[projectName], idNumber);
                    deleteProject(projectName);

                }
            }
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

            deleteTask(projects[projectName], taskID);
            deleteProject(projectName);
        }

        
        return;
    };


    const sortProjectTasksByDate = () => {

        for (let project in projects) {

            projects[project].sort((taskOne, taskTwo) => new Date(taskOne.day) -  new Date (taskTwo.day));
        }
    }


    const sortProjectTasksByPriority = () => {

        const priorityOrder = { "high": 1, "low": 2, "none": 3 };

        for (let project in projects) {

            projects[project].sort((priorityOne, priorityTwo) => priorityOrder[priorityOne.priority] - priorityOrder[priorityTwo.priority]);
        }

    }


    return {

        addToProject,
        checkIfInCorrectProject,
        getProject,
        getProjectNames,
        removeTaskFromProject,
        sortProjectTasksByDate,
        sortProjectTasksByPriority
    };

}


export { projectManager };