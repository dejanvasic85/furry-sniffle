const { expect } = require('chai');

const { encrypt, decrypt } = require('./security');

describe('security', () => {
  it('should encrypt and decrypt successfully', () => {
    const initialValue = 'password123';
    const encrypted = encrypt(initialValue);
    expect(encrypted).not.to.equal(initialValue);
    
    const decrypted = decrypt(encrypted);
    expect(decrypted).to.equal(initialValue);
  });
});