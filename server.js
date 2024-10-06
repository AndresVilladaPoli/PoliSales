import { createRequestHandler } from "@remix-run/architect";
import * as remixServerBuild from "./build/server/index.js";

export const handler = async (event) => {
  console.log("event", event);

  try {
    const requestHandler = createRequestHandler({
      build: remixServerBuild,
    });
    return await requestHandler(event);
  } catch (error) {
    console.error("error", error);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};
