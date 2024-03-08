import { taskManager } from './todo-manager.js';


function randomRgbColor() {
    let r = Math.floor(Math.random() * 256); // Random between 0-255
    let g = Math.floor(Math.random() * 256); // Random between 0-255
    let b = Math.floor(Math.random() * 256); // Random between 0-255
    return 'rgb(' + r + ',' + g + ',' + b + ')';
};


function createCircle() {
    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const color = randomRgbColor();

    // Set attributes
    svg.setAttribute("width", "20px");
    svg.setAttribute("height", "20px");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", color);

    // Create path element
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    // Set path attributes
    path.setAttribute("d", "M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z");
    path.setAttribute("stroke", color);
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");

    // Append path to SVG
    svg.appendChild(path);

    return svg;
}


export function displayProject() {

    const arrayOfProjectNames = taskManager.getProjectNames();
    const projectToAdd = arrayOfProjectNames[arrayOfProjectNames.length - 1];

    const projectsList = document.querySelector('.projects-container');

    const project = document.createElement('div');
    project.setAttribute('class', 'project');

    const circle = createCircle();
    project.appendChild(circle); 

    const projectName = document.createElement('h2');
    projectName.textContent = projectToAdd;
    project.appendChild(projectName);
    
    const numberOfTasksInProject = document.createElement('h6');
    project.appendChild(numberOfTasksInProject);

    projectsList.appendChild(project);

    return;
}