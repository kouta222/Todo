import React, { useState } from "react";
import Timer from "../Timer/Timer";

interface TodoItemProps {
  item: { id: string; text: string; timer: number };
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: (id: string, newText: string, newTimer: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(props.item.text);
  const [editTimer, setEditTimer] = useState(props.item.timer);

  return (
    <li key={props.item.id}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
          />
          <input
            type="number"
            value={editTimer}
            onChange={(event) => setEditTimer(Number(event.target.value))}
          />
          <button
            onClick={() => {
              props.onUpdateTodo(props.item.id, editText, editTimer);
              setIsEditing(false);
            }}
          >
            更新
          </button>
        </>
      ) : (
        <>
          <span>{props.item.text}</span>
          <Timer initialTime={props.item.timer} />
          <button onClick={() => setIsEditing(true)}>編集</button>
          <button onClick={props.onDeleteTodo.bind(null, props.item.id)}>
            削除
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
