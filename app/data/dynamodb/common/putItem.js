import {
  PutItemCommand,
  ConditionalCheckFailedException,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import dynamoClient from "../client";

const { DYNAMODB_TABLE } = process.env;

const putItem = async (item) => {
  if (!item.PK || !item.SK)
    throw new Error("Item must have PK and SK to be put on DynamoDB");

  const input = {
    TableName: DYNAMODB_TABLE,
    Item: marshall(item, { removeUndefinedValues: true }),
    ConditionExpression: "attribute_not_exists(PK)",
  };

  try {
    const command = new PutItemCommand(input);
    await dynamoClient.send(command);
  } catch (err) {
    if (err instanceof ConditionalCheckFailedException)
      throw new Error("The item already exists in DynamoDB");

    console.log(
      `Failed to put DynamoDB item on table: ${DYNAMODB_TABLE}, by PK: ${item.PK} and SK: ${item.SK}. ${err}`,
    );

    throw new Error("Failed to put DynamoDB item");
  }
};

export default putItem;
