function createTodaySVG() {

    // Create a new SVG element
    const svg = document.querySelector('.today-svg');
    svg.setAttribute("class", "today-svg");
    svg.setAttribute("fill", "#000000");
    svg.setAttribute("width", "20px");
    svg.setAttribute("height", "20px");
    svg.setAttribute("viewBox", "0 0 24 24");

    // Create a new 'g' element
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("id", "Calendar_Date");

    // Create the first 'path' element
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M18.435,4.955h-1.94v-1.41c0-0.26-0.23-0.51-0.5-0.5c-0.27,0.01-0.5,0.22-0.5,0.5v1.41h-7v-1.41c0-0.26-0.23-0.51-0.5-0.5c-0.27,0.01-0.5,0.22-0.5,0.5v1.41h-1.93c-1.38,0-2.5,1.12-2.5,2.5v11c0,1.38,1.12,2.5,2.5,2.5h12.87c1.38,0,2.5-1.12,2.5-2.5v-11C20.935,6.075,19.815,4.955,18.435,4.955z M19.935,18.455c0,0.83-0.67,1.5-1.5,1.5H5.565c-0.83,0-1.5-0.67-1.5-1.5v-8.42h15.87V18.455z M19.935,9.035H4.065v-1.58c0-0.83,0.67-1.5,1.5-1.5h1.93v0.59c0,0.26,0.23,0.51,0.5,0.5c0.27-0.01,0.5-0.22,0.5-0.5v-0.59h7v0.59c0,0.26,0.23,0.51,0.5,0.5c0.27-0.01,0.5-0.22,0.5-0.5v-0.59h1.94c0.83,0,1.5,0.67,1.5,1.5V9.035z");

    // Create the second 'path' element
    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M11.492,17.173v-3.46c0-0.059-0.064-0.095-0.114-0.064l-0.638,0.392c-0.1,0.061-0.228-0.01-0.228-0.128v-0.651c0-0.105,0.055-0.203,0.146-0.257l0.764-0.457c0.047-0.028,0.1-0.043,0.154-0.043h0.626c0.166,0,0.3,0.134,0.3,0.3v4.367c0,0.166-0.134,0.3-0.3,0.3h-0.409C11.626,17.473,11.492,17.339,11.492,17.173z");

    // Append the 'path' elements to the 'g' element
    g.appendChild(path1);
    g.appendChild(path2);

    // Append the 'g' element to the SVG
    svg.appendChild(g);

    return;
}


function createTomorrowSVG() {

    // Create a new SVG element
    const svg = document.querySelector('.tomorrow-svg');
    svg.setAttribute("class", "tomorrow-svg");
    svg.setAttribute("fill", "none");
    svg.setAttribute("width", "20px");
    svg.setAttribute("height", "20px");
    svg.setAttribute("viewBox", "0 0 24 24");

    // Create the 'path' elements
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z");
    path1.setAttribute("stroke", "#1C274C");
    path1.setAttribute("stroke-width", "1.5");

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M18 16L16 16M16 16L14 16M16 16L16 14M16 16L16 18");
    path2.setAttribute("stroke", "#1C274C");
    path2.setAttribute("stroke-width", "1.5");
    path2.setAttribute("stroke-linecap", "round");

    const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path3.setAttribute("d", "M7 4V2.5");
    path3.setAttribute("stroke", "#1C274C");
    path3.setAttribute("stroke-width", "1.5");
    path3.setAttribute("stroke-linecap", "round");
    path3.setAttribute("opacity", "0.5");

    const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path4.setAttribute("d", "M17 4V2.5");
    path4.setAttribute("stroke", "#1C274C");
    path4.setAttribute("stroke-width", "1.5");
    path4.setAttribute("stroke-linecap", "round");
    path4.setAttribute("opacity", "0.5");

    const path5 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path5.setAttribute("d", "M2 9H22");
    path5.setAttribute("stroke", "#1C274C");
    path5.setAttribute("stroke-width", "1.5");
    path5.setAttribute("stroke-linecap", "round");
    path5.setAttribute("opacity", "0.5");

    // Append the 'path' elements to the SVG
    svg.appendChild(path1);
    svg.appendChild(path2);
    svg.appendChild(path3);
    svg.appendChild(path4);
    svg.appendChild(path5);

    return; 
}


function createSomedaySVG() {
    // Create a new SVG element
    const svg = document.querySelector('.upcoming-svg');

    svg.setAttribute("class", "upcoming-svg");
    svg.setAttribute("fill", "#000000");
    svg.setAttribute("width", "20px");
    svg.setAttribute("height", "20px");
    svg.setAttribute("viewBox", "0 0 32 32");

    // Create the 'path' elements
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M28.55,6.57H26.42V4.93a0.5,0.5,0,1,0-1,0V6.57H19.81V5.06a0.5,0.5,0,0,0-1,0V6.57H13.19V5.06a0.5,0.5,0,0,0-1,0V6.57H6.58V5.06a0.5,0.5,0,1,0-1,0V6.57H3.45A2,2,0,0,0,1.5,8.52v17.1a2,2,0,0,0,1.95,2h25.1a2,2,0,0,0,1.95-2V8.52A2,2,0,0,0,28.55,6.57Zm-25.1,1H5.58V9.08a0.5,0.5,0,0,0,1,0V7.57h5.61V9.08a0.5,0.5,0,0,0,1,0V7.57h5.61V9.08a0.5,0.5,0,0,0,1,0V7.57h5.61V8.94a0.5,0.5,0,1,0,1,0V7.57h2.13a1,1,0,0,1,.95.95v2.94H2.5V8.52A1,1,0,0,1,3.45,7.57Zm25.1,19H3.45a1,1,0,0,1-.95-1V12.46h27V25.62A1,1,0,0,1,28.55,26.57Z");

    // Create the 'rect' elements
    const rects = [
        {x: "9.99", y: "14.39"},
        {x: "14.98", y: "14.39"},
        {x: "19.98", y: "14.37"},
        {x: "5", y: "18.45"},
        {x: "9.99", y: "18.45"},
        {x: "14.98", y: "18.45"},
        {x: "5", y: "22.56"},
        {x: "9.99", y: "22.56"},
        {x: "14.98", y: "22.55"},
        {x: "19.98", y: "22.55"},
        {x: "19.98", y: "18.44"},
        {x: "24.87", y: "14.36"},
        {x: "24.87", y: "18.42"}
    ];

    for (let i = 0; i < rects.length; i++) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", rects[i].x);
        rect.setAttribute("y", rects[i].y);
        rect.setAttribute("width", "2.13");
        rect.setAttribute("height", "2.13");
        svg.appendChild(rect);
    }

    // Append the 'path' element to the SVG
    svg.appendChild(path1);

    return; 
}


