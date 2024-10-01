import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirPath = path.join(__dirname, "files");
const errorMessage = "FS operation failed";

const list = async () => {
  try {
    const files = await fs.readdir(dirPath);
    for (const file of files) {
      console.log(file);
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      throw Error(errorMessage);
    } else {
      throw error;
    }
  }
};

await list();