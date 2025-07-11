import { createSign, createVerify } from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const privateKey = fs.readFileSync(
  path.join(__dirname, "privateKey.pem"),
  "utf8"
);
const publicKey = fs.readFileSync(
  path.join(__dirname, "publicKey.pem"),
  "utf8"
);

const message = "some data to sign";

// sign

const signer = createSign("rsa-sha256");

signer.update(message);

const signature = signer.sign(privateKey, "hex");

console.log(signature);

// verify

const verifier = createVerify("rsa-sha256");

verifier.update(message);

const isVerified = verifier.verify(publicKey, signature, "hex");

console.log(isVerified);