function createPlusSymbol() {

    const svg = document.querySelector('.plus-symbol');
    svg.setAttribute("fill", "none");
    svg.setAttribute("width", "20px");
    svg.setAttribute("height", "20px");
    svg.setAttribute("viewBox", "0 0 24 24");

    // Create the 'rect' element
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "24");
    rect.setAttribute("height", "24");
    rect.setAttribute("fill", "white");
    svg.appendChild(rect);

    // Create the 'path' elements
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M12 6V18");
    path1.setAttribute("stroke", "#fe5a4c");
    path1.setAttribute("stroke-linecap", "round");
    path1.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path1);

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M6 12H18");
    path2.setAttribute("stroke", "#fe5a4c");
    path2.setAttribute("stroke-linecap", "round");
    path2.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path2);
}


function createPlusSymbolAgain() {

    const svg = document.querySelector('.add-symbol');
    svg.setAttribute("fill", "none");
    svg.setAttribute("width", "20px");
    svg.setAttribute("height", "20px");
    svg.setAttribute("viewBox", "0 0 24 24");

    // Create the 'rect' element
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "24");
    rect.setAttribute("height", "24");
    rect.setAttribute("fill", "white");
    svg.appendChild(rect);

    // Create the 'path' elements
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M12 6V18");
    path1.setAttribute("stroke", "#fe5a4c");
    path1.setAttribute("stroke-linecap", "round");
    path1.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path1);

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M6 12H18");
    path2.setAttribute("stroke", "#fe5a4c");
    path2.setAttribute("stroke-linecap", "round");
    path2.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path2);
}



function createProjectIconSVG() {

    // Create a new SVG element
    const svg = document.querySelector('.folder-icon');
    svg.setAttribute("class", "folder-icon");
    svg.setAttribute("fill", "none");
    svg.setAttribute("width", "20px");
    svg.setAttribute("height", "20px");
    svg.setAttribute("viewBox", "0 0 24 24");

    // Create the 'path' elements
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M12 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H9.58579C9.851 5 10.1054 5.10536 10.2929 5.29289L12 7H19C20.1046 7 21 7.89543 21 9V11");
    path1.setAttribute("stroke", "#fe5a4c");
    path1.setAttribute("stroke-width", "2");
    path1.setAttribute("stroke-linecap", "round");
    path1.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path1);

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M18 14V17M18 20V17M18 17H15M18 17H21");
    path2.setAttribute("stroke", "#fe5a4c");
    path2.setAttribute("stroke-width", "2");
    path2.setAttribute("stroke-linecap", "round");
    path2.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path2);
}


function createSortIcon() {

    const svg = document.getElementById('sort-icon');
    svg.setAttribute('width', '15px');
    svg.setAttribute('height', '15px');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M11.1924 5.65685C11.5829 5.26633 11.5829 4.63316 11.1924 4.24264L8.36397 1.41421C8.30576 1.356 8.24485 1.30212 8.18165 1.25259C7.50286 0.720577 6.55947 0.689024 5.84929 1.15793C5.73839 1.23115 5.63317 1.31658 5.53554 1.41421L2.70711 4.24264C2.31658 4.63316 2.31658 5.26633 2.70711 5.65685C3.09763 6.04738 3.7308 6.04738 4.12132 5.65685L6.00003 3.77814V18C6.00003 18.5523 6.44775 19 7.00003 19C7.55232 19 8.00003 18.5523 8.00003 18V3.8787L9.77818 5.65685C10.1687 6.04737 10.8019 6.04737 11.1924 5.65685Z');
    path1.setAttribute('fill', '#afafaf');

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M12.7071 18.3432C12.3166 18.7337 12.3166 19.3668 12.7071 19.7574L15.5355 22.5858C15.6332 22.6834 15.7384 22.7689 15.8493 22.8421C16.6256 23.3546 17.6805 23.2692 18.364 22.5858L21.1924 19.7574C21.5829 19.3668 21.5829 18.7337 21.1924 18.3432C20.8019 17.9526 20.1687 17.9526 19.7782 18.3432L18 20.1213L18 6C18 5.44771 17.5523 5 17 5C16.4477 5 16 5.44771 16 6L16 20.2218L14.1213 18.3432C13.7308 17.9526 13.0976 17.9526 12.7071 18.3432Z');
    path2.setAttribute('fill', '#afafaf');

    svg.appendChild(path1);
    svg.appendChild(path2);
}


export function addImages() {

    createTodaySVG();
    createTomorrowSVG();
    createSomedaySVG();
    createPlusSymbol();
    createProjectIconSVG();
    createSortIcon();
    

    return; 
}
