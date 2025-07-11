import { publicEncrypt, publicDecrypt } from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const publicKey = fs.readFileSync(
  path.join(__dirname, "publicKey.pem"),
  "utf8"
);
console.log(publicKey);

console.log("--------------------------------");

const privateKey = fs.readFileSync(
  path.join(__dirname, "privateKey.pem"),
  "utf8"
);
console.log(privateKey);

const message = "Your mom is nice";

const encryptedData = publicEncrypt(publicKey, Buffer.from(message));
console.log("Encrypted data: ", encryptedData.toString("hex"));

const decryptedData = publicDecrypt(privateKey, encryptedData);
console.log("Decrypted data: ", decryptedData.toString("utf8"));
