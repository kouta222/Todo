import React, { useState } from "react";

interface NewTodoProps {
  onAddTodo: (text: string, timer: number) => void;
}

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const [enteredText, setEnteredText] = useState("");
  const [enteredHours, setEnteredHours] = useState(0);
  const [enteredMinutes, setEnteredMinutes] = useState(0);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const timer = enteredHours * 60 + enteredMinutes;
    props.onAddTodo(enteredText, timer);
    setEnteredText("");
    setEnteredHours(0);
    setEnteredMinutes(0);
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div>
        <label htmlFor="text">Todoテキスト</label>
        <input
          type="text"
          id="text"
          value={enteredText}
          onChange={(event) => setEnteredText(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="hours">時間</label>
        <input
          type="number"
          id="hours"
          value={enteredHours}
          onChange={(event) => setEnteredHours(+event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="minutes">分</label>
        <input
          type="number"
          id="minutes"
          value={enteredMinutes}
          onChange={(event) => setEnteredMinutes(+event.target.value)}
        />
      </div>
      <button type="submit">TODOを追加</button>
    </form>
  );
};

export default NewTodo;
