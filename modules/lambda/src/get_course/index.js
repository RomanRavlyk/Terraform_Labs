const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
  region: process.env.AWS_REGION,
  apiVersion: "2012-08-10"
});

exports.handler = (event, context, callback) => {
  // Access path parameter correctly
  const courseId = event.pathParameters && event.pathParameters.id;

  // Check if courseId is valid
  if (!courseId) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "'id' parameter is required."
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  const params = {
    Key: {
      id: {
        S: courseId
      }
    },
    TableName: process.env.TABLE_COURSES
  };

  dynamodb.getItem(params, (err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      if (data.Item) {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            id: data.Item.id.S,
            title: data.Item.title.S,
            watchHref: data.Item.watchHref.S,
            authorId: data.Item.authorId.S,
            length: data.Item.length.S,
            category: data.Item.category.S
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
      } else {
        callback(null, {
          statusCode: 404,
          body: JSON.stringify({
            message: `Course with id ${courseId} not found.`
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
    }
  });
};
