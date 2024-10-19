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
    keyConditionExpression: "GSI6PK = Publication",
  },
  [orderAndFilterBy.price]: {
    indexName: "GSI5",
    keyConditionExpression:
      "GSI5PK = Publication AND GSI5SK BETWEEN :start AND :end",
  },
  [orderAndFilterBy.category]: {
    indexName: "GSI4",
    keyConditionExpression: "GSI4PK = Publication AND GSI4SK = :category",
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

  const { items, lastEvaluatedKey } = await queryItems({
    ...filterKeys[orderBy],
    limit: LIMIT_SEARCH,
    filterExpression,
    startFromKey: nextKey,
    expressionAttributeValues,
  });

  return {
    items: items.map((item) => PublicationDTO.toPublication(item)),
    nextKey: lastEvaluatedKey,
  };
};

export default getAllPublications;
