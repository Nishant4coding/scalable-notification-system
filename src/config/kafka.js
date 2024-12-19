const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "notification-system",
  brokers: ["localhost:9092"], // Kafka broker address
});

module.exports = kafka;
