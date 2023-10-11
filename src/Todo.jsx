import React, { useState } from "react";

type TodoItem = {
  title: string;
  description: string;
  status: string;
  dueDateOn: string;
  priority: string;
};

export const Todo: React.FC = () => {
  const [todoItem, setTodoItem] = useState<TodoItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("to-do");
  const [dueDateOn, setDueDateOn] = useState("");
  const [priority, setPriority] = useState("low");
  let response = document.querySelector('.errorAlert');

  function displayMessage(status: boolean, message: string) {
    if (!status) {
      if (!response?.classList.contains('bg-red-500')) {
        response?.classList.add('bg-red-500');
        response?.classList.remove('bg-green-500');
      }
    } else {
      if (!response?.classList.contains('bg-green-500')) {
        response?.classList.remove('bg-red-500');
        response?.classList.add('bg-green-500');
      }
    }
    response?.innerHTML = message;
  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") {
      displayMessage(false, "Please insert a title for the todo");
    } else if (description === "") {
      displayMessage(false, "Please insert a description for the todo");
    } else if (dueDateOn === "") {
      displayMessage(false, "Please set a deadline for the todo");
    } else {
      displayMessage(true, `${title} todo was added successfully!`);
      const newItem: TodoItem = {
        title,
        description,
        status,
        dueDateOn,
        priority,
      };
      setTodoItem([...todoItem, newItem]);
      setTitle("");
      setDescription("");
      setDueDateOn("");
      setPriority("low");
    }
  };

  return (
    <div>
      <div className="font-regular relative mb-4 block w-full rounded-lg p-4 ml-5 mr-5 text-base leading-5 text-white opacity-100 errorAlert">
        An error alert for showing a message.
      </div>
      <form onSubmit={submitHandler}>
        <div className="flex items-center space-x-4 m-5">
          <input
            id="title"
            className="border rounded p-2 w-48"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>
        <div className="flex items-center space-x-4 m-5">
          <input
            id="description"
            className="border rounded p-2 w-48"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </div>
        <div className="flex items-center space-x-4 m-5">
          <select
            id="status"
            className="border rounded p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="to-do">To-Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="flex items-center space-x-4 m-5">
          <input
            id="due-date"
            className="border rounded p-2 w-36"
            value={dueDateOn}
            onChange={(e) => setDueDateOn(e.target.value)}
            type="date"
          />
        </div>
        <div className="flex items-center space-x-4 m-5">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border rounded p-2 bg-gray-100 text-gray-700 focus:outline-none focus:ring focus:border-blue-500 hover:border-blue-300"
          >
            <option value="low" className="bg-white text-gray-900">
              Low
            </option>
            <option value="medium" className="bg-white text-gray-900">
              Medium
            </option>
            <option value="high" className="bg-white text-gray-900">
              High
            </option>
          </select>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Add
          </button>
        </div>
      </form>
      <ul role="list" className="divide-y divide-gray-100 pl-5 pr-5">
        {todoItem
          .sort((todo, l) => (todo.priority > l.priority ? -1 : 1))
          .map((todo, index) => (
            <li key={index} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={`https://test5.my.na/assets/images/${todo.status === "done" ? "done" : todo.status === "to-do" ? "todo" : "progress"}.jpg`}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {todo.title}
                    <span className={`inline-block px-2 py-1 text-sm font-semibold leading-none text-white bg-${todo.status === "done" ? "green" : todo.status === "to-do" ? "yellow" : "red"}-500  rounded-full ml-4`}>
                      {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
                    </span>
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{todo.description}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">Priority: {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}</p>
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">{todo.dueDateOn}</p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
