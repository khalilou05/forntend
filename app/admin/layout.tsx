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

      <Sidebar />

      {children}
    </>
  );
}

export default AdminLayout;
