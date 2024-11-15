import { useState } from "react";

export default function ProductVariantCard() {
  const [expand, setexpand] = useState(false);
  return (
    <div>
      <div>خيارات المنتج</div>
      {expand && (
        <>
          <div>الإسم</div>
          <input type="text" />
        </>
      )}
      <button>أضف خيارات للمنتج</button>
    </div>
  );
}
