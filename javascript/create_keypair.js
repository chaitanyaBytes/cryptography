import { Keypair } from "@solana/web3.js";
import { generateKeyPairSigner } from "@solana/kit";

const keypair = Keypair.generate();
console.log("address:", keypair.publicKey.toBytes());
console.log("secret:", keypair.secretKey);

const signer = await generateKeyPairSigner();
console.log("address: ", signer.address);
console.log("secret: ", signer.keyPair.privateKey);
