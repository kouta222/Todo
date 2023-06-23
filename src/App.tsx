import React, { useState, useEffect } from "react";
import TodoList from "./components/Todo/TodoList";
import NewTodo from "./components/NewTodo/Newtodo";
import { Todo } from "./models/todo.model";

// ローカルストレージ
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = window.localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Todoの追加
  const todoAddHandler = (text: string, timer: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = [
        ...prevTodos,
        {
          id: Math.random().toString(),
          text: text,
          timer: timer,
          isCompleted: false
        } // 更新
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

  const todoCompleteHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: true } : todo
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
        onCompleteTodo={todoCompleteHandler} // Pass the handler function
      />
    </div>
  );
};

export default App;
