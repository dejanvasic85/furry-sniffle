// from GiftPayAPI - transform to readable status but not leak gitPay details to consumers
// 0 Send Error
// 1 Not Yet Collected
// 2 Collected
// 3 Used/Expired
// -1 Cancelled

const needToCheckStatus = (giftPayStatusId) => {
  return giftPayStatusId != -1 && giftPayStatusId != 3;
}

const mapGiftPayStatus = (giftPayStatusId) => {
  const idToText = {
    "1": "Not collected",
    "2": "Collected",
    "3": "Used",
    "-1": "Cancelled",
  };
  return idToText[giftPayStatusId] || "Unknown";
}

module.exports = {
  needToCheckStatus,
  mapGiftPayStatus,
};
