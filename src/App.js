import { useState } from 'react';

const data = [
  {
    id: 1,
    text: 'Clean kitchen',
    completed: false,
    createdAt: '2024-12-18T10:00:00',
  },
  {
    id: 2,
    text: 'Do Homework',
    completed: false,
    createdAt: '2024-12-18T10:00:00',
  },
  {
    id: 3,
    text: 'TO DO App',
    completed: false,
    createdAt: '2024-12-18T10:00:00',
  },
];

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  function handleDeleteTask(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  function handleSetCompleted(id) {
    setTasks((tasks) =>
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function handleEditTask(id, newText) {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  }

  function handleFilter(input) {
    setFilter(input);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="container">
      <h1 className="title">TODO LIST</h1>
      <div className="header">
        <TaskInput onAddTask={handleAddTask} />
        <Filters onFilter={handleFilter} />
      </div>
      <TaskList
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
        tasks={filteredTasks}
        onSetCompleted={handleSetCompleted}
      />
    </div>
  );
}

function TaskInput({ onAddTask, completed }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    const getCurrentFormattedDate = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = String(now.getFullYear()).slice(-2);

      return `${hours}:${minutes}, ${day}/${month}/${year}`;
    };

    const createdAt = getCurrentFormattedDate();
    e.preventDefault();
    const id = crypto.randomUUID();

    console.log(createdAt);
    const newTask = {
      id,
      text,
      completed: false,
      createdAt,
    };
    console.log(newTask);

    onAddTask(newTask);
    setText('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Add task </label>
        <input
          className="input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button>Add</Button>
      </form>
    </div>
  );
}

function Filters({ onFilter }) {
  return (
    <div>
      <select name="" id="" onChange={(e) => onFilter(e.target.value)}>
        <option value="all">all</option>
        <option value="completed">completed</option>
        <option value="active">active</option>
      </select>
    </div>
  );
}

function TaskList({ tasks, onSetCompleted, onDeleteTask, onEditTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          task={task}
          key={task.id}
          onSetCompleted={onSetCompleted}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </ul>
  );
}

function TaskItem({ task, onSetCompleted, onDeleteTask, onEditTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  function handleSave() {
    onEditTask(task.id, editedText);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedText(task.text);
    setIsEditing(false);
  }

  return (
    <li className="task">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <div className="button-container">
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </>
      ) : (
        <>
          <div className="task-container">
            <div className="task-wrapper">
              <input type="checkbox" onChange={() => onSetCompleted(task.id)} />
              <h3
                style={task.completed ? { textDecoration: 'line-through' } : {}}
              >
                {task.text}
              </h3>
            </div>
            <p>Createt at: {task.createdAt}</p>
          </div>
          <div className="button-container">
            <Button onClick={() => onDeleteTask(task.id)}>Delete</Button>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          </div>
        </>
      )}
    </li>
  );
}

export default App;
