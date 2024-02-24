/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/create-new-task.js":
/*!********************************!*\
  !*** ./src/create-new-task.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNewTask: () => (/* binding */ createNewTask)
/* harmony export */ });
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



/***/ }),

/***/ "./src/delete-task.js":
/*!****************************!*\
  !*** ./src/delete-task.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteTask: () => (/* binding */ deleteTask)
/* harmony export */ });
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




/***/ }),

/***/ "./src/due-date-catalog.js":
/*!*********************************!*\
  !*** ./src/due-date-catalog.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dueDateCatalog: () => (/* binding */ dueDateCatalog)
/* harmony export */ });
/* harmony import */ var _delete_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delete-task.js */ "./src/delete-task.js");



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
                dateGroup[project] = (0,_delete_task_js__WEBPACK_IMPORTED_MODULE_0__.deleteTask)(dateGroup[project], taskID);

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




/***/ }),

/***/ "./src/edit-task.js":
/*!**************************!*\
  !*** ./src/edit-task.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   editTask: () => (/* binding */ editTask)
/* harmony export */ });
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




/***/ }),

/***/ "./src/project-manager.js":
/*!********************************!*\
  !*** ./src/project-manager.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   projectManager: () => (/* binding */ projectManager)
/* harmony export */ });
/* harmony import */ var _delete_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delete-task.js */ "./src/delete-task.js");


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
                    (0,_delete_task_js__WEBPACK_IMPORTED_MODULE_0__.deleteTask)(projects[projectName], idNumber);
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

            (0,_delete_task_js__WEBPACK_IMPORTED_MODULE_0__.deleteTask)(projects[projectName], taskID);
            deleteProject(projectName);
        }

        
        return;
    }; 


    return {

        addToProject,
        checkIfInCorrectProject,
        getProject,
        getProjectNames,
        removeTaskFromProject
    };

}




/***/ }),

/***/ "./src/task-list-manager.js":
/*!**********************************!*\
  !*** ./src/task-list-manager.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   taskListManager: () => (/* binding */ taskListManager)
/* harmony export */ });
/* harmony import */ var _edit_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit-task.js */ "./src/edit-task.js");



function taskListManager() {

    let allTasks = [
    ];

    let allTimeTasksCreated = 0;

    const addTaskId = (task) => {

        allTimeTasksCreated++;
        task.id = allTimeTasksCreated;
    };

    const appendAllTasks = (task) => {
        allTasks.push(task);
        addTaskId(task);

    };


    const displayAllTasks = () => {

        console.table(allTasks);
    };


    const getTaskList = () => allTasks;


    const updateTask = (taskIDNum) => {

        for (let task of allTasks) {

            if (task.id === taskIDNum) {

                task = (0,_edit_task_js__WEBPACK_IMPORTED_MODULE_0__.editTask)(task);
                break;
            }
        }
    }; 


    return {
        appendAllTasks,
        displayAllTasks,
        getTaskList,
        updateTask
    };
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_new_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-new-task.js */ "./src/create-new-task.js");
/* harmony import */ var _task_list_manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task-list-manager.js */ "./src/task-list-manager.js");
/* harmony import */ var _project_manager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project-manager.js */ "./src/project-manager.js");
/* harmony import */ var _due_date_catalog_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./due-date-catalog.js */ "./src/due-date-catalog.js");
/* harmony import */ var _delete_task__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./delete-task */ "./src/delete-task.js");






