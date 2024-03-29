"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { query } from "firebase/firestore";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";

type Props = {
  chatId: string;
};

const Chat = ({ chatId }: Props) => {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden z-100">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt in below to get started!
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white sm:animate-bounce z-1" />
        </>
      )}
      {messages?.docs.map((message) => {
        return <Message key={message.id} message={message.data()} />;
      })}
    </div>
  );
};

export default Chat;
