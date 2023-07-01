import React, { useState } from "react";
import Timer from "../Timer/Timer";
import IconButton from "@mui/material/IconButton";
import { Button, List, ListItem } from "@mui/material";

interface TodoItemProps {
  item: { id: string; text: string; timer: number };
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: (
    todoId: string,
    newText: string,
    newHours: number,
    newMinutes: number
  ) => void;
  onCompleteTodo: (id: string) => void; // complete関数
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
          <Button
            color="primary"
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
          </Button>
        </>
      ) : (
        <>
          <span>{props.item.text}</span>
          <Timer
            initialTime={props.item.timer}
            onComplete={props.onDeleteTodo.bind(null, props.item.id)}
          />
          <Button color="primary" onClick={() => setIsEditing(true)}>
            編集
          </Button>
          <Button
            color="primary"
            onClick={props.onDeleteTodo.bind(null, props.item.id)}
          >
            削除
          </Button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
