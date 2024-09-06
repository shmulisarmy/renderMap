const tasks = new Map(
    [
        ["todo", new Map(
            [
                ["task 1", {
                    name: "task 1",
                    description: "task 1 description"
                }],
                ["task 2", {
                    name: "task 2",
                    description: "task 2 description"
                }],
                ["task 3", {
                    name: "task 3",
                    description: "task 3 description"
                }],
            ]
        )],
        ["doing", new Map(
            [
                ["task 4", {
                    name: "task 4",
                    description: "task 4 description"
                }],
                ["task 5", {
                    name: "task 5",
                    description: "task 5 description"
                }],
                ["task 6", {
                    name: "task 6",
                    description: "task 6 description"
                }],
            ]    
        )],
        ["done", new Map(
            [
                ["task 7", {
                    name: "task 7",
                    description: "task 7 description"
                }],
                ["task 8", {
                    name: "task 8",
                    description: "task 8 description"
                }],
                ["task 9", {
                    name: "task 9",
                    description: "task 9 description"
                }],
            ]
        )]
    ]
)

function Task(taskName, props) {
    return html`
    <div class="task" draggable="true">
        <h2>${props.name}</h2>
        <p>${props.description}</p>
        <button onclick=${(el, event) => el.component().RenderMap.setChild("new one", props)}>delete</button>
    </div>
    `
}




function TaskList(taskListName, taskList) {
    const h =  html`
    <div class="TaskList">
        /${printAndDisplay(CreateRenderGroup(`task-${taskListName}`, taskList, Task))}
    </div>
    `

    return h
}


function printAndDisplay(item) {

    console.log(item)
    return item
}

function App() {
    return html`
    <main id="tasks">
        /${printAndDisplay(CreateRenderGroup("taskList", tasks, TaskList))}
    </main>
    `
}


root.morphe(App)