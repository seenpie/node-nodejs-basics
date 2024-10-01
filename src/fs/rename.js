import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDirPath = path.join(__dirname, "files");
const properFileName = "properFilename.md";
const sourceFileName = "wrongFilename.txt";
const errorMassage = "FS operation failed";

const sourceFilePath = path.join(sourceDirPath, sourceFileName);
const properFilePath = path.join(sourceDirPath, properFileName);

const rename = async () => {
  try {
    await fs.rename(sourceFilePath, properFilePath)
  } catch (error) {
    if (error.code === "ENOENT") {
      throw Error(errorMassage);
    } else {
      throw error;
    }
  }
};

await rename();