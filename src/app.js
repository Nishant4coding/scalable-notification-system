require("dotenv").config(); // Load environment variables

const runConsumer = require("./consumers/notificationService");
const produceEvent = require("./producers/eventProducer");

(async () => {
  try {
    console.log("Starting Kafka Consumer...");
    await runConsumer(); // Start Kafka Consumer
    console.log("Kafka Consumer started successfully.");

    // Simulate Event Production (Testing)
    setTimeout(async () => {
      try {
        console.log("Producing test event...");
        await produceEvent(); // Produce an event
        console.log("Test event produced successfully.");
      } catch (producerError) {
        console.error("Error while producing event:", producerError);
      }
    }, 5000);
  } catch (consumerError) {
    console.error("Error while running Kafka Consumer:", consumerError);
    process.exit(1); // Exit the application in case of a critical error
  }
})();
