import { useState } from "react";

export default function useToolTip(text: string) {
  const [value] = useState(text);
  const [position] = useState(text);
}
