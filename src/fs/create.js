import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, "files");
const fileName = "fresh.txt";
const fileContent = "I am fresh and young";
const filePath = path.join(directoryPath, fileName);
const errorMessage = "FS operation failed";

const create = async () => {
  try {
    await fs.access(filePath).then(() => {
      throw Error(errorMessage);
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(filePath, fileContent);
    } else {
      throw error;
    }
  }
};

await create();