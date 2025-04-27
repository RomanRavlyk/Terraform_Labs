const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
  region: process.env.AWS_REGION,
  apiVersion: "2012-08-10"
});

exports.handler = (event, context, callback) => {
  // Parse the event body if it's coming from API Gateway
  const body = JSON.parse(event.body);

  // Validate required fields
  const requiredFields = ['id', 'title', 'watchHref', 'authorId', 'length', 'category'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          message: `Missing required field: ${field}`
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  }

  const params = {
    Item: {
      id: { S: body.id },
      title: { S: body.title },
      watchHref: { S: body.watchHref },
      authorId: { S: body.authorId },
      length: { S: body.length },
      category: { S: body.category }
    },
    TableName: process.env.TABLE_COURSES
  };

  dynamodb.putItem(params, (err, data) => {
    if (err) {
      console.log("Error:", err);
      return callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: "Internal server error",
          error: err.message
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
    } else {
      return callback(null, {
        statusCode: 201,
        body: JSON.stringify({
          id: params.Item.id.S,
          title: params.Item.title.S,
          watchHref: params.Item.watchHref.S,
          authorId: params.Item.authorId.S,
          length: params.Item.length.S,
          category: params.Item.category.S
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  });
};
