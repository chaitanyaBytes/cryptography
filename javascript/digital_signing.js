import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import {
  generateKeyPair,
  signBytes,
  verifySignature,
  getUtf8Encoder,
  getBase58Decoder,
} from "@solana/kit";
function legacy() {
  let kp = Keypair.generate();

  let message = "Zindagi lambi nahi badi honi chaiye";

  let message_bytes = new TextEncoder().encode(message);
  let signature = nacl.sign.detached(message_bytes, kp.secretKey);

  let is_valid = nacl.sign.detached.verify(
    message_bytes,
    signature,
    kp.publicKey.toBytes()
  );

  console.log(is_valid);
}

async function kit() {
  let kp = await generateKeyPair();
  let message = "jsut show up everyday";

  let message_bytes = getUtf8Encoder().encode(message);

  let signature = await signBytes(kp.privateKey, message_bytes);

  let is_valid = await verifySignature(kp.publicKey, signature, message_bytes);

  console.log(is_valid);
}

kit();
