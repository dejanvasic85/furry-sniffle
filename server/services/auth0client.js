const axios = require('axios');
const { auth0 } = require('../config');
const logger = require('../logger');

const getUserInfo = (accessToken) => {
  const url = `${auth0.baseUri}userinfo`;

  logger.info(`Axios: ${url}, accessToken: ${accessToken}`);

  return axios.get(url, {
    headers: {
      "Authorization": `${accessToken}`,
      "Content-Type": "application/json"
    }
  }).then((response) => {
    return response.data;
  });
};

module.exports = {
  getUserInfo
};