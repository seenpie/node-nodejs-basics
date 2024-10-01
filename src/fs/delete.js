import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirPath = path.join(__dirname, "files");
const fileName = "fileToRemove.txt";
const filePath = path.join(dirPath, fileName);
const errorMessage = "FS operation failed";

const remove = async () => {
  try {
    await fs.rm(filePath, { recursive: true });
  } catch (error) {
    if (error.code === "ENOENT") {
      throw Error(errorMessage);
    } else {
      throw error;
    }
  }
};

await remove();