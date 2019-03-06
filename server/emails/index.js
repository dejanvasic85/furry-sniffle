const axios = require('axios');

const { sendGrid } = require('../config');

const body = JSON.stringify({
  "from": {
    "email": "support@agento.com"
  },
  "personalizations": [{
    "to": [{
      "email": "dejanvasic24@gmail.com"
    }],
    "dynamic_template_data": {
      "agentName": "Alex",
      "clientName": "Foo",
      "agentRewardsUrl": "http://google.com.au",
      "clientReferralUrl": "http://google.com.au"
    }
  }],
  "template_id": "d-3cd3de0b1a7345d384e9662fbd7ebbe1"
});

const sendMail = (templateId) => {
  const axiosConfig = {
    method: 'POST',
    url: `${sendGrid.baseUrl}/mail/send`,
    body: body,
    headers: {
      'Authorization': `Bearer ${sendGrid.apiKey}`,
      'Content-Type': 'application/json'
    }
  };

  console.log('sending to axios', axiosConfig);
  return axiosConfig;
};


module.exports = {
  newClient: () => {
    const newClientTemplateId = "d-3cd3de0b1a7345d384e9662fbd7ebbe1";
    return axios(sendMail(newClientTemplateId));
  }
};