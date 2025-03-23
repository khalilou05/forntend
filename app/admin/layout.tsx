import Sidebar from "@/components/sidebar";
import React from "react";

function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <OnlineBar /> */}
      <script
        crossOrigin="anonymous"
        src="//unpkg.com/react-scan/dist/auto.global.js"
      />
      <Sidebar />

      {children}
    </>
  );
}

export default AdminLayout;
