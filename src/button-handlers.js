// taskModule.js
export function setupClickEventListeners() {
    const addTaskButton = document.querySelector('.add-task-btn');
    const createTaskDialog = document.querySelector('.create-task-dialog');

    addTaskButton.addEventListener("click", () => {
        createTaskDialog.style.visibility = "visible";
    });
};

