import {
    element,
    render
} from "./view/html-util.js";
import {
    TodoListModel
} from "./model/TodoListModel.js";
import {
    TodoItemModel
} from "./model/TodoItemModel.js";

console.log("App.js:loaded")
export class App {
    constructor() {
        console.log("App initialized");
        this.todoListModel = new TodoListModel();
    }

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");

        // register event handler
        this.todoListModel.onChange(() => {
            const todoListElement = element `<ul />`;
            const todoItems = this.todoListModel.getTodoItems();
            todoItems.forEach(item => {
                const todoItemElement = item.completed ?
                    element `<li><input type="checkbox" class="checkbox" checked>
                    <s>${item.title}</s>
                    <button class="delete">x</button>
                </input></li>` :
                    element `<li><input type="checkbox" class="checkbox">
                    ${item.title}
                    <button class="delete">x</button>
                </input></li>`;
                todoListElement.appendChild(todoItemElement);

                const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
                inputCheckboxElement.addEventListener("change", () => {
                    this.todoListModel.updateTodo({
                        id: item.id,
                        completed: !item.completed
                    });
                });

                const deleteButtonElement = todoItemElement.querySelector(".delete");
                deleteButtonElement.addEventListener("click", () => {
                    this.todoListModel.deleteTodo({
                        id: item.id
                    });
                });
            });

            render(todoListElement, containerElement);
            todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
        });

        formElement.addEventListener("submit", (event) => {
            // 本来のsubmitイベントの動作を止める
            event.preventDefault();

            // add input values to modl and emit the registered event.
            this.todoListModel.addTodo(new TodoItemModel({
                title: inputElement.value,
                completed: false
            }));

            inputElement.value = "";
        });
    }
}