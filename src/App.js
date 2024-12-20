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
  const [tasks, setTasks] = useState(data);
  return (
    <div>
      <h1>TODO LIST</h1>
      <TaskInput />
      <Filters />
      <TaskList tasks={tasks} />
    </div>
  );
}

function TaskInput() {
  return (
    <div>
      <label htmlFor="">Add task</label>
      <input type="text" />
      <button>Add</button>
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
