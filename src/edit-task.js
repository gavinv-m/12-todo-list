function editTask(task) {

    let response = "yes";

    // Get property names 
    const propertyNames = [];
    for (let property in task) {

        if (property !== 'id') propertyNames.push(property);
    }

    do {
        let editTaskDetail = prompt(`Which property would you like to edit? Choose from: ${propertyNames.join(", ")}`);
        const updateDetail = prompt("What should the new value be?");

        task[editTaskDetail] = updateDetail;
        console.log(task);

        response = prompt('Would you like to edit another property?');
    }
    while (response === 'yes');

    return task;
}


export { editTask };