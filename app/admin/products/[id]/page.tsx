import React from "react";

async function Page(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  return <div>Page {params.id}</div>;
}

export default Page;
