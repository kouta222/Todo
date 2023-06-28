import React, { useState } from "react";
import { Button, TextField, Paper, Typography } from "@mui/material";

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant."
              },
              {
                role: "user",
                content: message
              }
            ]
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API response error", errorData);
        return;
      }

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        setResponse(data.choices[0].message.content);
      } else {
        console.error("Unexpected response structure", data);
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <Paper style={{ margin: "1rem", padding: "1rem" }}>
      <Typography variant="h5">ChatGPTに質問</Typography>
      <form noValidate autoComplete="off">
        <TextField
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
          fullWidth
          style={{ marginBottom: "1rem" }}
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          質問する
        </Button>
      </form>
      {response && (
        <Typography style={{ marginTop: "1rem" }}>返信:{response}</Typography>
      )}
    </Paper>
  );
};

export default ChatComponent;
