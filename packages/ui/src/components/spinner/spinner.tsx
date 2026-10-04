import { Icon } from "../icon";

import { LoaderCircleFreeIcons } from "@hugeicons/core-free-icons";
import { css, cx } from "../../../styled-system/css";

import type * as React from "react";

export interface SpinnerProps {
  className?: string;
}

export const Spinner = ({ className, ...props }: SpinnerProps): React.ReactElement => {
  return (
    <Icon
      className={cx(
        "group",
        css({
          animation: "spin",
          animationDuration: "1s",
          animationDirection: "linear",
          animationIterationCount: "infinite",
        }),
        className,
      )}
      aria-label="Loading"
      role="status"
      icon={LoaderCircleFreeIcons}
      {...props}
    />
  );
};
