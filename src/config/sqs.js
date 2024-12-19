const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1", // Change region if needed
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const sqs = new AWS.SQS();
module.exports = sqs;
