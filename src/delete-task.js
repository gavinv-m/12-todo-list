function deleteTask(arrayOfTasks, idNumber) {

    const numberOfTasks = arrayOfTasks.length;

    for (let i = 0; i < numberOfTasks; i++) {

        if (arrayOfTasks[i]['id'] === idNumber) {

            arrayOfTasks.splice(i, 1);
            break;
        }
    }

    return arrayOfTasks;
}


export { deleteTask };