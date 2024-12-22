import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { createPortal } from "react-dom";

function Port({ children }: { children: ReactNode }) {
  return createPortal(children, document.body);
}

const Portal = dynamic(() => Promise.resolve(Port), { ssr: false });

export default Portal;
