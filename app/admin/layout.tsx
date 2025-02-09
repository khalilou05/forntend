import React from "react";
import Sidebar from "@/components/sidebar";
import OnlineBar from "@/components/OfflineBar";

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
