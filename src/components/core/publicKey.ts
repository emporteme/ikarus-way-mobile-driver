const { getPublicKey } = require('ed25519-hd-key');

export async function getPublicKeyFromPrivateKey(privateKey: string): Promise<string> {
    try {
        const bytes = new Uint8Array(Math.ceil(privateKey.length / 2));
        for (var i = 0; i < bytes.length; i++) {
            bytes[i] = parseInt(privateKey.substr(i * 2, 2), 16);
        }

        const privatekeyBit = bytes;
        const publicKeyBit = getPublicKey(privatekeyBit);
        const publicKey = publicKeyBit.toString('hex').substring(2);

        return publicKey;
    } catch (error) {
        console.error('Error generating public key:', error);
        throw error;
    }
}
