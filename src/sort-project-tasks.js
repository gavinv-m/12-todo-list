export function sortProjectTasks() {
    // TODO: Must add parameter to function, for sorting functions
    //       Not important now 
    const sortOptions = document.querySelector('.dropdown-content');

    while (sortOptions.firstChild) {
        sortOptions.removeChild(sortOptions.firstChild);
    }

    const sortByDueDate = document.createElement('h2');
    sortByDueDate.textContent = 'Sort By Due Date';

    const sortByPriority = document.createElement('h2');
    sortByPriority.textContent = 'Sort By Task Priority';
  
    sortOptions.appendChild(sortByDueDate);
    sortOptions.appendChild(sortByPriority);

    return;
}