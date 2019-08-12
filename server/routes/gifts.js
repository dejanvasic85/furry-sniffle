const express = require('express');
const router = express.Router();

const { Gift, Client } = require('../db');
const { withAsync } = require('../middleware');
const { getGiftStatus } = require('../services/giftpayClient');
const { needToCheckStatus, mapGiftPayStatus } = require('../services/giftService');
const logger = require('../logger');


// make sure we don't leak any secure fields to consumers i.e. actual Gift link , giftPay ID etc..
const toSecureResponse = (gift) => {
  return {
    id: gift.id,
    clientId: gift.clientId,
    agentId: gift.agentId,
    message: gift.message,
    from: gift.from,
    value: gift.value,
    createdAt: gift.createdAt,
    updatedAt: gift.updatedAt,
    status: mapGiftPayStatus(gift.giftpayStatus),
    Client: gift.Client
  }
}

router.get(
  '/',
  withAsync(async (req, res) => {
    const agentId = req.agent.id;
    logger.info(`Fetch gifts by agentId: ${agentId}`);
    const gifts = await Gift.findAll({
      include: [{
        model: Client,
        required: true
       }],
      where: {
        agentId
      },
      order: [['createdAt', 'DESC']]
    });

    res.json( gifts.map(toSecureResponse));
  })
);


router.get(
  '/:id/status',
  withAsync(async (req, res) => {
    const agentId = req.agent.id;
    const giftCardId = req.params.id;

    logger.info(`Check gift card status agentId: ${agentId} , giftCardId: ${giftCardId}`);
    const giftCard = await Gift.findOne({
      include: [{
        model: Client,
        required: true
       }],
      where: {
        id: giftCardId,
        agentId
      }
    });

    if(!giftCard){
      res.status(404).json({ error: 'unknown agentId,giftCardId' });
      return;
    }

    if(needToCheckStatus(giftCard.giftpayStatus)){
      logger.info(`checking gift card status giftCardId: ${giftCardId}, curren status: ${giftCard.giftpayStatus}`);
   
      const giftStatus = await getGiftStatus(undefined,giftCard.giftpayId);
      logger.info(`checked gift card status giftCardId: ${giftCardId}, status: ${giftStatus.giftStatus} ${giftStatus.message}`);
      
      giftCard.giftpayStatus = giftStatus.giftStatus;
  
      const fieldsToUpdate = {
        giftpayStatus:giftStatus.giftStatus,
        updatedAt: new Date()
      };
  
      await Gift.update(fieldsToUpdate, {
        where: { id: giftCardId },
        returning: true
      });

       giftCard.giftpayStatus = fieldsToUpdate.giftpayStatus;
       giftCard.updatedAt = fieldsToUpdate.updatedAt;
    }

    res.json(toSecureResponse(giftCard));
  })
);

module.exports = router;
