import React from "react";
import ToolTip from "./ToolTip";

type Prop = {
  tooltipText: string;
};

function withToolTip<T extends Prop>(Component: React.ComponentType<T>) {
  return (props: T) => (
    <ToolTip
      value={props.tooltipText}
      component={(ref, showToolTip, hideToolTip) => (
        <Component
          {...props}
          ref={ref}
          onMouseEnter={showToolTip}
          onMouseLeave={hideToolTip}
        />
      )}
    />
  );
}
export default withToolTip;
