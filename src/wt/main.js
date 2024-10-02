import { Worker } from "worker_threads";
import os from "os";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let startNum = 10;
const numCPUs = os.cpus().length;

const performCalculations = async () => {
  const workerPromises = Array.from({ length: numCPUs }, () => {
    return new Promise((resolve) => {
      const worker = new Worker(path.join(__dirname, "worker.js"));

      worker.postMessage(startNum++);

      worker.on("message", (data) => {
        resolve({ status: "resolved", data });
        worker.terminate();
      });

      worker.on("error", () => {
        resolve({ status: "error", data: null });
      })
    })
  });

  const results = await Promise.all(workerPromises);
  console.log(results);
};

await performCalculations();