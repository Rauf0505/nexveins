import type { ComponentType } from "react";
import { Globe, MagnifyingGlass, Megaphone, Robot, TerminalWindow } from "@phosphor-icons/react";

export type Glyph = ComponentType<{ size?: number; weight?: "light" | "bold" | "fill"; "aria-hidden"?: boolean | "true" | "false" }>;

/* Icons live apart from content/services.ts so that file stays importable by
   server route files — @phosphor-icons/react calls createContext at module
   scope, which a server component cannot evaluate. */
export const serviceGlyphs: Record<string, Glyph> = {
  "system-software-development": TerminalWindow,
  "website-development": Globe,
  "social-media-marketing": Megaphone,
  "seo-optimization": MagnifyingGlass,
  "ai-automation": Robot,
};
