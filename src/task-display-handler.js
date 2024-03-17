import { createDeleteIcon, setUpDeleteClickEvent } from './delete-task-icon-handlers.js'


export class TaskDisplayHandler {
    // TODO: Add innerContainer to HTML
	constructor(displayContainer, innerContainer) {
        this.displayContainer = document.querySelector(displayContainer); 
        this.innerContainer = document.querySelector(innerContainer);
        this.containerWithTasksAndHeading = null;
        this.heading = null;
        this.containerWithTasks = null; 
        this.task = null;

    }

	//TODO: Clear out anything in innerContainer
    clearInnerContainer() {
        while (this.innerContainer.firstChild) {
            this.innerContainer.removeChild(this.innerContainer.firstChild);
        }
    }

    
    createContainerWithTasksAndHeading(classList) {
        this.containerWithTasksAndHeading = document.createElement('div');
        this.containerWithTasksAndHeading.classList.add(classList);
    }
    
    
    createHeading(classList, headingName) {
        this.heading =  document.createElement('div');
        this.heading.classList.add(classList); 
        this.heading.textContent = headingName; 
        this.containerWithTasksAndHeading.appendChild(this.heading);
    }
    
    
    createContainerWithTasks(classList) {
        this.containerWithTasks = document.createElement('div');
        this.containerWithTasks.classList.add(classList);
    }
    
    
    createTask(classList, task, dateSelected) {
        // 'task' parameter represents an object 
        this.task = document.createElement('div');
        this.task.classList.add(classList);
        
        const taskName = document.createElement('h2');
        taskName.textContent = task.taskName;
        this.task.appendChild(taskName);
        
        const deleteSVG = createDeleteIcon();
        deleteSVG.classList.add('delete-task');
        setUpDeleteClickEvent(deleteSVG, task.id, dateSelected);
        
        // Append task container 
        this.task.appendChild(deleteSVG);
        
        // Append new task to list of tasks
        this.containerWithTasks.appendChild(this.task); 
    }
    
    // Append the list of tasks to the container with a heading
    appendTasksToProjectContainer() {
        this.containerWithTasksAndHeading.appendChild(this.containerWithTasks); 
    }
    
    
    appendToInnerContainer() {
        this.innerContainer.appendChild(this.containerWithTasksAndHeading);
    }
    
    appendToDisplayContainer() {
        this.displayContainer.appendChild(this.innerContainer);
    }
    
}