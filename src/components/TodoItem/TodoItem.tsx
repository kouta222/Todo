import React, { useState } from "react";
import Timer from "../Timer/Timer";

interface TodoItemProps {
  item: { id: string; text: string; timer: number };
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: (
    todoId: string,
    newText: string,
    newHours: number,
    newMinutes: number
  ) => void;
  onCompleteTodo: (id: string) => void; // この行を追加
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(props.item.text);
  const [editHours, setEditHours] = useState(Math.floor(props.item.timer / 60)); // convert minutes to hours
  const [editMinutes, setEditMinutes] = useState(props.item.timer % 60); // get the remaining minutes

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
            value={editHours}
            onChange={(event) => setEditHours(Number(event.target.value))}
            placeholder="Hours"
          />
          <input
            type="number"
            value={editMinutes}
            onChange={(event) => setEditMinutes(Number(event.target.value))}
            placeholder="Minutes"
          />
          <button
            onClick={() => {
              props.onUpdateTodo(
                props.item.id,
                editText,
                editHours,
                editMinutes
              );
              setIsEditing(false);
            }}
          >
            更新
          </button>
        </>
      ) : (
        <>
          <span>{props.item.text}</span>
          <Timer
            initialTime={props.item.timer}
            onComplete={props.onDeleteTodo.bind(null, props.item.id)}
          />
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
