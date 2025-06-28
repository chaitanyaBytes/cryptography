import { createHmac } from "crypto";

const key = "secret";
const message = "Hello World";

const hmac = createHmac("sha256", key).update(message).digest("hex");

console.log(hmac);
