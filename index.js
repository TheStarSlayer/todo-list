let tasksInStorage = localStorage.getItem("tasks");
const taskInput = document.querySelector("#input-bar");
const taskSubmitBtn = document.querySelector("#add-task");
const taskList = document.querySelector(".task-list");

if (!tasksInStorage) {
    localStorage.setItem("tasks", "");
    tasksInStorage = "";
}

setTasksFromLocalStorage();

function setTasksFromLocalStorage() {
    if (tasksInStorage === "")
        return;

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

        task.appendChild(deleteTaskBtn);

        taskList.appendChild(task);
    }); 
}

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