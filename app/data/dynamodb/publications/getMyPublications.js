import queryItems from "../common/queryItems";
import PublicationDTO from "../dto/PublicationDTO";

const LIMIT_SEARCH = 50;

const getMyPublications = async ({ fromId, searchKey, userEmail }) => {
  const { items, lastEvaluatedKey } = await queryItems({
    indexName: "GSI2",
    keyConditionExpression: "GSI2PK = :GSI2PK AND begins_with(GSI2SK, :GSI2SK)",
    limit: LIMIT_SEARCH,
    startFromKey: fromId
      ? { GSI2PK: `User#${userEmail}`, GSI2SK: `Publication#${fromId}` }
      : undefined,
    filterExpression: searchKey
      ? "contains(searchKeyTitle, :searchKey)"
      : undefined,
    expressionAttributeValues: {
      ":GSI2PK": `User#${userEmail}`,
      ":GSI2SK": "Publication#",
      ":searchKey": searchKey,
    },
  });

  return {
    items: items.map((item) => PublicationDTO.toPublication(item)),
    nextKey: lastEvaluatedKey
      ? lastEvaluatedKey.GSI2SK.replace("Publication#", "")
      : null,
  };
};

export default getMyPublications;
