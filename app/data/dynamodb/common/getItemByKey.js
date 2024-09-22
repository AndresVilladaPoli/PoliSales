import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import dynamoClient from "../client";

const { DYNAMODB_TABLE } = process.env;

const getItemByKey = async (key, opts = {}) => {
  const input = {
    Key: marshall(key),
    TableName: DYNAMODB_TABLE,
    ProjectionExpression: opts.ProjectionExpression,
  };

  try {
    const command = new GetItemCommand(input);
    const response = await dynamoClient.send(command);

    return response.Item ? unmarshall(response.Item) : null;
  } catch (err) {
    console.log(
      `Failed to query DynamoDB item on table: ${DYNAMODB_TABLE}, by key: ${key}. ${err}`,
    );
    throw new Error("Failed to query DynamoDB item");
  }
};

export default getItemByKey;
