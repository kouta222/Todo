import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { TextField, Button, List, ListItem } from "@mui/material";

interface DeleteMemoProps {
  memoId: string;
}

const DeleteMemo: React.FC<DeleteMemoProps> = ({ memoId }) => {
  const deleteMemo = async () => {
    try {
      const docRef = doc(db, "memos", memoId);
      await deleteDoc(docRef);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  //   deleteIconを使用したら、エラーが出る。なぜ
  return (
    <Button color="primary" onClick={deleteMemo}>
      削除
    </Button>
  );
};

export default DeleteMemo;
