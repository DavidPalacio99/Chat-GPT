import React from "react";
import Chat from "../../../Components/Chat";
import ChatInput from "../../../Components/ChatInput";

type Props = {
  params: {
    id: string;
  };
};

const chatPage = ({ params: { id } }: Props) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
};

export default chatPage;
