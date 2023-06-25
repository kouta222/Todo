import React, { useState } from "react";

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
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <p>{response}</p>
    </div>
  );
};

export default ChatComponent;
