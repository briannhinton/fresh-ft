import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup, apply } from "twind";
export * from "twind";
export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
  preflight: {
    body: apply`bg-[#FFFCF2]`,
  },
};
if (IS_BROWSER) setup(config);
