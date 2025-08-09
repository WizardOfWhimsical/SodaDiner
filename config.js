import process from "process";

const config = {
  port: process.env.PORT || 3000,
  dbHost: "localhost",
  dbPort: 27017,
};

switch (process.env.ENV) {
  case "test":
    config.db = "SodaDinerTest";
    break;
  case "dev":
    config.db = "SodaDiner";
    break;
  default:
    config.db = "SodaDiner";
}

config.dbUrl = `mongodb://${config.dbHost}:${config.dbPort}/${config.db}`;

export default config;
