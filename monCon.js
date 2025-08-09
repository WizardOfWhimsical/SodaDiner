import mongoose from "mongoose";
import config from "#config";

export function disconnect() {
  return mongoose.connection.close();
}

export function connect() {
  return mongoose.connect(config.dbUrl).then(() => {
    mongoose.connection.on("connected", () => {
      console.log(`\n connection had been made, kaboom!`);
    });
    mongoose.connection.on("error", (e) => {
      console.log(`\n Connection Error is shown here: ${e}`);
    });
    process.on("SIGINT", () => {
      mongoose.connection.close().then(() => {
        console.log(`\n Server ShutDown, mongoose process disconnected`);
        process.exit(0);
      });
    });
  });
}
