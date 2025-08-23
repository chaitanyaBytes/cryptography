import * as bip39 from "bip39";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";

const mnemonic = bip39.generateMnemonic();

console.log("mnemonic: ", mnemonic);

const seed = await bip39.mnemonicToSeed(mnemonic);

console.log("seed: ", seed);

/* 
    🔑 The Role of the 64-byte Master Seed
    The 64-byte master seed from your mnemonic is input to a deterministic key derivation function (BIP32/BIP44/BIP32-Ed25519, depending on curve).
    That seed is split and processed with HMAC-SHA512 to derive:
    32-byte private key material
    32-byte chain code (used for deterministic child derivations)
    This means the whole 64 bytes matter — not just “choose any 32.”
*/

// generating new keys using subarrays
// NOTE: this method is wrong, you, this is not thw way to derive multiple addresses from seeds
for (let i = 0; i < 4; i++) {
  let keyPair_seed = seed.subarray(i, 32 + i);
  let kp = Keypair.fromSeed(keyPair_seed);
  console.log(`keypair ${i}: ${kp.publicKey.toBase58()}`);
}

// generating new keys using dervation paths
for (let i = 0; i < 4; i++) {
  let path = `m/44'/501'/${i}'/0'`;
  let derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = Keypair.fromSeed(derivedSeed);
  console.log(`keypair ${i}: ${secret.publicKey.toBase58()}`);
}
