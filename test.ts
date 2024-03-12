import * as nacl from 'tweetnacl';

// Convert private key string to Uint8Array
const privateKeyString = 'bb5a9e04a0baaf8cda5cd8718c18d113daa752a4b47dbf10a1c6684a496b241c';
const privateKeyBytes = Uint8Array.from(Buffer.from(privateKeyString, 'hex'));

// Generate public key from private key
const publicKeyBytes = nacl.sign.keyPair.fromSecretKey(privateKeyBytes).publicKey;

// Convert public key to base64 string
const publicKeyString = Buffer.from(publicKeyBytes).toString('base64');

// Function to sign data
function signData(data: Uint8Array, privateKey: Uint8Array): Uint8Array {
    return nacl.sign.detached(data, privateKey);
}

// Example usage
const dataToSign = Uint8Array.from(Buffer.from('Data to sign'));
const signature = signData(dataToSign, privateKeyBytes);
const signatureBase64 = Buffer.from(signature).toString('base64');

console.log('Public Key:', publicKeyString);
console.log('Signature:', signatureBase64);
