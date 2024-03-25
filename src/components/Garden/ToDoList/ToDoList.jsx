import React, { useState, useEffect } from "react";
import "../../../css/todolist.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [completedTasks, setCompletedTasks] = useState(JSON.parse(localStorage.getItem('completedTasks')) || [])
  const [newTaskText, setNewTaskText] = useState("");
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);
  const [editableTaskId, setEditableTaskId] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    setTasks(storedTasks.filter(task => !task.completed));
    setCompletedTasks(storedCompletedTasks);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);
  

  const handleInputChange = (event) => {
    setNewTaskText(event.target.value);
  };

  const handleAddTask = () => {
    if (newTaskText.trim() !== "") {
      const newTask = {
        id: Math.random(),
        text: newTaskText,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const handleToggleComplete = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    const taskToComplete = tasks[taskIndex];
    setTasks(tasks.filter((task) => task.id !== id));
    setCompletedTasks([
      ...completedTasks,
      { ...taskToComplete, completed: true },
    ]);
  };

  const handleDeleteTask = (id, type) => {
    if (type === "active") {
      setTasks(tasks.filter((task) => task.id !== id));
    } else {
      setCompletedTasks(completedTasks.filter((task) => task.id !== id));
    }
  };

  const handleEditTask = (id, newText, type) => {
    const updateTasks = type === "active" ? setTasks : setCompletedTasks;
    updateTasks(prevTasks =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  return (
    <div className="todo-list">
      <h2>To-do List</h2>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add new task"
          value={newTaskText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress} 
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="tasks">
        <h3>Active Tasks</h3>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            handleToggleComplete={handleToggleComplete}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            editableTaskId={editableTaskId}
            setEditableTaskId={setEditableTaskId}
            type="active"
          />
        ))}
      </div>
      <div className="completed-tasks">
        <h3>
          <button onClick={() => setShowCompletedTasks(!showCompletedTasks)}>
            {showCompletedTasks
              ? "Hide Completed Tasks"
              : "Show Completed Tasks"}
          </button>
        </h3>
        {showCompletedTasks && (
          <>
            <div>
              <button onClick={() => setCompletedTasks([])}>Delete All</button>
            </div>
            {completedTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                handleToggleComplete={handleToggleComplete}
                handleDeleteTask={handleDeleteTask}
                handleEditTask={handleEditTask}
                editableTaskId={editableTaskId}
                setEditableTaskId={setEditableTaskId}
                type="completed"
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const Task = ({
  task,
  handleToggleComplete,
  handleDeleteTask,
  handleEditTask,
  editableTaskId,
  setEditableTaskId,
  type,
}) => {
  return (
    <div className={`task ${type === "completed" ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={type === "completed"}
        onChange={() => handleToggleComplete(task.id)}
      />
      {editableTaskId === task.id ? (
        <input
          type="text"
          value={task.text}
          onChange={(e) => handleEditTask(task.id, e.target.value, type)}
          onBlur={() => setEditableTaskId(null)}
          autoFocus
        />
      ) : (
        <span onClick={() => setEditableTaskId(task.id)}>{task.text}</span>
      )}
      <button onClick={() => handleDeleteTask(task.id, type)}>Delete</button>
    </div>
  );
};

export default ToDoList;
