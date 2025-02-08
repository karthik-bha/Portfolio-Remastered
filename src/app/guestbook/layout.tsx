"use client";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
  session, // Accept session prop
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>{children}</SessionProvider>
  );
}
