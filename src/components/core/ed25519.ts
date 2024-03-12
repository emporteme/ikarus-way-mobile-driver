import { sha512 } from '@noble/hashes/sha512';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';

// Ed25519 implementation based on the RFC: https://datatracker.ietf.org/doc/html/rfc8032

const Ed25519Constants = {
    b: 256,
    l: 252,
    q: BigInt('57896044618658097711785492504343953926634992332820282019728792003956564819949'),
    d: BigInt('-4513249062541557337682224000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'),
    l2: BigInt('0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed'),
};

function modl(r: bigint, q: bigint): bigint {
    return r >= q ? r - q : r;
}

function bits2int(bs: Uint8Array): bigint {
    let res = BigInt(0);
    let digits = 64; // digits is the chunk size for which to multiply the ints

    for (let i = bs.length - 1; i > -1; i--) {
        let this_digit = Number(bs[i]);
        res += BigInt(this_digit) * (BigInt(2) ** BigInt(digits * (bs.length - 1 - i)));
    }
    return res;
}

function int2bytes(x: bigint, len: number): Uint8Array {
    const bs = x.toString(16).padStart(len * 2, '0');
    const res = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        res[i] = parseInt(bs.slice(i * 2, i * 2 + 2), 16);
    }
    return res;
}

function H(m: Uint8Array): Uint8Array {
    return sha512(m);
}

function generatePrivateKey(): Uint8Array {
    const seed = Crypto.randomBytes(32);
    const h = H(seed);
    const hash = modl(bits2int(h.slice(0, 32)), Ed25519Constants.l);
    const privateKey = int2bytes(hash, 32);
    return privateKey;
}

function generatePublicKey(privateKey: Uint8Array): Uint8Array {
    const a = bits2int(H(privateKey));
    const A = modl(((a - Ed25519Constants.d) * modl(Ed25519Constants.d, Ed25519Constants.l2) ** -1), Ed25519Constants.q);
    const publicKey = int2bytes(A, 32);
    return publicKey;
}

function sign(message: Uint8Array, privateKey: Uint8Array): Uint8Array {
    const publicKey = generatePublicKey(privateKey);
    const r = H(privateKey.slice(0, 32).concat(message));
    const hram = bits2int(r.slice(32)) & (Ed25519Constants.l - 1);
    const s = modl((hram + bits2int(H(privateKey).slice(0, 32)) * bits2int(r.slice(0, 32))), Ed25519Constants.l);
    const signature = new Uint8Array(64);
    const rBytes = int2bytes(bits2int(r.slice(0, 32)), 32);
    const sBytes = int2bytes(s, 32);
    signature.set(rBytes, 0);
    signature.set(sBytes, 32);
    return signature;
}

function verify(signature: Uint8Array, message: Uint8Array, publicKey: Uint8Array): boolean {
    const r = bits2int(signature.slice(0, 32));
    const s = bits2int(signature.slice(32));
    const A = bits2int(publicKey);
    const hram = modl(s, Ed25519Constants.l);
    const gammaX = modl(hram * modl(Ed25519Constants.d, Ed25519Constants.l2) ** -1, Ed25519Constants.q);
    const gammaY = modl(r * modl(A, Ed25519Constants.q), Ed25519Constants.q);
    const u = int2bytes(modl(bits2int(H(int2bytes(gammaY, 32).concat(publicKey, message))) * Ed25519Constants.l, Ed25519Constants.l2), 32);
    const v = int2bytes(modl(bits2int(H(int2bytes(gammaX, 32).concat(u))) * Ed25519Constants.l, Ed25519Constants.l2), 32);
    const R = modl(bits2int(v) + bits2int(u) * A, Ed25519Constants.q);
    return R === r;
}

// Example usage
const privateKey = generatePrivateKey();
const publicKey = generatePublicKey(privateKey);

const message = hexToBytes('616263'); // "abc" in hex
const signature = sign(message, privateKey);

console.log('Private Key:', bytesToHex(privateKey));
console.log('Public Key:', bytesToHex(publicKey));
console.log('Signature:', bytesToHex(signature));

const isValid = verify(signature, message, publicKey);
console.log('Signature is valid:', isValid);