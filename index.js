const taskInput = document.querySelector("#input-bar");
const taskSubmitBtn = document.querySelector("#add-task");
const taskList = document.querySelector(".task-list");
const deleteTaskBtns = document.querySelectorAll(".delete-task");
const TASK_PLACEHOLDER = "Add a task to see it here!";

let taskNumber = 0;

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

        let date = getStringDate();
        let localStorageKey = "tasks_" + date;
        
        let tasksInStorage = localStorage.getItem(localStorageKey);

        if (!tasksInStorage) {
            localStorage.setItem(localStorageKey, "");
            tasksInStorage = localStorage.getItem(localStorageKey);
        }
            
        if (tasksInStorage === "") {
            createDateMark(date);
        }

        addTask(taskInput.value, taskNumber);
        taskNumber++;
        
        if (tasksInStorage === "")
            tasksInStorage += taskInput.value.trim();
        else
            tasksInStorage += "," + taskInput.value.trim();

        localStorage.setItem(localStorageKey, tasksInStorage);

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
        const date = taskToDelete.getAttribute("datemark");
        
        let localStorageKey = "tasks_" + date;
        let tasksInStorage = localStorage.getItem(localStorageKey);

        let allTasks = tasksInStorage.split(",");
        allTasks.splice(taskNoToDelete, 1);
        tasksInStorage = allTasks.join(",");
        
        if (tasksInStorage === "") {
            const datemarkToDelete = taskToDelete.previousElementSibling; 
            datemarkToDelete.parentNode.removeChild(datemarkToDelete)
        }

        taskNumber--;
        taskToDelete.parentNode.removeChild(taskToDelete);

        if (document.querySelectorAll(".task").length === 0)
            addPlaceholderTask();

        localStorage.setItem(localStorageKey, tasksInStorage);
    });
}

function setTasksFromLocalStorage() {

    let localStorageKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).startsWith("tasks_")) {
            localStorageKeys.push(localStorage.key(i));
        }
    }

    localStorageKeys.sort((a, b) => {
        a = a.split("tasks_")[1];
        b = b.split("tasks_")[1];
        const aTime = a.split("-");
        const bTime = b.split("-");

        if (aTime[0] !== bTime[0])
            return parseInt(aTime[0]) - parseInt(bTime[0]);
        if (aTime[1] !== bTime[1])
            return parseInt(aTime[0]) - parseInt(bTime[0]);
        return parseInt(aTime[2]) - parseInt(bTime[2]);
    });

    localStorageKeys.forEach((date) => {
        tasksInStorage = localStorage.getItem(date);
        if (tasksInStorage !== "") {
            createDateMark(date.split("tasks_")[1]);
            const taskPlaceholder = document.querySelector(".no-tasks-available");
            if (taskPlaceholder)
                taskPlaceholder.parentElement.removeChild(taskPlaceholder);
            
            tasksInStorage.split(",").forEach((taskFromStorage) => {
                addTask(taskFromStorage, taskNumber);
                taskNumber++;
            });
        }
    });

};

function addPlaceholderTask() {
    const task = addTaskName(TASK_PLACEHOLDER);
    task.classList.add("no-tasks-available");
    taskList.appendChild(task);
}

function createDateMark(date) {
    const datemark = document.createElement("div");
    datemark.classList.add("datemark");
    const dateText = document.createElement("span");
    dateText.textContent = "Added on: " + date;
    datemark.appendChild(dateText);
    datemark.appendChild(document.createElement("hr"));
    taskList.appendChild(datemark);
}

function addTask(taskNameToAdd, taskNo = 0) {
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

function addTaskName(taskNameToAdd, taskNo = 0) {
    const task = document.createElement("div");
    task.classList.add("task");

    task.setAttribute("taskno", taskNo);
    task.setAttribute("datemark", getStringDate());
    
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

function getStringDate() {
    const date = new Date();
    return String(date.getFullYear()) + "-" + String(date.getMonth() + 1) + "-" + String(date.getDate());
}