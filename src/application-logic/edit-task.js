// Exports to task-list-manager.js
export function editTask(editedTask, originalTask) {

    for (let property in editedTask) {
        if (editedTask[property] !== originalTask[property]) {
            originalTask[property] = editedTask[property]; 
            continue;
        }
        continue; 
    }
    return;
}
