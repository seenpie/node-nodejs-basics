import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream, promises as fs } from "fs";
import { createUnzip } from "zlib";
import {fileURLToPath} from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const compressedFilePath = path.join(__dirname, "files/archive.gz");
  const outputFilePath = path.join(__dirname, "files/fileToCompress.txt");

  try {
    await fs.access(compressedFilePath);

    await pipeline(
      createReadStream(compressedFilePath),
      createUnzip(),
      createWriteStream(outputFilePath)
    );

    await fs.rm(compressedFilePath, { recursive: true });
  } catch (error) {
    console.error(error);
  }
};

await decompress();