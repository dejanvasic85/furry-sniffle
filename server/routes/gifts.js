const express = require('express');
const router = express.Router();

const { Gift } = require('../db');
const { withAsync } = require('../middleware');
const { getGiftStatus } = require('../services/giftpayClient');

const logger = require('../logger');

  // from GiftPayAPI - transform to readable status but not leak gitPay details to consumers
  // 0 Send Error
  // 1 Not Yet Collected
  // 2 Collected
  // 3 Used/Expired
  // -1 Cancelled

const needToCheckStatus = (giftPayStatusId)=>{
  return giftPayStatusId != -1 && giftPayStatusId !=3;
}

const mapGiftPayStatus = (giftPayStatusId)=>{
  const idToText = {
    "1": "Not yet collected",
    "2": "Collected",
    "3": "Used",
    "-1": "Cancelled",
  };
  return idToText[giftPayStatusId] || "Unknown";
}

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
    status: mapGiftPayStatus(gift.giftpayStatus)
  }
}

router.get(
  '/',
  withAsync(async (req, res) => {
    const agentId = req.agent.id;
    logger.info(`Fetch gifts by agentId: ${agentId}`);
    const gifts = await Gift.findAll({
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
    }

    res.json(toSecureResponse(giftCard));
  })
);

module.exports = router;
