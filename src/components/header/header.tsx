import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          今日のTodo
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Todoリスト
        </Button>
        <Button color="inherit" component={Link} to="/chat-Memo">
          メモ
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
