import queryItems from "../common/queryItems";
import PublicationDTO from "../dto/PublicationDTO";

export const orderAndFilterBy = {
  creationDate: "CREATION_DATE",
  price: "PRICE",
  category: "CATEGORY",
};

const filterKeys = {
  [orderAndFilterBy.creationDate]: {
    indexName: "GSI6",
    keyConditionExpression: "GSI6PK = :GSI6PK",
  },
  [orderAndFilterBy.price]: {
    indexName: "GSI5",
    keyConditionExpression:
      "GSI5PK = :GSI5PK AND GSI5SK BETWEEN :start AND :end",
  },
  [orderAndFilterBy.category]: {
    indexName: "GSI4",
    keyConditionExpression: "GSI4PK = :GSI4PK AND GSI4SK = :category",
  },
};

const LIMIT_SEARCH = 50;

const getAllPublications = async ({
  nextKey,
  searchKey,
  orderBy = orderAndFilterBy.creationDate,
}) => {
  const expressionAttributeValues = {};
  let filterExpression;

  if (searchKey) {
    if (searchKey.searchKeyTitle) {
      expressionAttributeValues[":searchKey"] = searchKey.searchKeyTitle;
      filterExpression = "contains(searchKeyTitle, :searchKey)";
    }

    if (searchKey.category) {
      expressionAttributeValues[
        ":category"
      ] = `Publication#${searchKey.category}`;
    }

    if (searchKey.price) {
      expressionAttributeValues[
        ":start"
      ] = `Publication#${searchKey.price.start}`;
      expressionAttributeValues[":end"] = `Publication#${searchKey.price.end}`;
    }
  }

  if (orderBy === orderAndFilterBy.creationDate) {
    expressionAttributeValues[":GSI6PK"] = "Publication";
  } else if (orderBy === orderAndFilterBy.price) {
    expressionAttributeValues[":GSI5PK"] = "Publication";
  } else if (orderBy === orderAndFilterBy.category) {
    expressionAttributeValues[":GSI4PK"] = "Publication";
  }
  console.log(filterKeys[orderBy]);
  const { items, lastEvaluatedKey } = await queryItems({
    ...filterKeys[orderBy],
    limit: LIMIT_SEARCH,
    filterExpression: filterExpression ? filterExpression : undefined,
    startFromKey: nextKey
      ? {
          PK: `Publication#${nextKey}`,
          SK: `Publication#${nextKey}`,
        }
      : null,
    expressionAttributeValues,
  });

  return {
    items: items.map((item) => PublicationDTO.toPublication(item)),
    nextKey: lastEvaluatedKey ? lastEvaluatedKey.PK.split("#")[1] : null,
  };
};

export default getAllPublications;
