import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import { pipeline } from "stream/promises";
import path from "path";
import { EOL } from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "files/fileToRead.txt");

const read = async () => {
  try {
    await pipeline(createReadStream(filePath), process.stdout, { end: false });
    process.stdout.write(EOL);
  } catch (error) {
    console.error(error);
  }
};

await read();