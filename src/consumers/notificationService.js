const kafka = require("../config/kafka");
const filterService = require("../services/filterService");
const stateService = require("../services/stateService");
const digestService = require("../services/digestService");
const queueService = require("../services/queueService");

const consumer = kafka.consumer({ groupId: "notification-group" });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "notifications", fromBeginning: true });

  console.log("Kafka Consumer is running...");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());

      // Step 1: Filter events
      const { isTransactional, isPromotional } =
        filterService.filterEvent(event);

      // Step 2: User state handling
      const userState = await stateService.getUserState(event.userId);

      // Step 3: Digest messages
      const digestedMessage = digestService.createDigest(event);

      // Step 4: Add to SQS priority queue
      await queueService.sendToQueue(
        digestedMessage,
        isTransactional,
        userState
      );
    },
  });
};

module.exports = runConsumer;
