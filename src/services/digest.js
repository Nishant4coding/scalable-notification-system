module.exports.createDigest = (event) => {
  return {
    userId: event.userId,
    message: `You have a new ${event.eventType}`,
    timestamp: event.timestamp,
  };
};
