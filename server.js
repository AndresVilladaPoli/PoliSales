import { createRequestHandler } from "@remix-run/architect";
import * as remixServerBuild from "./build/server/index.js";

export const handler = async (event, context, callback) => {
  try {
    const requestHandler = createRequestHandler({
      build: remixServerBuild,
    });
    return await requestHandler(event, context, callback);
  } catch (error) {
    console.error("error", error);

    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};
