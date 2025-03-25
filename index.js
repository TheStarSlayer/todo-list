let tasksInStorage = localStorage.getItem("tasks");
const taskInput = document.querySelector("#input-bar");
const taskSubmitBtn = document.querySelector("#add-task");
const taskList = document.querySelector(".task-list");
const deleteTaskBtns = document.querySelectorAll(".delete-task");
const TASK_PLACEHOLDER = "Add a task to see it here!";

let taskNumber = 0;

if (!tasksInStorage) {
    localStorage.setItem("tasks", "");
    tasksInStorage = "";
}

setTasksFromLocalStorage();

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

        addTask(taskInput.value, taskNumber);
        taskNumber++;
        
        if (tasksInStorage === "")
            tasksInStorage += taskInput.value.trim();
        else
            tasksInStorage += "," + taskInput.value.trim();

        localStorage.setItem("tasks", tasksInStorage);

        taskInput.value = "";
        taskSubmitBtn.setAttribute("disabled", true);
    }
});

function addDeleteEvent(btn) {
    btn.addEventListener("click", () => {
        let taskNoToDelete = parseInt(btn.parentNode.getAttribute("taskno"));
        const allDOMTasks = document.querySelectorAll(".task");

        for (let i = taskNoToDelete + 1; i < taskNumber; i++) {
            allDOMTasks[i].setAttribute("taskno", i-1);
        }

        const taskToDelete = allDOMTasks[taskNoToDelete];
        taskToDelete.parentNode.removeChild(taskToDelete);

        let allTasks = tasksInStorage.split(",");
        allTasks.splice(taskNoToDelete, 1);
        taskNumber--;

        tasksInStorage = allTasks.join(",");
        
        if (tasksInStorage === "") {
            addPlaceholderTask();
        }

        localStorage.setItem("tasks", tasksInStorage);
    });
}

function setTasksFromLocalStorage() {
    if (tasksInStorage !== "") {
        const taskPlaceholder = document.querySelector(".no-tasks-available");
        if (taskPlaceholder)
            taskPlaceholder.parentElement.removeChild(taskPlaceholder);
        
        tasksInStorage.split(",").forEach((taskFromStorage) => {
            addTask(taskFromStorage, taskNumber);
            taskNumber++;
        });
    }
};

function addPlaceholderTask() {
    const task = addTaskName(TASK_PLACEHOLDER);
    task.classList.add("no-tasks-available");
    taskList.appendChild(task);
}

function addTask(taskNameToAdd, taskNo = -1) {
    const task = addTaskName(taskNameToAdd, taskNo);

    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.classList.add("delete-task");

    const deleteImg = document.createElement("img");
    deleteImg.setAttribute("src", "img/delete-icon.svg");
    deleteImg.setAttribute("alt", "Delete");
    deleteTaskBtn.appendChild(deleteImg);
    addDeleteEvent(deleteTaskBtn);
    task.appendChild(deleteTaskBtn);

    taskList.appendChild(task);
}

function addTaskName(taskNameToAdd, taskNo = -1) {
    const task = document.createElement("div");
    task.classList.add("task");

    if (taskNo > -1)
        task.setAttribute("taskno", taskNo);
    else {
        if (tasksInStorage === "")
            task.setAttribute("taskno", 0);
        else
            task.setAttribute("taskno", tasksInStorage.split(",").length);
    }
    
    const taskNameElem = document.createElement("span");
    taskNameElem.classList.add("task-name");
    
    const markerElem = document.createElement("span");
    markerElem.textContent = "◯";
    taskNameElem.appendChild(markerElem);
    
    const taskName = document.createElement("span");
    taskName.textContent = taskNameToAdd.trim();
    taskNameElem.appendChild(taskName);
    task.appendChild(taskNameElem);
    return task;
}