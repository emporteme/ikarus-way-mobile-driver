"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nacl = require("tweetnacl");
// Convert private key string to Uint8Array
var privateKeyString = 'bb5a9e04a0baaf8cda5cd8718c18d113daa752a4b47dbf10a1c6684a496b241c';
var privateKeyBytes = Uint8Array.from(Buffer.from(privateKeyString, 'hex'));
// Generate public key from private key
var publicKeyBytes = nacl.sign.keyPair.fromSecretKey(privateKeyBytes).publicKey;
// Convert public key to base64 string
var publicKeyString = Buffer.from(publicKeyBytes).toString('base64');
// Function to sign data
function signData(data, privateKey) {
    return nacl.sign.detached(data, privateKey);
}
// Example usage
var dataToSign = Uint8Array.from(Buffer.from('Data to sign'));
var signature = signData(dataToSign, privateKeyBytes);
var signatureBase64 = Buffer.from(signature).toString('base64');
console.log('Public Key:', publicKeyString);
console.log('Signature:', signatureBase64);
