import { createHash } from "crypto";

function findhashwithprefix(prefix) {
  let input = 0;
  while (true) {
    const hash = createHash("sha256").update(input.toString()).digest("hex");
    if (hash.startsWith(prefix)) {
      return { input, hash };
    }
    input++;
  }
}

const result = findhashwithprefix("00000");
console.log(`${result.input} ${result.hash}`);
