import { createDeleteIcon, setUpDeleteClickEvent } from './delete-task-icon-handlers.js'


let createTaskMixin = {
    addTaskName() {
        const taskName = document.createElement('h2');
        taskName.textContent = this.currentTask.taskName;
        this.task.appendChild(taskName);
    }, 

    addDeleteButton(dateSelected) {
        const deleteSVG = createDeleteIcon();
        deleteSVG.classList.add('delete-task');
        setUpDeleteClickEvent(deleteSVG, this.currentTask.id, dateSelected);

        // Append task container 
        this.task.appendChild(deleteSVG);
    }
}

export class TaskDisplayHandler {
    // TODO: Add innerContainer to HTML
	constructor(innerContainer) {
        this.innerContainer = document.querySelector(innerContainer);
        this.containerWithTasksAndHeading = null;
        this.heading = null;
        this.containerWithTasks = null; 
        this.task = null;
        this.currentTask = null;

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

        // Update current task object 
        this.currentTask = task;
    }
    
    // Append the list of tasks to the container with a heading
    appendTasksToProjectContainer() {
        this.containerWithTasksAndHeading.appendChild(this.containerWithTasks); 
    }
    
    
    appendToInnerContainer() {
        this.innerContainer.appendChild(this.containerWithTasksAndHeading);
    }
}

Object.assign(TaskDisplayHandler.prototype, createTaskMixin);
