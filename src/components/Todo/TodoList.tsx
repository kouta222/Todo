// TodoList.tsx

import React from "react";
import TodoItem from "../TodoItem/TodoItem";

interface TodoListProps {
  items: { id: string; text: string; timer: number }[];
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: (todoId: string, newText: string, newTimer: number) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.items.map((Todo) => (
        <TodoItem
          key={Todo.id}
          item={Todo}
          onDeleteTodo={props.onDeleteTodo}
          onUpdateTodo={props.onUpdateTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
