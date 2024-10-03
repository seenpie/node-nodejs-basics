const parseEnv = () => {
  const prefix = "RSS_";

  const envArgs = Object.entries(process.env).filter(([key, _]) => key.startsWith(prefix)).map(([key, value]) => `${key}=${value}`);
  console.log(envArgs.join("; "));
};

parseEnv();