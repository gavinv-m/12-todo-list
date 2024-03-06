import { deleteTask } from './delete-task.js';
import {countTasksInProjects} from './count-tasks'; 


function projectManager() {

    const projects = {};
    
    const numberOfTasksInAllProjects = {};

    const deleteProject = (projectName) => {

        // Check if array is empty
        const lengthOfProjectArray = projects[projectName].length;
        if (lengthOfProjectArray === 0) delete projects[projectName];
    }

    const addToProject = (task) => {

        const projectName = task["taskProject"];
        if (!projectName) return; 

        projects[projectName] = projects[projectName] || [];
        projects[projectName].push(task);

        countTasksInProjects(projects, projectName, numberOfTasksInAllProjects);
        return;
    };


    const checkIfInCorrectProject = (idNumber) => {

        for (let projectName in projects) {

            let project = projects[projectName];

            for (let task of project) {
                
                if (task.id === idNumber && task.taskProject !== projectName) {

                    addToProject(task);

                    // Delete task from previous project
                    deleteTask(projects[projectName], idNumber);

                    // Update counters
                    countTasksInProjects(projects, projectName, numberOfTasksInAllProjects);
                    countTasksInProjects(projects, task.taskProject, numberOfTasksInAllProjects);

                    // Check if old project now empty
                    deleteProject(projectName);

                }
            }
        }
    };


    const createProject = (projectName) => {

        let nameOfProject = projectName;
        projects[nameOfProject] = [];
        return;
    };


    const getNumberOfTasksInAllProjects = () => {

        for (let projectName in numberOfTasksInAllProjects) {
            
            console.table(`${projectName}: ${numberOfTasksInAllProjects[projectName]}`);
        }
        return;
    };


    const getNumberOfTasksInProject = () => {
        
        let selectedProject = prompt(`Which project would you like to see ${Object.keys(projects).join(", ")}`);

        for (let projectName in numberOfTasksInAllProjects) {
            if (projectName === selectedProject) {

                console.log(`${projectName}: ${numberOfTasksInAllProjects[projectName]}`);
                return;
            }

        }
        return;
    }


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


    const getProjectNames = () => {

        const projectNames = Object.keys(projects);
        projectNames.forEach((projectName) => {
            console.log(projectName);
        });

        return projectNames;
    };


    const removeTaskFromProject = (taskID) => {
        
        for (let projectName in projects) {

            const numberOfTasks = numberOfTasksInAllProjects[projectName];
            deleteTask(projects[projectName], taskID);
            const numberOfTasksAfter = projects[projectName].length;

            if (numberOfTasks === numberOfTasksAfter) {
                continue;
            }

            else {
                countTasksInProjects(projects, projectName, numberOfTasksInAllProjects);
                deleteProject(projectName);
            }
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
        createProject,
        getNumberOfTasksInAllProjects,
        getNumberOfTasksInProject,
        getProject,
        getProjectNames,
        removeTaskFromProject,
        sortProjectTasksByDate,
        sortProjectTasksByPriority
    };

}


export { projectManager };