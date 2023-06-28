import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjbUmUPHpnl3-H73Zv58v-G1fDmp561zE",
  authDomain: "todo-25a27.firebaseapp.com",
  projectId: "todo-25a27",
  storageBucket: "todo-25a27.appspot.com",
  messagingSenderId: "280033275293",
  appId: "1:280033275293:web:3e36eae69fcaec50fb1374",
  measurementId: "G-RW5G4B4W8G"
};

const app = firebase.initializeApp(firebaseConfig);

const db = getFirestore();

const MemoComponent: React.FC = () => {
  const [memo, setMemo] = useState("");
  const [memos, setMemos] = useState<any[]>([]);

  //   ここのコードわからない
  useEffect(() => {
    db.collection("memos").onSnapshot((snapshot) => {
      const memoData: any[] = [];
      snapshot.forEach((doc) => memosData.push({ ...doc.data(), id: doc.id }));
      setMemos(memoData);
    });
  }, []);

  const addMemo = async () => {
    await db.collection("memos").add({
      content: memo,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    setMemo("");
  };

  return (
    <div>
      <input
        type="text"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <button onClick={addMemo}>メモを追加</button>
      {memos.map((memo) => (
        <div key={memo.id}>
          <p>{memo.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MemoComponent;
