import Sidebar from "@/components/sidebar";
import TopBar from "@/components/TopBar";
import WarperRefProvider from "@/context/WarperRefCtx";
import "@/css/admin-global.css";
import React from "react";
function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-frame">
      <TopBar />
      <main className="main">
        <Sidebar />
        <WarperRefProvider>{children}</WarperRefProvider>
      </main>
    </div>
  );
}

export default AdminLayout;
