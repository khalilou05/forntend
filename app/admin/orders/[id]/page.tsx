import React from "react";
async function Page({ params }: { params: Promise<{ id: number }> }) {
  const id = (await params).id;

  return (
    <main>
      <div className="product">{id}</div>
      <div className="note"></div>
      <div className="customer_info"></div>
      <div className="order_summary"></div>
    </main>
  );
}

export default Page;
