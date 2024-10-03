const parseArgs = () => {
  const args = process.argv.slice(2).join(" ");

  const regex = /--(\S+)\s+(\S+)/g;
  const argsList = [];
  let match;

  while ((match = regex.exec(args)) !== null) {
    const [_, propName, value] = match;
    argsList.push(`${propName} is ${value}`);
  }

  console.log(argsList.join(", "));
};

parseArgs();