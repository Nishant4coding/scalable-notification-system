const kafka = require("../config/kafka");

const producer = kafka.producer();

const produceEvent = async () => {
  await producer.connect();

  const event = {
    userId: 123,
    eventType: "photo_liked",
    timestamp: new Date().toISOString(),
  };

  await producer.send({
    topic: "notifications",
    messages: [{ value: JSON.stringify(event) }],
  });

  console.log("Event sent:", event);
  await producer.disconnect();
};

module.exports = produceEvent;
