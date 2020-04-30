import React, { useState } from "react";

//En typescript hay que especificar de donde viene el evento
//En este caso se lo asignamos a un objeto
type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault(); //Evitamos recargar la página
    addTask(newTask);
    setNewTask("");
  };

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write your text"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
        <button>Save</button>
      </form>

      {tasks.map((t: ITask, i: number) => {
        //La key autogenera un índice, i
        return (
          <div>
            <h1 key={i}> {t.name}</h1>
            <p style={{ textDecoration: t.done ? 'line-through' : '' }}> {t.name}</p>
            <button onClick={() => toggleDoneTask(i)}>
              {t.done ? 'No hecho' : 'Hecho'}
            </button>
          </div>)
      })}
    </>
  );
}

export default App;
