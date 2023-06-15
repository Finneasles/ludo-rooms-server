
export const normalizePort = ({ val }: { val: string }) => {
  const port = parseInt(val.toString(), 10);
  if (isNaN(port) && +val <= 0) {
    throw new Error("Invalid port");
  }
  return port;
};

export const NodeErrorListener = () => {
  process.on("unhandledRejection", (reason, promise) => console.log({ message: `Unhandled Promise Rejection: ${reason}`,promise, type: "warn" }));
  process.on("uncaughtException", (error) => console.log({ message: `Uncaught Exception: ${error.stack}`, type: "warn" }));
  process.on("uncaughtExceptionMonitor", (error, origin) => console.log({ message: `Uncaught Exception Monitor: ${error.stack}`, origin, type: "warn" }));
};

export const getRandomNumber = (length: number = 1): number => {
  let min = Math.pow(10, length - 1);
  let max = min * 10 - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
