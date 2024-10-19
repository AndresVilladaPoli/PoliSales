import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

import dynamoClient from "../client";

const { DYNAMODB_TABLE } = process.env;

const queryItems = async ({
  indexName,
  limit,
  startFromKey,
  filterExpression,
  keyConditionExpression,
  expressionAttributeNames,
  expressionAttributeValues,
  ascendingOrder = false,
}) => {
  const items = [];
  let lastEvaluatedKey = startFromKey;

  try {
    do {
      const params = {
        TableName: DYNAMODB_TABLE,
        IndexName: indexName,
        KeyConditionExpression: keyConditionExpression,
        FilterExpression: filterExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues
          ? marshall(expressionAttributeValues, { removeUndefinedValues: true })
          : undefined,
        ScanIndexForward: ascendingOrder,
        ExclusiveStartKey: lastEvaluatedKey
          ? marshall(lastEvaluatedKey)
          : undefined,
      };

      if (limit && !filterExpression) params.Limit = limit - items.length;

      const data = await dynamoClient.send(new QueryCommand(params));

      items.push(...data.Items.map((item) => unmarshall(item)));

      lastEvaluatedKey = data.LastEvaluatedKey
        ? unmarshall(data.LastEvaluatedKey)
        : undefined;

      if (limit && items.length >= limit) break;
    } while (lastEvaluatedKey);

    return {
      items,
      lastEvaluatedKey,
    };
  } catch (error) {
    console.log(
      `Error query items, failed to query the data of the table: ${DYNAMODB_TABLE} with the indexName: ${indexName}, error: ${error.message}`,
    );

    throw new Error("Failed to query items on DynamoDB table.");
  }
};

export default queryItems;
