const sqs = require("../config/sqs");

module.exports.sendToQueue = async (message, isTransactional, userState) => {
  const QueueUrl = isTransactional
    ? process.env.SQS_TRANSACTIONAL_QUEUE
    : process.env.SQS_PROMOTIONAL_QUEUE;

  const params = {
    QueueUrl,
    MessageBody: JSON.stringify({ ...message, userState }),
  };

  await sqs.sendMessage(params).promise();
  console.log("Message sent to SQS:", message);
};
