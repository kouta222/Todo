import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { TextField, Button, List, ListItem } from "@mui/material";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import DeleteMemo from "./DeleteMemo";

const firebaseConfig = {
  apiKey: "AIzaSyAjbUmUPHpnl3-H73Zv58v-G1fDmp561zE",
  authDomain: "todo-25a27.firebaseapp.com",
  projectId: "todo-25a27",
  storageBucket: "todo-25a27.appspot.com",
  messagingSenderId: "280033275293",
  appId: "1:280033275293:web:3e36eae69fcaec50fb1374",
  measurementId: "G-RW5G4B4W8G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const MemoComponent: React.FC = () => {
  const [memo, setMemo] = useState("");
  const [memos, setMemos] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "memos"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const memosData: any[] = [];
      querySnapshot.forEach((doc) => {
        memosData.push({ ...doc.data(), id: doc.id });
      });
      setMemos(memosData);
    });

    // Clean up function
    return () => unsubscribe();
  }, [db]);

  const addMemo = async () => {
    try {
      await addDoc(collection(db, "memos"), {
        content: memo,
        createdAt: serverTimestamp()
      });
      setMemo("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <TextField
        id="outlined-multiline-static"
        label="新しいめも"
        multiline
        rows={4}
        value={memo}
        variant="outlined"
        fullWidth
        onChange={(e) => setMemo(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={addMemo}>
        メモを追加
      </Button>
      <List>
        {memos.map((memo) => (
          <ListItem key={memo.id}>
            {memo.content}
            <DeleteMemo memoId={memo.id} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MemoComponent;
