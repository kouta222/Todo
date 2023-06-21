import React, { useRef } from "react";
import "./NewTodo.css";

type NewTodoProps = {
  onAddTodo: (text: string, timer: number) => void;
};

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const timerInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    const enteredTimer = timerInputRef.current!.value;

    const enteredTimerNumber = Number(enteredTimer);
    if (isNaN(enteredTimerNumber)) {
      return;
    }

    props.onAddTodo(enteredText, enteredTimerNumber);
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo内容</label>
        <input type="text" id="todo-text" ref={textInputRef} />
        <label htmlFor="todo-timer">作業時間</label>
        <input type="number" id="todo-timer" ref={timerInputRef} />
      </div>
      <button type="submit">Todo追加</button>
    </form>
  );
};

export default NewTodo;
