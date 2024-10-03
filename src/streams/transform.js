import { Transform } from "stream";

class ReverseTextStream extends Transform {
  _transform(chunk, encoding, callback) {
    const reversedChunk = chunk.toString().split("").reverse().join("");
    this.push(reversedChunk);
    callback();
  }
}

const transform = async () => {
  const reverseStream = new ReverseTextStream();

  process.stdin.pipe(reverseStream).pipe(process.stdout);

  process.stdin.on("data", () => {
    process.stdout.write("\n");
    process.stdin.pause();
  })
};

await transform();