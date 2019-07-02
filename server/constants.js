module.exports = {
  MESSAGE_CHANNEL: Object.freeze({
    WHATSAPP: 'whatsapp',
    MESSENGER: 'messenger',
    SMS: 'sms',
    EMAIL: 'email'
  }),

  STRIPE: Object.freeze({
    STATUS: {
      SUCCEEDED: 'succeeded'
    }
  }),

  PAYMENT_METHOD: Object.freeze({ 
    CREDIT_CARD: 'credit_card',
    ACCOUNT: 'account'
  }),

  EMAIL_TYPE: Object.freeze({
    WELCOME_EMAIL: 'welcome_email',
    GIFT_EMAIL: 'gift_email'
  })
};