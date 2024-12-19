module.exports.filterEvent = (event) => {
  const isTransactional = event.eventType === "photo_liked";
  const isPromotional = event.eventType === "marketing_email";
  return { isTransactional, isPromotional };
};
