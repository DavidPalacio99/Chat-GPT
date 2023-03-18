"use client";

import React, { useEffect, useState } from "react";
import NewChat from "./NewChat";
import { useSession, signOut } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatRow from "./ChatRow";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const Side = () => {
  const { data: session } = useSession();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 640) {
        setModal(true);
      } else {
        setModal(false);
      }
    });
  }, []);

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <>
      {modal ? (
        <Bars3Icon
          className="h-8 w-8 cursor-pointer text-gray-300 fixed top-1 left-0"
          onClick={() => {
            setModal(false);
          }}
        />
      ) : (
        <div
          className={`fixed min-w-[20rem] sm:min-w-[13rem] md:min-w-[20rem] top-0 left-0 sm:static bg-[#202123] h-screen overflow-y-auto`}
        >
          <div className="p-2 flex flex-col h-screen relative ">
            <div className="fixed top-2 left-80 ">
              <XMarkIcon
                className="sm:hidden h-8 w-8 cursor-pointer text-gray-300"
                onClick={() => {
                  setModal(true);
                }}
              />
            </div>

            <div className="flex-1">
              <div>
                <NewChat />
                <div className="flex flex-col space-y-2 my-2">
                  {loading && (
                    <div className="animate-pulse text-center text-white">
                      <p>Loading Chats...</p>
                    </div>
                  )}
                  {chats?.docs.map((chat) => {
                    return <ChatRow key={chat.id} id={chat.id} />;
                  })}
                </div>
              </div>
            </div>

            {session && (
              <img
                onClick={() => {
                  signOut();
                }}
                src={
                  session.user?.image ||
                  "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
                }
                alt="Profile picture"
                className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50 "
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Side;
