let tasksInStorage = localStorage.getItem("tasks");
const taskInput = document.querySelector("#input-bar");
const taskSubmitBtn = document.querySelector("#add-task");
const taskList = document.querySelector(".task-list");
const deleteTaskBtns = document.querySelectorAll(".delete-task");

if (!tasksInStorage) {
    localStorage.setItem("tasks", "");
    tasksInStorage = "";
}

setTasksFromLocalStorage();

function setTasksFromLocalStorage() {

    if (tasksInStorage !== "") {
        const taskPlaceholder = document.querySelector(".no-tasks-available");
        if (taskPlaceholder)
            taskPlaceholder.parentElement.removeChild(taskPlaceholder);

        tasksInStorage.split(",").forEach((taskFromStorage) => {
            const task = document.createElement("div");
            task.classList.add("task");
            
            const taskNameElem = document.createElement("span");
            taskNameElem.classList.add("task-name");
            
            const markerElem = document.createElement("span");
            markerElem.textContent = "◯";
            taskNameElem.appendChild(markerElem);
            
            const taskName = document.createElement("span");
            taskName.textContent = taskFromStorage.trim();
            taskNameElem.appendChild(taskName);
            task.appendChild(taskNameElem);

            const deleteTaskBtn = document.createElement("button");
            deleteTaskBtn.classList.add("delete-task");

            const deleteImg = document.createElement("img");
            deleteImg.setAttribute("src", "img/delete-icon.svg");
            deleteImg.setAttribute("alt", "Delete");
            deleteTaskBtn.appendChild(deleteImg);
            addDeleteEvent(deleteTaskBtn);
            task.appendChild(deleteTaskBtn);

            taskList.appendChild(task);
        });
    }
};

taskInput.addEventListener("keyup", () => {
    if (taskInput.value.trim() !== "") {
        taskSubmitBtn.removeAttribute("disabled");
    }
    else {
        taskSubmitBtn.setAttribute("disabled", true);
    }
});

taskSubmitBtn.addEventListener("click", () => {
    if (taskInput.value.trim() !== "") {
        
        const taskPlaceholder = document.querySelector(".no-tasks-available");
        if (taskPlaceholder)
            taskPlaceholder.parentElement.removeChild(taskPlaceholder);

        const task = document.createElement("div");
        task.classList.add("task");
        
        const taskNameElem = document.createElement("span");
        taskNameElem.classList.add("task-name");
        
        const markerElem = document.createElement("span");
        markerElem.textContent = "◯";
        taskNameElem.appendChild(markerElem);
        
        const taskName = document.createElement("span");
        taskName.textContent = taskInput.value.trim();
        taskNameElem.appendChild(taskName);
        task.appendChild(taskNameElem);

        const deleteTaskBtn = document.createElement("button");
        deleteTaskBtn.classList.add("delete-task");

        const deleteImg = document.createElement("img");
        deleteImg.setAttribute("src", "img/delete-icon.svg");
        deleteImg.setAttribute("alt", "Delete");
        deleteTaskBtn.appendChild(deleteImg);
        addDeleteEvent(deleteTaskBtn);
        task.appendChild(deleteTaskBtn);

        taskList.appendChild(task);
        
        if (tasksInStorage === "")
            tasksInStorage += taskInput.value.trim();
        else
            tasksInStorage += "," + taskInput.value.trim();

        localStorage.setItem("tasks", tasksInStorage);

        taskInput.value = "";
        taskSubmitBtn.setAttribute("disabled", true);
    }
});

deleteTaskBtns.forEach((btn) => {
    addDeleteEvent(btn);
});

function addDeleteEvent(btn) {
    btn.addEventListener("click", () => {
        let taskNameToDelete = btn.previousSibling.childNodes[1].textContent.trim();
        const taskToDelete = btn.parentNode;
        taskToDelete.parentNode.removeChild(taskToDelete);
        let allTasks = tasksInStorage.split(",");
        allTasks = allTasks.filter((taskName) => taskName !== taskNameToDelete);
        tasksInStorage = allTasks.join(",");
        
        if (tasksInStorage === "") {
            addPlaceholderTask();
        }

        localStorage.setItem("tasks", tasksInStorage);
    });
}

function addPlaceholderTask() {
    const task = document.createElement("div");
    task.classList.add("task");
    task.classList.add("no-tasks-available");
    
    const taskNameElem = document.createElement("span");
    taskNameElem.classList.add("task-name");
    
    const markerElem = document.createElement("span");
    markerElem.textContent = "◯";
    taskNameElem.appendChild(markerElem);
    
    const taskName = document.createElement("span");
    taskName.textContent = "Add a task to see it here!";
    taskNameElem.appendChild(taskName);
    task.appendChild(taskNameElem);
    taskList.appendChild(task);
}