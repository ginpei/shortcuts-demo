import { ElementType } from "react";

export type HtmlProps<T extends ElementType> = React.ComponentPropsWithRef<T>;

export type HtmlComponent<T extends ElementType> = React.FC<HtmlProps<T>>;

export function cn(names: (string | undefined)[]): string {
  return names.filter((v) => v).join(" ");
}
