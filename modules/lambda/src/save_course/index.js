const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
  region: process.env.AWS_REGION,
  apiVersion: "2012-08-10"
});

const replaceAll = (str, find, replace) => {
    if (str && typeof str === 'string') {
        return str.replace(new RegExp(find, "g"), replace);
    }
    console.error("Input string is invalid:", str);
    return ''; // Returning an empty string if input is invalid
};

exports.handler = (event, context, callback) => {
    // Parse the event body if it's a string (API Gateway sends the body as a JSON string)
    let requestBody;
    if (event.body) {
        requestBody = JSON.parse(event.body);
    } else {
        requestBody = event;
    }

    // Check if the title exists in the parsed body
    if (!requestBody.title) {
        console.error("Title is missing in the event.");
        return callback("Title is required.");
    }

    const id = replaceAll(requestBody.title, " ", "-").toLowerCase();

    const params = {
        Item: {
            id: {
                S: id
            },
            title: {
                S: requestBody.title
            },
            watchHref: {
                S: `http://www.pluralsight.com/courses/${id}`
            },
            authorId: {
                S: requestBody.authorId || 'Unknown'  // Handle missing authorId
            },
            length: {
                S: requestBody.length || 'Unknown'  // Handle missing length
            },
            category: {
                S: requestBody.category || 'General'  // Handle missing category
            }
        },
        TableName: process.env.TABLE_COURSES
    };

    dynamodb.putItem(params, (err, data) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            // Properly format the response for Lambda Proxy Integration
            const response = {
                statusCode: 200,
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
            };
            callback(null, response);  // Return the response with correct format
        }
    });
};
