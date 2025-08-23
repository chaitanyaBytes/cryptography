import { createHash } from "crypto";

function findhashwithprefix(prefix) {
  let input = 0;
  while (true) {
    let inputString = `hi\n` + input.toString();
    const hash = createHash("sha256").update(inputString).digest("hex");
    if (hash.startsWith(prefix)) {
      return { inputString, hash };
    }
    input++;
  }
}

const result = findhashwithprefix("00000");
console.log(`${result.inputString} ${result.hash}`);
