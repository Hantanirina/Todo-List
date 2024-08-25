import React, { useState, ChangeEvent } from "react";

interface Task {
  id: number;
  title: string;
  priority: "low" | "medium" | "high";
}

let id = 1;

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [newPriority, setNewPriority] = useState<"low" | "medium" | "high">(
    "low"
  );
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<
    "" | "low" | "medium" | "high"
  >("");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");

  function handleNewTaskChange(ev: ChangeEvent<HTMLInputElement>) {
    setNewTask(ev.target.value);
  }

  function handleNewPriorityChange(ev: ChangeEvent<HTMLSelectElement>) {
    setNewPriority(ev.target.value as "low" | "medium" | "high");
  }

  function handleSearchKeywordChange(ev: ChangeEvent<HTMLInputElement>) {
    setSearchKeyword(ev.target.value);
  }

  function handleFilterPriorityChange(ev: ChangeEvent<HTMLSelectElement>) {
    setFilterPriority(ev.target.value as "" | "low" | "medium" | "high");
  }

  function handleSortOrderChange(ev: ChangeEvent<HTMLSelectElement>) {
    setSortOrder(ev.target.value as "ASC" | "DESC");
  }

  function handleAddTask() {
    const toAdd: Task = {
      id: id,
      title: newTask,
      priority: newPriority,
    };
    setTasks([...tasks, toAdd]);
    setNewTask("");
    setNewPriority("low");
    id++;
  }

  function handleDeleteTask(id: number) {
    const filtered = tasks.filter((task) => task.id !== id);
    setTasks(filtered);
  }

  function handleUpdateTask(id: number, newTitle: string) {
    const newTasks = [...tasks];
    const index = newTasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      newTasks[index].title = newTitle;
      setTasks(newTasks);
    }
  }

  function handleUpdatePriority(
    id: number,
    newPriority: "low" | "medium" | "high"
  ) {
    const newTasks = [...tasks];
    const index = newTasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      newTasks[index].priority = newPriority;
      setTasks(newTasks);
    }
  }

  const filteredTasks = tasks
    .filter((task) =>
      searchKeyword === ""
        ? true
        : task.title.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    .filter((task) =>
      filterPriority === "" ? true : task.priority === filterPriority
    )
    .sort((a, b) =>
      sortOrder === "ASC"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  return (
    <div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              value={task.title}
              onChange={(ev) => {
                handleUpdateTask(task.id, ev.target.value);
              }}
            />
            <select
              value={task.priority}
              onChange={(ev) => {
                handleUpdatePriority(
                  task.id,
                  ev.target.value as "low" | "medium" | "high"
                );
              }}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
            <button onClick={() => handleDeleteTask(task.id)}>delete</button>
          </li>
        ))}
      </ul>

      <div>
        <input
          placeholder="New task"
          onChange={handleNewTaskChange}
          value={newTask}
        />
        <select value={newPriority} onChange={handleNewPriorityChange}>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <button onClick={handleAddTask}>add</button>
      </div>

      <div>
        <input
          placeholder="Search"
          onChange={handleSearchKeywordChange}
          value={searchKeyword}
        />
        <select value={filterPriority} onChange={handleFilterPriorityChange}>
          <option value="">All</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>
    </div>
  );
}
