import React from "react";
import { DocumentData } from "firebase/firestore";

type Props = {
  message: DocumentData;
};

// const truncate = (message: string) => {
//   const str = message.substring(0, message.length - 1);
//   console.log(str);
// };

const Message = ({ message }: Props) => {
  const isChatGPT = message.user.name === "ChatGPT";

  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto ">
        <img src={message.user.avatar} alt="message" className="h-8 w-8" />
        <p className="pt-1 text-sm ">
          {/* {message.text.length > 100 ? truncate(message.text) : message.text} */}
          {message.text}
        </p>
      </div>
    </div>
  );
};

export default Message;
