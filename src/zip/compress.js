import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream, promises as fs } from "fs";
import { createGzip } from "zlib";
import {fileURLToPath} from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const filePath = path.join(__dirname, "files/fileToCompress.txt");
  const outputFilePath = path.join(__dirname, "files/archive.gz");

  try {
    await fs.access(filePath);

    await pipeline(
      createReadStream(filePath),
      createGzip(),
      createWriteStream(outputFilePath)
    );

    await fs.rm(filePath, { recursive: true });
  } catch (error) {
    console.error(error);
  }
};

await compress();