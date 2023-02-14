import { SessionProvider } from "../Components/SessionProvider";
import Side from "../Components/Side";
import "../styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../Components/Login";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <Side />
              </div>

              {/* Client Provider - Notifications */}

              <div className="bg-[#343541]  flex-1 ">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}