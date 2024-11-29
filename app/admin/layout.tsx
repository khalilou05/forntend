import React from "react";
import Sidebar from "@/components/sidebar";

function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}

export default AdminLayout;
