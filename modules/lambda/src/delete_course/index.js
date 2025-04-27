const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
  region: process.env.AWS_REGION,
  apiVersion: "2012-08-10"
});

exports.handler = (event, context, callback) => {
  const courseId = event.pathParameters && event.pathParameters.id;  // Ensure pathParameters is not null

  if (!courseId) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: "Course ID is required" })
    });
    return;
  }

  const params = {
    Key: {
      id: {
        S: courseId
      }
    },
    TableName: process.env.TABLE_COURSES
  };

  dynamodb.deleteItem(params, (err, data) => {
    if (err) {
      console.log("Error deleting item: ", err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({ message: "Failed to delete course", error: err })
      });
    } else {
      console.log("Deleted item:", data);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ message: "Course deleted successfully", data: data })
      });
    }
  });
};
