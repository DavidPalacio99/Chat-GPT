import { useSession } from "next-auth/react";
import React from "react";
import NewChat from "./NewChat";

const SideBar = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex">
        {/* New chat  */}
        <NewChat />

        <div>{/* Model selection */}</div>

        {/* Map through there ChatRows */}
      </div>
      {/* {true && (
        <img
          src={session.user?.image!}
          alt="Profile picture"
          // className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50 "
        />
      )} */}
    </div>
  );
};

export default SideBar;
