import { fork } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
  const childPath = path.join(__dirname, "files/script.js");
  const child = fork(childPath, args, {
    stdio: ["pipe", "pipe", "pipe", "ipc"]
  });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.stdout.on("data", (data) => {
    process.stdout.write(`Received from child process: ${data}`);
  });
};

await spawnChildProcess(["value1", "value2"]);
