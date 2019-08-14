const axios = require('axios');
const { giftPay } = require('../envConfig');
const logger = require('../logger');
const uuidv4 = require('uuid/v4');

const NOT_COLLECTED = 1;
const COLLECTED = 2;
const USED_OR_EXPIRED = 3;
const CREATED = 0;

const generateGiftLink = async (from, to, value, message) => {
  const url = `${giftPay.baseUrl}/api/gift.svc/get`;

  const clientRef = uuidv4().toString();

  logger.info(
    `Generating gift: ${url}, ${from} ${to} ${value} ${message}, clientRef :${clientRef}`
  );

  const response = await axios.get(url, {
    params: {
      key: giftPay.apiKey,
      from,
      to,
      value,
      message,
      clientRef
    }
  });

  const payload = response.data;
  if (payload.StatusCode !== 1) {
    logger.error(
      `Failed to generate gift. ${payload.StatusCode} ${payload.Message}`
    );
    throw new Error(payload.Message);
  }

  return {
    expiry: payload.Expiry,
    giftId: payload.GiftID,
    giftUrl: payload.eGiftURL,
    clientRef: clientRef,
    status: CREATED
  };
};

const getGiftStatus = async (email, giftId) => {
  const url = `${giftPay.baseUri}/api/gift.svc/get`;

  logger.info(`Checking gift status: ${url}, ${email} giftId: ${giftId}`);

  const response = await axios.get(url, {
    params: {
      key: giftPay.apiKey,
      email,
      giftId
    }
  });

  const payload = response.data;
  if (payload.StatusCode !== 1) {
    logger.error(
      `Failed to generate gift. ${payload.StatusCode} ${payload.Message}`
    );
    throw new Error(payload.Message);
  }

  return {
    giftStatus: payload.GiftStatus,
    message: payload.Message
  };
};

module.exports = {
  generateGiftLink,
  getGiftStatus,
  NOT_COLLECTED,
  COLLECTED,
  USED_OR_EXPIRED
};
