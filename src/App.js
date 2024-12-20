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

function Button({ children }) {
  return <button>{children}</button>;
}

function App() {
  const [tasks, setTasks] = useState([]);

  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, task]);
  }
  return (
    <div>
      <h1>TODO LIST</h1>
      <TaskInput onAddTask={handleAddTask} />
      <Filters />
      <TaskList tasks={tasks} />
    </div>
  );
}

function TaskInput({ onAddTask }) {
  const [text, setText] = useState('');
  const [completed, setCompleted] = useState(false);

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
      completed,
      createdAt,
    };
    console.log(newTask);

    onAddTask(newTask);
    setText('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Add task</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button>Add</Button>
      </form>
    </div>
  );
}

function Filters() {
  return (
    <div>
      <select name="" id="">
        <option value="all">all</option>
        <option value="completed">completed</option>
        <option value="active">active</option>
      </select>
    </div>
  );
}

function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </ul>
  );
}

function TaskItem({ task, children }) {
  return (
    <li>
      <input type="checkbox" />
      <h3>{task.text}</h3>
      <p>{task.createdAt}</p>
      <Button>Delete</Button>
      <Button>Recreate</Button>
    </li>
  );
}

export default App;
