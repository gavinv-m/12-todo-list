class TaskDialogHandler {
    constructor(dialogClass) {
        this.dialog = document.querySelector(dialogClass);
    }

    listenForAddTaskButton(addTaskBtnClass) {
        const addTaskButton = document.querySelector(addTaskBtnClass);
        addTaskButton.addEventListener("click", () => {
            this.dialog.showModal();
        });
    }

    listenForCancelFormButton(cancelFormBtnClass) {
        const cancelFormButton = document.querySelector(cancelFormBtnClass);
        cancelFormButton.addEventListener("click", (event) => {
            event.preventDefault(); // Page was flickering
            this.dialog.close();
          });
    }
}


export function setupClickEventListeners() {
    const taskDialogHandler = new TaskDialogHandler('.create-task-dialog');

    taskDialogHandler.listenForAddTaskButton('.add-task-btn');
    taskDialogHandler.listenForCancelFormButton('.cancel-form-sub');    
}
