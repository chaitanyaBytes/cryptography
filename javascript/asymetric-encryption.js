import { publicKey, privateKey } from "../keypair.js";
import { createSign, createVerify } from "crypto";

const signer = createSign("rsa-sha256");

signer.update("some data to sign");

const signature = signer.sign(privateKey, "hex");

console.log(signature);
