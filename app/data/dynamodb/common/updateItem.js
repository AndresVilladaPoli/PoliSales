import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import dynamoClient from "../client";

const { DYNAMODB_TABLE } = process.env;

const updateItem = async ({
  key,
  attributeNames,
  attributeValues,
  updateExpression,
}) => {
  const input = {
    TableName: DYNAMODB_TABLE,
    ExpressionAttributeNames: attributeNames,
    ExpressionAttributeValues: attributeValues
      ? marshall(attributeValues)
      : undefined,
    Key: marshall(key),
    UpdateExpression: updateExpression,
    ReturnValues: "ALL_NEW",
    ConditionExpression: "attribute_exists(PK)",
  };

  try {
    const command = new UpdateItemCommand(input);
    const response = await dynamoClient.send(command);

    return unmarshall(response.Attributes);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException")
      throw new Error("The item does not exist in the table");

    console.log(
      `Failed to update DynamoDB item on table: ${DYNAMODB_TABLE}. ${err}`,
    );

    throw new Error("Failed to update DynamoDB item");
  }
};

export default updateItem;
