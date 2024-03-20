import { deleteTask } from './delete-task.js';


function dueDateCatalog() {

    const dueToday = {};
    const dueTomorrow = {};
    const dueSomeDay = {};

    const dateGroups = {
        dueToday,
        dueTomorrow,
        dueSomeDay
    };

    const numberOfTasksInDateGroup = {
        dueToday: 0,
        dueTomorrow: 0,
        dueSomeDay: 0
    };

    const currentDate = new Date ();
    const today = currentDate.toDateString();

    let tomorrow = new Date ();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = tomorrow.toDateString();


    const assignToDateObject = (dateObject, projectName, task) => {

        dateObject[projectName] = dateObject[projectName] || [];
        dateObject[projectName].push(task);

        return; 
    }
    

    const assignToDueDateGroup = (task) => {

        let dueDate = task.day;
        const projectName = task.taskProject;

        dueDate = new Date(dueDate);
        dueDate = dueDate.toDateString();

        dueDate === today ? (assignToDateObject(dueToday, projectName, task), numberOfTasksInDateGroup["dueToday"]++) : 
            dueDate === tomorrow ? (assignToDateObject(dueTomorrow, projectName, task), numberOfTasksInDateGroup["dueTomorrow"]++) : 
            (assignToDateObject(dueSomeDay, projectName, task), numberOfTasksInDateGroup["dueSomeDay"]++);

        return;
    };


    const checkIfInCorrectDateGroup = (taskID) => {

        const updateTaskDate = (task) => {

            let shallowCopyOfTask = { ...task };

            removeTaskFromDateGroup(taskID);
            assignToDueDateGroup(shallowCopyOfTask);

        };

        for (let dateGroupName in dateGroups) {

            const dateGroup = dateGroups[dateGroupName];
             
            for (let project of Object.values(dateGroup)) {
                for (let task of project) {

                    if (task.id === taskID) {

                        let dueDate = task.day;
                        dueDate = new Date(dueDate);
                        dueDate = dueDate.toDateString();

                        // Tech debt
                        if (dueDate === today && dateGroupName !== 'dueToday') {
                            updateTaskDate(task);
                            numberOfTasksInDateGroup[dateGroupName]--;
                            break;
                        }

                        else if (dueDate === tomorrow && dateGroupName !== 'dueTomorrow') {
                            updateTaskDate(task);
                            numberOfTasksInDateGroup[dateGroupName]--;
                            break;
                        }

                        else if ((dueDate !== today || dueDate !== tomorrow) && (dateGroupName === 'dueToday' || dateGroupName ===  'dueTomorrow')) {
                            updateTaskDate(task);
                            numberOfTasksInDateGroup[dateGroupName]--;
                            break;
                        }
                    }
                }

            }
        }
    };

    // Send array of object keys
    const getDateGroups = () => Object.keys(dateGroups);


    const getTasksByDateGroup = () => {

        let selectedDay = prompt(`Which date group do you wish to see ${Object.keys(dateGroups).join(", ")}`);
        selectedDay = dateGroups[selectedDay];

        for (let project in selectedDay) {

            console.log(`${project}:`);

            const projectArray = selectedDay[project];

            for (let task of projectArray) {
                console.log(task);
            }
        }
    };


    const getNumberOfTasksInDateGroup = () => {
        
        let selectedDay = prompt(`Which date group do you wish to see ${Object.keys(numberOfTasksInDateGroup).join(", ")}`);
        console.log(`${selectedDay}: ${numberOfTasksInDateGroup[selectedDay]}`);
        return;
    }


    const removeTaskFromDateGroup = (taskID) => {

        outer: 
        for (let dateGroupName in dateGroups) {
            
            const dateGroup = dateGroups[dateGroupName];
            
            for (let project in dateGroup) {

                const lengthOfArrayBefore = dateGroup[project].length;
                dateGroup[project] = deleteTask(dateGroup[project], taskID);

                const lengthOfArrayAfter =  dateGroup[project].length;

                if (lengthOfArrayBefore !== lengthOfArrayAfter) {

                    if (lengthOfArrayAfter === 0) delete dateGroup[project];
                    break outer;
                }
                
            }
        }
        return; 
    }


    const sendDateGroup = (dueDateName) => dateGroups[dueDateName];


    const sortDueDatesTasksByPriority = (dateGroup) => {

        const highPriority = [];
        const lowPriority = []; 
        const noPriority = [];
        
        const selectedDay = dateGroups[dateGroup];

        for (let project in selectedDay) {
            for (let task of selectedDay[project]) {

                if (task.priority === 'high') {
                    highPriority.push(task);
                }

                else if (task.priority === 'low') {
                    lowPriority.push(task);
                }

                else {
                    noPriority.push(task);
                }
            }
        }

        const priorityGroups = {
            highPriority,
            lowPriority, 
            noPriority       
        };

        for (let priority in priorityGroups) {

            console.log(priority);
            console.log(priorityGroups[priority]);
        }

        return priorityGroups;
    };

    const sortDueSomeDayByEarliest = () => {

        const tasksInDueSomeDay = [];

        for (let project in dueSomeDay) {
            for (let task of dueSomeDay[project]) {
                tasksInDueSomeDay.push(task);
            }
        }

        tasksInDueSomeDay.sort((taskOne, taskTwo) =>  new Date(taskOne.day) -  new Date (taskTwo.day));
        console.table(tasksInDueSomeDay);

        return tasksInDueSomeDay;
    }

    
    return {
        assignToDueDateGroup,
        checkIfInCorrectDateGroup,
        getDateGroups,
        getTasksByDateGroup,
        getNumberOfTasksInDateGroup,
        removeTaskFromDateGroup,
        sendDateGroup,
        sortDueDatesTasksByPriority,
        sortDueSomeDayByEarliest
    };
}

// Exports to todo-manager.js
export { dueDateCatalog };