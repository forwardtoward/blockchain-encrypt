const secp = require('ethereum-cryptography/secp256k1');
const {toHex} = require('ethereum-cryptography/utils');

const privateKey = toHex(secp.utils.randomPrivateKey());
const publickKey = toHex(secp.getPublicKey(privateKey));

console.log(privateKey);

console.log(publickKey);

