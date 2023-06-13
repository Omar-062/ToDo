const form = document.querySelector(`#form`);
const taskInput = document.querySelector(`#taskInput`);
const tasksList = document.querySelector(`#tasksList`);
const emptyList = document.querySelector(`#emptyList`);


//💩💩💩
// if (localStorage.getItem(`tasksHTML`)){
//     tasksList.innerHTML=localStorage.getItem(`tasksHTML`);
// }

//✅✅✅
let tasks = [];

if (localStorage.getItem(`tasks`)) {
    tasks = JSON.parse(localStorage.getItem(`tasks`));
    tasks.forEach((task)=>renderTask(task));
}

// tasks.forEach(function (task) {
//     renderTask(task);
// })

checkEmptyList();


//Add
form.addEventListener(`submit`, addTask);
//Delete
tasksList.addEventListener(`click`, deleteTask);
//Done
tasksList.addEventListener(`click`, doneTask);

function addTask(event) {
    //Отменили обновление страницы(отравку формы)
    event.preventDefault();
    const taskText = taskInput.value;

    //✅✅✅
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    tasks.push(newTask);

    //✅✅✅
    saveToLocalStorage()

    renderTask(newTask);
    taskInput.value = ``;
    taskInput.focus();
    //✅💩
    // if (tasksList.children.length > 1) {
    //     emptyList.classList.add(`none`);//добавили class который мы описали в css
    // }
    //saveHTMLtoLS();//💩

    //✅✅✅
    checkEmptyList();
}

function deleteTask(event) {
    //У кнопок есть такой атрибут как data-action
    if (event.target.dataset.action !== `delete`) {
        return
    }
    const parenNode = event.target.closest(`.list-group-item`);

    //✅✅✅
    const id = Number(parenNode.id);//нашли id,есть 2 способа удалить
    // 1->найдя index элемента вырезать его из [] по indexu
    // 2->отфильтровать [] так,чтоб в новый [] попали все задачи кроме той каторую мы хотим удалить

    //1
    // const index=tasks.findIndex(function (task){
    //     if (task.id===id){
    //         return true;
    //     }
    // })
    //короткая запись
    //const index=tasks.findIndex((task)=>task.id===id);
    //tasks.splice(index, 1);//с какого индекса,сколько элементов

    //2
    // tasks = tasks.filter(function (task) {
    //     if (task.id === id) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // })

    tasks = tasks.filter((task) => task.id !== id);

    //✅✅✅
    saveToLocalStorage();

    parenNode.remove();

    //💩✅
    // if (tasksList.children.length === 1) {
    //     emptyList.classList.remove(`none`);
    // }
    //saveHTMLtoLS();//💩

    //✅✅✅
    checkEmptyList();
}

function doneTask(event) {
    if (event.target.dataset.action !== `done`) {
        return
    }
    const parentNode = event.target.closest(`.list-group-item`);

    //✅✅✅
    const id = Number(parentNode.id);
    // const task = tasks.find(function (task) {
    //     if (task.id === id) {
    //         return true;
    //     }
    // })
    const task = tasks.find((task) => task.id === id);
    task.done = !task.done;

    //✅✅✅
    saveToLocalStorage();

    const taskTitle = parentNode.querySelector(`.task-title`);
    taskTitle.classList.toggle(`task-title--done`);
    //saveHTMLtoLS();//💩
}


//Save
//  1->[]со всеми задачами,хранить в localstorage только данные по задачам (названия задач,статус)✅
//  2->Хранение всей разметки в LocalStorage.💩

//💩💩💩
// function saveHTMLtoLS(){
//     localStorage.setItem(`tasksHTML`,tasksList.innerHTML);
// }


function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
                    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                    <div class="empty-list__title">Список дел пуст</div>
                </li>`;
        tasksList.insertAdjacentHTML(`afterbegin`, emptyListHTML);
    }

    if (tasks.length > 0) {
        const emptyListElement = document.querySelector(`#emptyList`);
        emptyListElement ? emptyListElement.remove() : null;
    }
}

//✅✅✅
function saveToLocalStorage() {
    localStorage.setItem(`tasks`, JSON.stringify(tasks));
}

function renderTask(task) {
    const cssClass = task.done ? `task-title task-title--done` : `task-title`;


    const taskHTML =
        //💩💩💩
        //`<li class="list-group-item d-flex justify-content-between task-item">
        //<span class="task-title">${taskText}</span>

        //✅✅✅
        `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>`;
    tasksList.insertAdjacentHTML(`beforeend`, taskHTML);
}