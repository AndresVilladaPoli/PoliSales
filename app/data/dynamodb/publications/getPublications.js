/* import dynamoClient from "../client.js"; 
import { unmarshall } from "@aws-sdk/util-dynamodb"; 

const getPublications = async (userEmail) => {
  const params = {
    TableName: "Publications", 
    KeyConditionExpression: "authorEmail = :email",
    ExpressionAttributeValues: {
      ":email": { S: userEmail }, 
    },
  };

  try {
    const result = await dynamoClient.send(new QueryCommand(params)); 
    return result.Items ? result.Items.map(item => unmarshall(item)) : []; 
  } catch (error) {
    console.error("Error al obtener publicaciones: ", error);
    return [];
  }
};

export default getPublications; */
