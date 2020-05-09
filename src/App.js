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
import {
    TodoListView
} from "./view/TodoListView.js";

console.log("App.js:loaded")
export class App {
    constructor() {
        console.log("App initialized");
        this.todoListModel = new TodoListModel();
    }

    handleAdd(title) {
        if (!title) {
            return;
        }
        this.todoListModel.addTodo(new TodoItemModel({
            title: title,
            completed: false
        }));
    }

    handleUpdate({
        id,
        completed
    }) {
        this.todoListModel.updateTodo({
            id,
            completed
        });
    }

    handleDelete({
        id
    }) {
        this.todoListModel.deleteTodo({
            id
        });
    }

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");

        // register event handler
        this.todoListModel.onChange(() => {
            const todoItems = this.todoListModel.getTodoItems();
            const todoListView = new TodoListView();
            const todoListElement = todoListView.createElement(todoItems, {
                onUpdateTodo: (({
                    id,
                    completed
                }) => {
                    this.handleUpdate({
                        id,
                        completed
                    });
                }),
                onDeleteTodo: ({
                    id
                }) => {
                    this.handleDelete({
                        id
                    });
                }
            });
            render(todoListElement, containerElement);
            todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
        });

        formElement.addEventListener("submit", (event) => {
            // 本来のsubmitイベントの動作を止める
            event.preventDefault();

            // add input values to modl and emit the registered event.
            this.handleAdd(inputElement.value);

            inputElement.value = "";
        });
    }

    unmount() {
        this.todoListModel.drop();
    }
}