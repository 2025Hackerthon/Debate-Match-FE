import "@emotion/react";
import type { DEBATETheme } from "./styles/theme";

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends DEBATETheme {}
}
