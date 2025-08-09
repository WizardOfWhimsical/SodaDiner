import config from "#config";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import sodaRouter from "#Routes/Soda";
import dinerRouter from "#Routes/Diner";
import { connect } from "#Connect";

const app = express();
let initalized = false;
app.use((req, res, next) => {
  if (!initalized) {
    res.clearCookie("diner");
    res.clearCookie("soda");
    initalized = true;
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("../SodaDiner"));

app.use("/soda(s)?", sodaRouter);
app.use("/diner(s)?", dinerRouter);

connect().then(() => {
  app.listen(config.port, () => {
    console.log(`@ port ${config.port}`);
  });
});

app.use((err, req, res, next) => {
  console.log(`${err}`);
});
