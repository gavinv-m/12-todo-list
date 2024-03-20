import { displayAddProjectDialog } from './add-project-form.js'
import { setAddTaskEventListeners } from './add-task.js';


export function setupClickEventListeners() {
    
    // Create event listeners for when add button is clicked 
    setAddTaskEventListeners(); 

    // Create event listener for when add project is clicked
    const addProject = document.getElementById('add-project'); 
    addProject.addEventListener('click', () => {

        displayAddProjectDialog();
    });

    return; 
}