function TodoManager() {

    const taskListMethods = (0,_task_list_manager_js__WEBPACK_IMPORTED_MODULE_1__.taskListManager)();
    const taskList = taskListMethods.getTaskList();

    const projectMethods = (0,_project_manager_js__WEBPACK_IMPORTED_MODULE_2__.projectManager)();

    const dueDateMethods = (0,_due_date_catalog_js__WEBPACK_IMPORTED_MODULE_3__.dueDateCatalog)();

    const addTask = () => {

        const task = (0,_create_new_task_js__WEBPACK_IMPORTED_MODULE_0__.createNewTask)();
        taskListMethods.appendAllTasks(task);
        
        projectMethods.addToProject(task);

        dueDateMethods.assignToDueDateGroup(task);
    };


    const removeTask = () => {

        let taskID = Number(prompt('Enter the task id: '));

        (0,_delete_task__WEBPACK_IMPORTED_MODULE_4__.deleteTask)(taskList, taskID); 
        projectMethods.removeTaskFromProject(taskID);
        dueDateMethods.removeTaskFromDateGroup(taskID);
    }
        

    const updateTask = () =>  {

        const taskID = Number(prompt('Enter the task id: '));

        taskListMethods.updateTask(taskID);
        projectMethods.checkIfInCorrectProject(taskID);
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

// Attach taskManager to the window object
window.taskManager = taskManager;
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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M0M7O0FBRUEsNEJBQTRCLHNFQUFlO0FBQzNDOztBQUVBLDJCQUEyQixtRUFBYzs7QUFFekMsMkJBQTJCLG9FQUFjOztBQUV6Qzs7QUFFQSxxQkFBcUIsa0VBQWE7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBLFFBQVEsd0RBQVU7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxpQyIsInNvdXJjZXMiOlsid2VicGFjazovLzEyLXRvZG8tbGlzdC8uL3NyYy9jcmVhdGUtbmV3LXRhc2suanMiLCJ3ZWJwYWNrOi8vMTItdG9kby1saXN0Ly4vc3JjL2RlbGV0ZS10YXNrLmpzIiwid2VicGFjazovLzEyLXRvZG8tbGlzdC8uL3NyYy9kdWUtZGF0ZS1jYXRhbG9nLmpzIiwid2VicGFjazovLzEyLXRvZG8tbGlzdC8uL3NyYy9lZGl0LXRhc2suanMiLCJ3ZWJwYWNrOi8vMTItdG9kby1saXN0Ly4vc3JjL3Byb2plY3QtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8xMi10b2RvLWxpc3QvLi9zcmMvdGFzay1saXN0LW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vMTItdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLzEyLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vMTItdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vMTItdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vMTItdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZU5ld1Rhc2soKSB7XG5cbiAgICBsZXQgdGFza05hbWUgPSBwcm9tcHQoJ0VudGVyIHRhc2sgbmFtZTogJyk7XG4gICAgd2hpbGUgKCF0YXNrTmFtZSkge1xuICAgICAgICB0YXNrTmFtZSA9IHByb21wdCgnRW50ZXIgdGFzayBuYW1lOiAnKTtcbiAgICB9XG5cbiAgICBsZXQgZGF5ID0gcHJvbXB0KCdFbnRlciB0aGUgZHVlIGRhdGUgaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6IFwiWVlZWS1NTS1ERFwiOiAnKTtcbiAgICBsZXQgZHVlRGF0ZSA9IG5ldyBEYXRlKGRheSk7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHRvZGF5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgd2hpbGUgKGR1ZURhdGUgPCB0b2RheSkge1xuICAgICAgICBkYXkgPSBwcm9tcHQoJ0VudGVyIHRoZSBkdWUgZGF0ZSBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDogXCJZWVlZLU1NLUREXCI6ICcpO1xuICAgICAgICBkdWVEYXRlID0gbmV3IERhdGUoZGF5KTtcbiAgICB9XG5cbiAgICAvLyBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBwcm9tcHQoJ0VudGVyIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgZ29hbDogJyk7IFxuICAgIGNvbnN0IHRhc2tQcm9qZWN0ID0gcHJvbXB0KCdFbnRlciBwcm9qZWN0IG5hbWU6ICcpOyBcbiAgICAvLyBjb25zdCBwcmlvcml0eSA9IHByb21wdCgnRW50ZXIgcHJpb3JpdHkgbGV2ZWw6ICcpO1xuXG4gICAgLy8gY29uc3QgdGFza0RldGFpbHMgPSB7dGFza05hbWUsIGRheSwgdGFza0Rlc2NyaXB0aW9uLCB0YXNrUHJvamVjdCwgcHJpb3JpdHl9O1xuICAgIGNvbnN0IHRhc2tEZXRhaWxzID0ge3Rhc2tOYW1lLCBkYXksIHRhc2tQcm9qZWN0fTtcblxuICAgIHJldHVybiB0YXNrRGV0YWlscztcbn1cblxuZXhwb3J0ICB7IGNyZWF0ZU5ld1Rhc2sgfTsiLCJmdW5jdGlvbiBkZWxldGVUYXNrKGFycmF5T2ZUYXNrcywgaWROdW1iZXIpIHtcblxuICAgIGNvbnN0IG51bWJlck9mVGFza3MgPSBhcnJheU9mVGFza3MubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZlRhc2tzOyBpKyspIHtcblxuICAgICAgICBpZiAoYXJyYXlPZlRhc2tzW2ldWydpZCddID09PSBpZE51bWJlcikge1xuXG4gICAgICAgICAgICBhcnJheU9mVGFza3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXlPZlRhc2tzO1xufVxuXG5cbmV4cG9ydCB7IGRlbGV0ZVRhc2sgfTsiLCJpbXBvcnQgeyBkZWxldGVUYXNrIH0gZnJvbSAnLi9kZWxldGUtdGFzay5qcyc7XG5cblxuZnVuY3Rpb24gZHVlRGF0ZUNhdGFsb2coKSB7XG5cbiAgICBjb25zdCBkdWVUb2RheSA9IHt9O1xuICAgIGNvbnN0IGR1ZVRvbW9ycm93ID0ge307XG4gICAgY29uc3QgZHVlU29tZURheSA9IHt9O1xuXG4gICAgY29uc3QgZGF0ZUdyb3VwcyA9IHtcbiAgICAgICAgZHVlVG9kYXksXG4gICAgICAgIGR1ZVRvbW9ycm93LFxuICAgICAgICBkdWVTb21lRGF5XG4gICAgfTtcblxuXG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSAoKTtcbiAgICBjb25zdCB0b2RheSA9IGN1cnJlbnREYXRlLnRvRGF0ZVN0cmluZygpO1xuXG4gICAgbGV0IHRvbW9ycm93ID0gbmV3IERhdGUgKCk7XG4gICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcbiAgICB0b21vcnJvdyA9IHRvbW9ycm93LnRvRGF0ZVN0cmluZygpO1xuXG5cbiAgICBjb25zdCBhc3NpZ25Ub0RhdGVPYmplY3QgPSAoZGF0ZU9iamVjdCwgcHJvamVjdE5hbWUsIHRhc2spID0+IHtcbiAgICBcbiAgICAgICAgaWYgKGRhdGVPYmplY3RbcHJvamVjdE5hbWVdKSBkYXRlT2JqZWN0W3Byb2plY3ROYW1lXS5wdXNoKHRhc2spO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGVPYmplY3RbcHJvamVjdE5hbWVdID0gW107XG4gICAgICAgICAgICBkYXRlT2JqZWN0W3Byb2plY3ROYW1lXS5wdXNoKHRhc2spO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuXG4gICAgY29uc3QgYXNzaWduVG9EdWVEYXRlR3JvdXAgPSAodGFzaykgPT4ge1xuXG4gICAgICAgIGxldCBkdWVEYXRlID0gdGFzay5kYXk7XG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gdGFzay50YXNrUHJvamVjdDtcblxuICAgICAgICBkdWVEYXRlID0gbmV3IERhdGUoZHVlRGF0ZSk7XG4gICAgICAgIGR1ZURhdGUgPSBkdWVEYXRlLnRvRGF0ZVN0cmluZygpO1xuXG4gICAgICAgIGR1ZURhdGUgPT09IHRvZGF5ID8gYXNzaWduVG9EYXRlT2JqZWN0KGR1ZVRvZGF5LCBwcm9qZWN0TmFtZSwgdGFzaykgOiBcbiAgICAgICAgICAgIGR1ZURhdGUgPT09IHRvbW9ycm93ID8gYXNzaWduVG9EYXRlT2JqZWN0KGR1ZVRvbW9ycm93LCBwcm9qZWN0TmFtZSwgdGFzaykgOiBcbiAgICAgICAgICAgIGFzc2lnblRvRGF0ZU9iamVjdChkdWVTb21lRGF5LCBwcm9qZWN0TmFtZSwgdGFzayk7XG4gICAgfVxuXG5cbiAgICBjb25zdCBnZXRUYXNrc0J5RGF0ZUdyb3VwID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCBzZWxlY3RlZERheSA9IHByb21wdChgV2hpY2ggZGF0ZSBncm91cCBkbyB5b3Ugd2lzaCB0byBzZWUgJHtPYmplY3Qua2V5cyhkYXRlR3JvdXBzKS5qb2luKFwiLCBcIil9YClcbiAgICAgICAgc2VsZWN0ZWREYXkgPSBkYXRlR3JvdXBzW3NlbGVjdGVkRGF5XTtcblxuICAgICAgICBmb3IgKGxldCBwcm9qZWN0IGluIHNlbGVjdGVkRGF5KSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke3Byb2plY3R9OmApO1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0QXJyYXkgPSBzZWxlY3RlZERheVtwcm9qZWN0XTtcblxuICAgICAgICAgICAgZm9yIChsZXQgdGFzayBvZiBwcm9qZWN0QXJyYXkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0YXNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgcmVtb3ZlVGFza0Zyb21EYXRlR3JvdXAgPSAodGFza0lEKSA9PiB7XG5cbiAgICAgICAgb3V0ZXI6IFxuICAgICAgICBmb3IgKGxldCBkYXRlR3JvdXBOYW1lIGluIGRhdGVHcm91cHMpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZGF0ZUdyb3VwID0gZGF0ZUdyb3Vwc1tkYXRlR3JvdXBOYW1lXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgcHJvamVjdCBpbiBkYXRlR3JvdXApIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGxlbmd0aE9mQXJyYXlCZWZvcmUgPSBkYXRlR3JvdXBbcHJvamVjdF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGRhdGVHcm91cFtwcm9qZWN0XSA9IGRlbGV0ZVRhc2soZGF0ZUdyb3VwW3Byb2plY3RdLCB0YXNrSUQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbGVuZ3RoT2ZBcnJheUFmdGVyID0gIGRhdGVHcm91cFtwcm9qZWN0XS5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBpZiAobGVuZ3RoT2ZBcnJheUJlZm9yZSAhPT0gbGVuZ3RoT2ZBcnJheUFmdGVyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlbmd0aE9mQXJyYXlBZnRlciA9PT0gMCkgZGVsZXRlIGRhdGVHcm91cFtwcm9qZWN0XTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWsgb3V0ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuOyBcbiAgICB9XG5cbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICBhc3NpZ25Ub0R1ZURhdGVHcm91cCxcbiAgICAgICAgZ2V0VGFza3NCeURhdGVHcm91cCxcbiAgICAgICAgcmVtb3ZlVGFza0Zyb21EYXRlR3JvdXBcbiAgICB9XG59XG5cblxuZXhwb3J0IHsgZHVlRGF0ZUNhdGFsb2cgfTsiLCJmdW5jdGlvbiBlZGl0VGFzayh0YXNrKSB7XG5cbiAgICBsZXQgcmVzcG9uc2UgPSBcInllc1wiO1xuXG4gICAgLy8gR2V0IHByb3BlcnR5IG5hbWVzIFxuICAgIGNvbnN0IHByb3BlcnR5TmFtZXMgPSBbXTtcbiAgICBmb3IgKGxldCBwcm9wZXJ0eSBpbiB0YXNrKSB7XG5cbiAgICAgICAgaWYgKHByb3BlcnR5ICE9PSAnaWQnKSBwcm9wZXJ0eU5hbWVzLnB1c2gocHJvcGVydHkpO1xuICAgIH1cblxuICAgIGRvIHtcbiAgICAgICAgbGV0IGVkaXRUYXNrRGV0YWlsID0gcHJvbXB0KGBXaGljaCBwcm9wZXJ0eSB3b3VsZCB5b3UgbGlrZSB0byBlZGl0PyBDaG9vc2UgZnJvbTogJHtwcm9wZXJ0eU5hbWVzLmpvaW4oXCIsIFwiKX1gKTtcbiAgICAgICAgY29uc3QgdXBkYXRlRGV0YWlsID0gcHJvbXB0KFwiV2hhdCBzaG91bGQgdGhlIG5ldyB2YWx1ZSBiZT9cIik7XG5cbiAgICAgICAgdGFza1tlZGl0VGFza0RldGFpbF0gPSB1cGRhdGVEZXRhaWw7XG4gICAgICAgIGNvbnNvbGUubG9nKHRhc2spO1xuXG4gICAgICAgIHJlc3BvbnNlID0gcHJvbXB0KCdXb3VsZCB5b3UgbGlrZSB0byBlZGl0IGFub3RoZXIgcHJvcGVydHk/Jyk7XG4gICAgfVxuICAgIHdoaWxlIChyZXNwb25zZSA9PT0gJ3llcycpO1xuXG4gICAgcmV0dXJuIHRhc2s7XG59XG5cblxuZXhwb3J0IHsgZWRpdFRhc2sgfTsiLCJpbXBvcnQgeyBkZWxldGVUYXNrIH0gZnJvbSAnLi9kZWxldGUtdGFzay5qcyc7XG5cbmZ1bmN0aW9uIHByb2plY3RNYW5hZ2VyKCkge1xuXG4gICAgY29uc3QgcHJvamVjdHMgPSB7fTtcblxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAocHJvamVjdE5hbWUpID0+IHtcblxuICAgICAgICAvLyBDaGVjayBpZiBhcnJheSBpcyBlbXB0eVxuICAgICAgICBjb25zdCBsZW5ndGhPZlByb2plY3RBcnJheSA9IHByb2plY3RzW3Byb2plY3ROYW1lXS5sZW5ndGg7XG4gICAgICAgIGlmIChsZW5ndGhPZlByb2plY3RBcnJheSA9PT0gMCkgZGVsZXRlIHByb2plY3RzW3Byb2plY3ROYW1lXTtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRUb1Byb2plY3QgPSAodGFzaykgPT4ge1xuXG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gdGFza1tcInRhc2tQcm9qZWN0XCJdO1xuXG4gICAgICAgIGlmIChwcm9qZWN0c1twcm9qZWN0TmFtZV0pIHByb2plY3RzW3Byb2plY3ROYW1lXS5wdXNoKHRhc2spO1xuXG4gICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICBwcm9qZWN0c1twcm9qZWN0TmFtZV0gPSBbXTtcbiAgICAgICAgICAgIHByb2plY3RzW3Byb2plY3ROYW1lXS5wdXNoKHRhc2spO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgY29uc3QgY2hlY2tJZkluQ29ycmVjdFByb2plY3QgPSAoaWROdW1iZXIpID0+IHtcblxuICAgICAgICBmb3IgKGxldCBwcm9qZWN0TmFtZSBpbiBwcm9qZWN0cykge1xuXG4gICAgICAgICAgICBsZXQgcHJvamVjdCA9IHByb2plY3RzW3Byb2plY3ROYW1lXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgdGFzayBvZiBwcm9qZWN0KSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRhc2suaWQgPT09IGlkTnVtYmVyICYmIHRhc2sudGFza1Byb2plY3QgIT09IHByb2plY3ROYW1lKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgYWRkVG9Qcm9qZWN0KHRhc2spO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIERlbGV0ZSB0YXNrIGZyb20gcHJldmlvdXMgcHJvamVjdFxuICAgICAgICAgICAgICAgICAgICBkZWxldGVUYXNrKHByb2plY3RzW3Byb2plY3ROYW1lXSwgaWROdW1iZXIpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIGNvbnN0IGdldFByb2plY3ROYW1lcyA9ICgpID0+IHtcblxuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZXMgPSBPYmplY3Qua2V5cyhwcm9qZWN0cyk7XG5cbiAgICAgICAgcHJvamVjdE5hbWVzLmZvckVhY2goKHByb2plY3ROYW1lKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2plY3ROYW1lKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG5cblxuICAgIGNvbnN0IGdldFByb2plY3QgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkUHJvamVjdCA9IHByb21wdChgV2hpY2ggcHJvamVjdCB3b3VsZCB5b3UgbGlrZSB0byBzZWUgJHtPYmplY3Qua2V5cyhwcm9qZWN0cykuam9pbihcIiwgXCIpfWApO1xuXG4gICAgICAgIGZvciAobGV0IHByb2plY3ROYW1lIGluIHByb2plY3RzKSB7XG5cbiAgICAgICAgICAgIGlmIChwcm9qZWN0TmFtZSA9PT0gc2VsZWN0ZWRQcm9qZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtwcm9qZWN0TmFtZX06YCk7XG5cbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdFRhc2tzID0gcHJvamVjdHNbc2VsZWN0ZWRQcm9qZWN0XTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IHRhc2sgb2YgcHJvamVjdFRhc2tzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGFzayk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG5cblxuICAgIGNvbnN0IHJlbW92ZVRhc2tGcm9tUHJvamVjdCA9ICh0YXNrSUQpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IHByb2plY3ROYW1lIGluIHByb2plY3RzKSB7XG5cbiAgICAgICAgICAgIGRlbGV0ZVRhc2socHJvamVjdHNbcHJvamVjdE5hbWVdLCB0YXNrSUQpO1xuICAgICAgICAgICAgZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgcmV0dXJuO1xuICAgIH07IFxuXG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGFkZFRvUHJvamVjdCxcbiAgICAgICAgY2hlY2tJZkluQ29ycmVjdFByb2plY3QsXG4gICAgICAgIGdldFByb2plY3QsXG4gICAgICAgIGdldFByb2plY3ROYW1lcyxcbiAgICAgICAgcmVtb3ZlVGFza0Zyb21Qcm9qZWN0XG4gICAgfTtcblxufVxuXG5cbmV4cG9ydCB7IHByb2plY3RNYW5hZ2VyIH07IiwiaW1wb3J0ICB7IGVkaXRUYXNrIH0gZnJvbSAnLi9lZGl0LXRhc2suanMnO1xuXG5cbmZ1bmN0aW9uIHRhc2tMaXN0TWFuYWdlcigpIHtcblxuICAgIGxldCBhbGxUYXNrcyA9IFtcbiAgICBdO1xuXG4gICAgbGV0IGFsbFRpbWVUYXNrc0NyZWF0ZWQgPSAwO1xuXG4gICAgY29uc3QgYWRkVGFza0lkID0gKHRhc2spID0+IHtcblxuICAgICAgICBhbGxUaW1lVGFza3NDcmVhdGVkKys7XG4gICAgICAgIHRhc2suaWQgPSBhbGxUaW1lVGFza3NDcmVhdGVkO1xuICAgIH07XG5cbiAgICBjb25zdCBhcHBlbmRBbGxUYXNrcyA9ICh0YXNrKSA9PiB7XG4gICAgICAgIGFsbFRhc2tzLnB1c2godGFzayk7XG4gICAgICAgIGFkZFRhc2tJZCh0YXNrKTtcblxuICAgIH07XG5cblxuICAgIGNvbnN0IGRpc3BsYXlBbGxUYXNrcyA9ICgpID0+IHtcblxuICAgICAgICBjb25zb2xlLnRhYmxlKGFsbFRhc2tzKTtcbiAgICB9O1xuXG5cbiAgICBjb25zdCBnZXRUYXNrTGlzdCA9ICgpID0+IGFsbFRhc2tzO1xuXG5cbiAgICBjb25zdCB1cGRhdGVUYXNrID0gKHRhc2tJRE51bSkgPT4ge1xuXG4gICAgICAgIGZvciAobGV0IHRhc2sgb2YgYWxsVGFza3MpIHtcblxuICAgICAgICAgICAgaWYgKHRhc2suaWQgPT09IHRhc2tJRE51bSkge1xuXG4gICAgICAgICAgICAgICAgdGFzayA9IGVkaXRUYXNrKHRhc2spO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTsgXG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIGFwcGVuZEFsbFRhc2tzLFxuICAgICAgICBkaXNwbGF5QWxsVGFza3MsXG4gICAgICAgIGdldFRhc2tMaXN0LFxuICAgICAgICB1cGRhdGVUYXNrXG4gICAgfTtcbn1cblxuZXhwb3J0IHsgdGFza0xpc3RNYW5hZ2VyIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVOZXdUYXNrIH0gZnJvbSAnLi9jcmVhdGUtbmV3LXRhc2suanMnO1xuaW1wb3J0IHsgdGFza0xpc3RNYW5hZ2VyIH0gZnJvbSAnLi90YXNrLWxpc3QtbWFuYWdlci5qcyc7XG5pbXBvcnQgIHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5qcyc7XG5pbXBvcnQgIHsgZHVlRGF0ZUNhdGFsb2cgfSBmcm9tICcuL2R1ZS1kYXRlLWNhdGFsb2cuanMnO1xuaW1wb3J0IHsgZGVsZXRlVGFzayB9IGZyb20gJy4vZGVsZXRlLXRhc2snO1xuXG5mdW5jdGlvbiBUb2RvTWFuYWdlcigpIHtcblxuICAgIGNvbnN0IHRhc2tMaXN0TWV0aG9kcyA9IHRhc2tMaXN0TWFuYWdlcigpO1xuICAgIGNvbnN0IHRhc2tMaXN0ID0gdGFza0xpc3RNZXRob2RzLmdldFRhc2tMaXN0KCk7XG5cbiAgICBjb25zdCBwcm9qZWN0TWV0aG9kcyA9IHByb2plY3RNYW5hZ2VyKCk7XG5cbiAgICBjb25zdCBkdWVEYXRlTWV0aG9kcyA9IGR1ZURhdGVDYXRhbG9nKCk7XG5cbiAgICBjb25zdCBhZGRUYXNrID0gKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRhc2sgPSBjcmVhdGVOZXdUYXNrKCk7XG4gICAgICAgIHRhc2tMaXN0TWV0aG9kcy5hcHBlbmRBbGxUYXNrcyh0YXNrKTtcbiAgICAgICAgXG4gICAgICAgIHByb2plY3RNZXRob2RzLmFkZFRvUHJvamVjdCh0YXNrKTtcblxuICAgICAgICBkdWVEYXRlTWV0aG9kcy5hc3NpZ25Ub0R1ZURhdGVHcm91cCh0YXNrKTtcbiAgICB9O1xuXG5cbiAgICBjb25zdCByZW1vdmVUYXNrID0gKCkgPT4ge1xuXG4gICAgICAgIGxldCB0YXNrSUQgPSBOdW1iZXIocHJvbXB0KCdFbnRlciB0aGUgdGFzayBpZDogJykpO1xuXG4gICAgICAgIGRlbGV0ZVRhc2sodGFza0xpc3QsIHRhc2tJRCk7IFxuICAgICAgICBwcm9qZWN0TWV0aG9kcy5yZW1vdmVUYXNrRnJvbVByb2plY3QodGFza0lEKTtcbiAgICAgICAgZHVlRGF0ZU1ldGhvZHMucmVtb3ZlVGFza0Zyb21EYXRlR3JvdXAodGFza0lEKTtcbiAgICB9XG4gICAgICAgIFxuXG4gICAgY29uc3QgdXBkYXRlVGFzayA9ICgpID0+ICB7XG5cbiAgICAgICAgY29uc3QgdGFza0lEID0gTnVtYmVyKHByb21wdCgnRW50ZXIgdGhlIHRhc2sgaWQ6ICcpKTtcblxuICAgICAgICB0YXNrTGlzdE1ldGhvZHMudXBkYXRlVGFzayh0YXNrSUQpO1xuICAgICAgICBwcm9qZWN0TWV0aG9kcy5jaGVja0lmSW5Db3JyZWN0UHJvamVjdCh0YXNrSUQpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBhZGRUYXNrLFxuICAgICAgICBkaXNwbGF5QWxsVGFza3M6IHRhc2tMaXN0TWV0aG9kcy5kaXNwbGF5QWxsVGFza3MsXG4gICAgICAgIGdldFByb2plY3Q6IHByb2plY3RNZXRob2RzLmdldFByb2plY3QsXG4gICAgICAgIGdldFByb2plY3ROYW1lczogcHJvamVjdE1ldGhvZHMuZ2V0UHJvamVjdE5hbWVzLFxuICAgICAgICBnZXRUYXNrc0J5RGF0ZUdyb3VwOiBkdWVEYXRlTWV0aG9kcy5nZXRUYXNrc0J5RGF0ZUdyb3VwLFxuICAgICAgICByZW1vdmVUYXNrLFxuICAgICAgICB1cGRhdGVUYXNrXG4gICAgfTtcbn1cblxuY29uc3QgdGFza01hbmFnZXIgPSBUb2RvTWFuYWdlcigpO1xuXG4vLyBBdHRhY2ggdGFza01hbmFnZXIgdG8gdGhlIHdpbmRvdyBvYmplY3RcbndpbmRvdy50YXNrTWFuYWdlciA9IHRhc2tNYW5hZ2VyOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==