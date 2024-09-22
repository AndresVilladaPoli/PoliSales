import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const isDev = process.env.NODE_ENV === "development";

const createClient = () => {
  if (isDev) {
    return new DynamoDBClient({
      credentials: {
        accessKeyId: "fakeMyKeyId",
        secretAccessKey: "fakeSecretAccessKey",
      },
      endpoint: "http://localhost:8000",
      region: "local",
    });
  }

  return new DynamoDBClient({
    maxAttempts: 2,
  });
};

const client = createClient();

export default client;
