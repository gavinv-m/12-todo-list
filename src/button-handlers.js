const listenForAddTaskButton = () => {
    const addTaskButton = document.querySelector('.add-task-btn');
    const dialog = document.querySelector('.create-task-dialog');

    addTaskButton.addEventListener("click", () => {
        dialog.showModal();
    });
}

export function setupClickEventListeners() {
    listenForAddTaskButton();
}
