const fs = require('fs');
const env = require('dotenv');
const csv = require('csv-parser');
env.config();
const { db, Client } = require('../server/db');
const { generateReferralCode } = require('../server/services/clientService');

const csvToClients = async fileName => {
  return new Promise((res, rej) => {
    const content = [];
    fs.createReadStream(fileName)
      .pipe(csv())
      .on('data', data => {
        content.push(data);
      })
      .on('end', () => {
        res(content);
      })
      .on('error', err => {
        res(err);
      });
  });
};

const main = async ({ fileName, agentId }) => {
  await db.authenticate();
  const clientsToStore = await csvToClients(fileName);

  const promises = clientsToStore.map(({ firstNameReplay, lastName, email }) => {
    return Client.create({
      agentId,
      firstName: firstNameReplay,
      lastName,
      email,
      phone: '0400 000 000',
      referralCode: email,
      isActive: true
    });
  });

  console.log('Creating clients. Please wait ...');
  const savedClients = await Promise.all(promises);

  const updatePromises = savedClients.map(({ dataValues }) => {
    const createdClient = dataValues;
    console.log('createdClient', createdClient);
    return Client.update(
      { referralCode: generateReferralCode(createdClient) },
      { where: { id: createdClient.id } }
    );
  });

  console.log('Updating clients with referral codes. Please Wait ...');
  const updatedClients = await Promise.all(updatePromises);

  console.log('Done');
};

main({ agentId: 11, fileName: 'aleks-naumoski.csv' });
