import React, { useEffect, useState } from "react";
import "../../App.css";

import { DataStore, Predicates } from "aws-amplify";
import { Todo } from "../../models";

function TodoComponent() {
  const [todos, setTodos] = useState([]);
  const [snapshots, setSnapshots] = useState([]);

  function onCreate() {
    setSnapshots([]);
    const result = DataStore.save(
      new Todo({
        name: `name`,
      })
    );

    console.log(result);
    setTodos([...todos, result]);
  }

  function onDeleteAll() {
    setSnapshots([]);
    DataStore.delete(Todo, Predicates.ALL);
  }

  async function getTodos() {
    const _todos = await DataStore.query(Todo);
    setTodos(_todos);
    console.log("Todos", _todos);
  }

  async function updateTodo() {
    setSnapshots([]);
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

  async function deleteLastTodo() {
    setSnapshots([]);
    const [todo] = await DataStore.query(Todo);
    if (!todo) return;
    await DataStore.delete(todo);
  }

  useEffect(() => {
    setSnapshots([]);
    getTodos();
    const subscription = DataStore.observeQuery(Todo).subscribe((data) => {
      // const subscription = DataStore.observe(Todo).subscribe((data) => {
      // const subscription = DataStore.observe(Todo, (todo) =>
      //   todo.name("eq", "name")
      // ).subscribe((data) => {
      console.log("DATA FROM OBSERVE:", data);
      setSnapshots((prev) => [...prev, data]);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="container">
      <div className="section">
        <div className="buttons">
          <button onClick={getTodos}>Query</button>
          <button onClick={onCreate}>New</button>
          <button onClick={updateTodo}>Update Last</button>
          <button onClick={deleteLastTodo}>Delete Last</button>
          <button onClick={onDeleteAll}>Delete All</button>
        </div>
        <pre>todos: {JSON.stringify(todos, null, 2)}</pre>
      </div>
      <div className="section">
        <div className="buttons">
          <button onClick={() => setSnapshots([])}>Delete Snapshots</button>
        </div>
        <pre>snapshots: {JSON.stringify(snapshots, null, 2)}</pre>
      </div>
    </div>
  );
}

export default TodoComponent;