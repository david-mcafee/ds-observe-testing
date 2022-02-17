import React, { useEffect, useState } from "react";
import "./App.css";

import { DataStore, Predicates } from "aws-amplify";
import { Todo } from "./models";

function App() {
  const [todos, setTodos] = useState([]);
  const [snapshots, setSnapshots] = useState([]);

  function onCreate() {
    const result = DataStore.save(
      new Todo({
        name: `name ${Date.now()}`,
      })
    );

    console.log(result);
    setTodos([...todos, result]);
  }

  function onDeleteAll() {
    DataStore.delete(Todo, Predicates.ALL);
  }

  async function getTodos() {
    const _todos = await DataStore.query(Todo);
    setTodos(_todos);
    console.log("Todos", _todos);
  }

  async function updateTodo() {
    const [originalTodo] = await DataStore.query(Todo);
    console.log("Original Todo:", originalTodo);

    try {
      const todo = await DataStore.save(
        Todo.copyOf(originalTodo, (updated) => {
          updated.name = `name ${Date.now()}`;
        })
      );

      console.log("Todo updated:", todo);
    } catch (error) {
      console.error("Save failed:", error);
    }
  }

  useEffect(() => {
    getTodos();
    const subscription = DataStore.observeQuery(Todo).subscribe((data) => {
      console.log("DATA FROM OBSERVE:", data);
      setSnapshots((prev) => [...prev, data]);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={getTodos}>Query</button>
          <input type="button" value="NEW" onClick={onCreate} />
          <input type="button" value="DELETE ALL" onClick={onDeleteAll} />
          <input
            type="button"
            value="DELETE SNAPSHOTS"
            onClick={() => setSnapshots([])}
          />
          <button onClick={updateTodo}>Update Last</button>
          {/* <button onClick={() => DataStore.start()}>Start</button>
          <button onClick={() => DataStore.stop()}>Stop</button>
          <button onClick={() => DataStore.clear()}>Clear</button> */}
          <pre>todos: {JSON.stringify(todos, null, 2)}</pre>
          <pre>snapshots: {JSON.stringify(snapshots, null, 2)}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
