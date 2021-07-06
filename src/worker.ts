import { APIGatewayProxyEvent } from "aws-lambda";
export default async (event: APIGatewayProxyEvent) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        input: event,
        message: "hello creature ...",
      },
      null,
      2
    ),
  };
};
