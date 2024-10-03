import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDirectory = path.join(__dirname, "files");
const copiedDirectory = path.join(__dirname, "files_copy");
const errorMessage = "FS operation failed";

const isCopiedDirectoryExisted = await fs.access(copiedDirectory).then(() => true).catch(() => false);

const copy = async () => {
  if (isCopiedDirectoryExisted) {
    throw Error(errorMessage);
  }

  try {
    const files = await fs.readdir(sourceDirectory);
    await fs.mkdir(copiedDirectory, { recursive: true });

    for (const file of files) {
      const sourcePath = path.join(sourceDirectory, file);
      const targetPath = path.join(copiedDirectory, file);
      await fs.copyFile(sourcePath, targetPath);
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      throw Error(errorMessage);
    } else {
      throw error;
    }
  }
};

await copy();
