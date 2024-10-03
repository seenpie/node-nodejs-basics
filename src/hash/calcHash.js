import { pipeline } from "stream/promises";
import { createHash } from "crypto";
import { createReadStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  const hash = createHash("sha256");
  const filePath = path.join(__dirname, "files/fileToCalculateHashFor.txt");

  try {
    await pipeline(createReadStream(filePath), hash);
    console.log(hash.digest("hex"));
  } catch (error) {
    console.error(error);
  }
};

await calculateHash();