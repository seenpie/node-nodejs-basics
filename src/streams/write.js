import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import {pipeline} from "stream/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "files/fileToWrite.txt");

const write = async () => {
  const fileWriteStream = createWriteStream(filePath, { flags: "a" });

  try {
    await pipeline(process.stdin, fileWriteStream);
  } catch (error) {
    console.error(error);
  }
};

await write();