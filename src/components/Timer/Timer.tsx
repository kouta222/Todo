// Timer.tsx
import React, { useEffect, useState } from "react";

interface TimerProps {
  initialTime: number; // 初期時間をpropsとして受け取る
}

const Timer: React.FC<TimerProps> = ({ initialTime }) => {
  const [remainingTime, setRemainingTime] = useState(initialTime * 60);
  const [timerPaused, setTimerPaused] = useState(true);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerPaused) {
      if (timerId) {
        clearInterval(timerId);
      }
    } else {
      const id = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
      setTimerId(id);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timerPaused]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div>
      <span>
        {minutes}分{seconds < 10 ? `0${seconds}` : seconds}秒
      </span>
      <button onClick={() => setTimerPaused(!timerPaused)}>
        {timerPaused ? "開始" : "一時停止"}
      </button>
    </div>
  );
};

export default Timer;
