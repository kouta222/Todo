import React, { useEffect } from "react";
import TodoItem from "../TodoItem/TodoItem";

interface TodoListProps {
  items: { id: string; text: string; timer: number; isCompleted: boolean }[];
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: (
    todoId: string,
    newText: string,
    newHours: number,
    newMinutes: number
  ) => void;
  onCompleteTodo: (id: string) => void; // Add 'onCompleteTodo' field
}

const TodoList: React.FC<TodoListProps> = (props) => {
  useEffect(() => {
    if (props.items.length === 0) {
      alert("今日も一日頑張ろう！");
    } else if (props.items.every((todo) => todo.isCompleted)) {
      alert("お疲れ様！");
    }
  }, [props.items]);

  return (
    <ul>
      {props.items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onDeleteTodo={props.onDeleteTodo}
          onUpdateTodo={props.onUpdateTodo}
          onCompleteTodo={props.onCompleteTodo} // Pass the handler function
        />
      ))}
    </ul>
  );
};

export default TodoList;
