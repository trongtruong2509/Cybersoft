// DOM
var addItem = document.getElementById('addItem');
var taskInput = document.getElementById('newTask');
var todo = document.getElementById('todo');
var completed = document.getElementById('completed');
var alert = document.getElementById('notiInput');

// === Classes === //
// Task
function Task(id, taskName,status) {
    this.id = id;
    this.taskName = taskName;
    this.status = status
}

// TaskList
function TaskList() {
    this.arr = [];

    this._findIndex = function(taskName) {
        return this.arr.findIndex(task => task.taskName === taskName);
    }

    this.getTaskById = function (id) {
        return this.arr.find(t => t.id === id);
    }

    this.addTask = function (task) {
        this.arr.push(task);
    }

    this.updateTask = function (taskId) {
        console.log("current id " + taskId);

        var currentTask = this.getTaskById(taskId);

        console.log("current task " + currentTask);

        var index = this._findIndex(currentTask.taskName);

        if (currentTask.status == "todo") {
            currentTask.status = "completed";
        } else {
            currentTask.status = "todo";
        }

        this.arr[index] = currentTask;
    }

    this.deleteTask = function (taskName) {
        this.arr.splice(this._findIndex(taskName), 1);
    }
}

// Validation
function Validation() {
    this.isEmpty = function(taskName) {
        return taskName === "";
    }

    this.Existed = function(taskList, taskName) {
        return taskList._findIndex(taskName) >= 0 ? true : false;
    }

    this.isValid = function(taskList, task) {
        return !this.isEmpty(task.taskName) && !this.Existed(taskList, task.id);
    }
}

// Global vars
var validator = new Validation();
var taskList = getLocalStorage();

// global
function setLocalStorage() {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function getLocalStorage() {
    var _taskListJson = localStorage.getItem('taskList');
    var taskList = new TaskList();

    if (_taskListJson) {
        var taskLocal = JSON.parse(_taskListJson);
        if (taskLocal.arr) {
            taskList.arr = mapData(taskLocal.arr);
        }
    } 

    renderTasks(taskList.arr);
    return taskList;
}

function mapData(arr) {
    var tasks = [];

    arr.forEach(t => {
        tasks.push(new Task(t.id, t.taskName, t.status));
    })

    return tasks;
}

// handle Functions
function changeStatus(taskId) {
    taskList.updateTask(parseInt(taskId))

    setLocalStorage();
    renderTasks(taskList.arr);
}

function deleteTask(taskName) {
    taskList.deleteTask(taskName);

    renderTasks(taskList.arr);
    setLocalStorage();
}

function addTask() {
    var taskName = taskInput.value;
    console.log("handleAddItem " + taskName);

    if (validator.isEmpty(taskName)) {
        enableAlert("Task Name is empty");
        return;
    } else if (validator.Existed(taskList, taskName.trim())) {
        enableAlert("Task is already exist");
        return;
    }

    // pass validation, disable alert msg
    disableAlert();

    var newId = taskList.arr.length ? (Math.max.apply(null, taskList.arr.map(t => t.id)) + 1) : 1;
    var newTask = new Task(newId, taskName, "todo");

    console.log(newTask);
    taskList.addTask(newTask);

    setLocalStorage();

    // DOM manipulate
    renderTasks(taskList.arr);
}

// Render functions
function enableAlert(errMsg) {
    console.log("Enable Alert: " + errMsg);
    alert.style.display = "inline"; 
    alert.innerHTML = errMsg;
}

function disableAlert() {
    alert.style.display = "none"; 
    alert.innerHTML = '';
}

function renderTasks(tasks) {
    var todoList = "";
    var completedList = "";

    tasks.forEach(task => {
        if (task.status == "todo") {
            todoList +=`
                <li>
                    <p>${task.taskName}</p>
                    <div class="buttons">
                        <button onclick="deleteTask('${task.taskName}')" class="remove">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        <button onclick="changeStatus('${task.id}')" class="complete">
                            <i class="fa-regular fa-circle-check"></i>
                        </button>
                    </div>
                </li>`
        } else {
            completedList +=`
                <li>
                    <p>${task.taskName}</p>
                    <div class="buttons">
                        <button onclick="deleteTask('${task.taskName}')" class="remove">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        <button onclick="changeStatus('${task.id}')" class="complete ">
                            <i class="fas fa-solid fa-circle-check"></i>
                        </button>
                    </div>
                </li>`
        }
        
    });
    
    todo.innerHTML = todoList;
    completed.innerHTML = completedList;
}

// Event handlers
addItem.addEventListener('click', addTask);


