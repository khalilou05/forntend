"use client";

import Modal from "@/components/Modal";
export default function page() {
  return (
    <div>
      <Modal
        submitValue="qsqsd"
        cancelValue="qsdqd"
        modalTitle="khalil"
        height={200}
        width={200}
        render={(handleClick) => <button onClick={handleClick}>btn</button>}
      >
        <div>khalil</div>
      </Modal>
    </div>
  );
}
