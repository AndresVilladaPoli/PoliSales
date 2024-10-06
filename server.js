import { createRequestHandler } from "@remix-run/architect";
import * as remixServerBuild from "./build/server/index.js";

export const handler = createRequestHandler({
  build: remixServerBuild,
  getLoadContext(event) {
    // use lambda event to generate a context for loaders
    return {};
  },
});
