// Timer.tsx
import React, { useEffect, useState } from "react";

interface TimerProps {
  initialTime: number; // 初期時間をpropsとして受け取る
  onComplete: () => void; // 追加： タイマーが0になったときに呼ばれるコールバック
}

const Timer: React.FC<TimerProps> = ({ initialTime, onComplete }) => {
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
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(id);
            onComplete(); // 追加：タイマーが0になったらコールバックを呼び出す
            return 0; // タイマーが0以下になったら、値を0にリセットします。
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
      setTimerId(id);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timerPaused, onComplete]);

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
