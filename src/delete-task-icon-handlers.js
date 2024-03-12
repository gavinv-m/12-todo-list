
function createDeleteIcon() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svgWidth = 20;
    const svgHeight = 20;
    const color = "#fe5a4c";

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);
    svg.setAttribute("viewBox", "0 0 24 24");

    const path1 = document.createElementNS(svgNS, "path");
    path1.setAttribute("d", "M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z");
    path1.setAttribute("stroke", color);
    path1.setAttribute("stroke-width", "2");
    path1.setAttribute("stroke-linecap", "round");
    path1.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path1);

    const path2 = document.createElementNS(svgNS, "path");
    path2.setAttribute("d", "M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H10");
    path2.setAttribute("stroke", color);
    path2.setAttribute("stroke-width", "2");
    path2.setAttribute("stroke-linecap", "round");
    path2.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path2);

    const path3 = document.createElementNS(svgNS, "path");
    path3.setAttribute("d", "M15 5H17C18.1046 5 19 5.89543 19 7V12");
    path3.setAttribute("stroke", color);
    path3.setAttribute("stroke-width", "2");
    path3.setAttribute("stroke-linecap", "round");
    path3.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path3);

    const path4 = document.createElementNS(svgNS, "path");
    path4.setAttribute("d", "M14 16L16.5 18.5M19 21L16.5 18.5M16.5 18.5L19 16M16.5 18.5L14 21");
    path4.setAttribute("stroke", color);
    path4.setAttribute("stroke-width", "2");
    path4.setAttribute("stroke-linecap", "round");
    path4.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path4);

    return svg;
}


function setUpDeleteClickEvent(icon, id, dateSelected) {

    icon.addEventListener('click', () => {
        taskManager.removeTask(id);
        displayDayTasks(dateSelected);
    });
}


export { createDeleteIcon, setUpDeleteClickEvent };