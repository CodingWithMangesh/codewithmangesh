import { mergeProps, useRender } from "@base-ui/react";
import type * as React from "react";
import { css, cx, type RecipeVariantProps } from "../../../styled-system/css";
import { buttonVariants } from "./button.recipe";
import { Spinner } from "../spinner";

export interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: RecipeVariantProps<typeof buttonVariants>["variant"];
  size?: RecipeVariantProps<typeof buttonVariants>["size"];
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  render,
  children,
  loading = false,
  disabled: disabledProp,
  ...props
}: ButtonProps): React.ReactElement {
  const isDisabled: boolean = Boolean(loading || disabledProp);
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] = render
    ? undefined
    : "button";

  const defaultProps = {
    children: (
      <>
        {children}
        {loading && (
          <Spinner
            className={css({ position: "absolute", pointerEvents: "none" })}
            data-slot="button-loading-indicator"
          />
        )}
      </>
    ),
    className: cx(buttonVariants({ variant, size }), className),
    "aria-disabled": loading || undefined,
    "data-loading": loading ? "" : undefined,
    "data-slot": "button",
    disabled: isDisabled,
    type: typeValue,
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}
