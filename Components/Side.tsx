"use client";

import React from "react";
import NewChat from "./NewChat";
import { useSession, signOut } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatRow from "./ChatRow";

const Side = () => {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  console.log(chats);

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />

          <div>{/* Model selection */}</div>

          {/* Map through there ChatRows */}
          {chats?.docs.map((chat) => {
            return <ChatRow key={chat.id} id={chat.id} />;
          })}
        </div>
      </div>

      {session && (
        <img
          onClick={() => {
            signOut();
          }}
          src={session.user?.image!}
          alt="Profile picture"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50 "
        />
      )}
    </div>
  );
};

export default Side;