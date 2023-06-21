import React, { useState, useEffect } from "react";
import TodoList from "./components/Todo/TodoList";
import NewTodo from "./components/NewTodo/Newtodo";
import { Todo } from "./models/todo.model";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = window.localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const todoAddHandler = (text: string, timer: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = [
        ...prevTodos,
        { id: Math.random().toString(), text: text, timer: timer }
      ];
      window.localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const todoDeleteHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== todoId);
      window.localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const todoUpdateHandler = (
    todoId: string,
    newText: string,
    newTimer: number
  ) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, text: newText, timer: newTimer } : todo
      );
      window.localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList
        items={todos}
        onDeleteTodo={todoDeleteHandler}
        onUpdateTodo={todoUpdateHandler}
      />
    </div>
  );
};

export default App;
