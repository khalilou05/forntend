"use client";

import { SearchInput } from "@/components/inputGroup";

import withToolTip from "@/components/WithToolTip";

const InputTooltip = withToolTip(SearchInput);

export default function Page() {
  return (
    <>
      <br />
      <InputTooltip tooltipText="khalil" />
    </>
  );
}
