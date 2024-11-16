import React, { useState } from "react";
import styles from "./Chat.module.css";

interface Message {
  id: string;
  senderAddress: string;
  content: string;
  sent: Date;
}

interface ChatProps {
  client: { address: string };
  messageHistory: Message[];
  conversation: {
    send: (value: string) => Promise<void>;
  };
}

const Chat: React.FC<ChatProps> = ({
  client,
  messageHistory,
  conversation,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  // Function to handle sending a message
  const handleSend = async () => {
    if (inputValue) {
      await onSendMessage(inputValue);
      setInputValue("");
    }
  };

  // Function to handle sending a text message
  const onSendMessage = async (value: string): Promise<void> => {
    return conversation.send(value);
  };

  // MessageList component to render the list of messages
  const MessageList: React.FC<{ messages: Message[] }> = ({ messages }) => {
    // Filter messages by unique id
    const uniqueMessages = messages.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
    );

    return (
      <ul className={styles.messageList}>
        {uniqueMessages.map((message) => (
          <li
            key={message.id}
            className={styles.messageItem}
            title="Click to log this message to the console"
          >
            <strong>
              {message.senderAddress === client.address ? "You" : "Bot"}:
            </strong>
            <span>{message.content}</span>
            <span className={styles.date}>
              ({message.sent.toLocaleTimeString()})
            </span>
            <span className={styles.eyes} onClick={() => console.log(message)}>
              👀
            </span>
          </li>
        ))}
      </ul>
    );
  };

  // Function to handle input change (keypress or change event)
  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if ("key" in event && event.key === "Enter") {
      handleSend();
    } else {
      setInputValue((event.target as HTMLInputElement).value);
    }
  };

  return (
    <div className={styles.Chat}>
      <div className={styles.messageContainer}>
        <MessageList messages={messageHistory} />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.inputField}
          onKeyPress={handleInputChange}
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Type your text here"
        />
        <button className={styles.sendButton} onClick={handleSend}>
          &#128073;
        </button>
      </div>
    </div>
  );
};

export default Chat;
