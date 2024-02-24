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

    
    return {
        assignToDueDateGroup,
        getTasksByDateGroup,
        removeTaskFromDateGroup
    }
}


export { dueDateCatalog };