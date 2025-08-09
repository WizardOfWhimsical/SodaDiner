import inquirer from "inquirer";
import { exec, spawn } from "child_process";
import { resolve } from "path";
// import { ConnectionCheckOutFailedEvent } from "mongodb";

let prompt = inquirer.createPromptModule();
let myPath = resolve();
let initQuestion = [
  {
    type: "list",
    name: "pick",
    message: "Pick what you would like to do",
    choices: ["Start Server", "Run Tests", "Save/Restore Database"],
  },
  {
    type: "list",
    name: "testChoice",
    message: "What test would you like to run?",
    choices: ["Model", "Controller", "Route", "C.R.U.D.", "All of them"],
    when: (a) => a.pick === "Run Tests",
  },
  {
    type: "list",
    name: "backUp",
    message: "What back up action would you like to take?",
    choices: ["Save DataBase", "Restore DataBase"],
    when: (a) => a.pick === "Save/Restore Database",
  },
];

prompt(initQuestion).then((r) => {
  console.log(r);
  switch (r.pick) {
    case "Start Server":
      const subprocess = spawn("npm start", [], {
        detached: true,
        stdio: ["inherit", "inherit", "inherit"],
        shell: true,
      });
      process.on("SIGINT", () => {
        console.log("\n \t" + "Hit Target");
        subprocess.kill("SIGINT");
      });
      break;
    case "Run Tests":
      switch (r.testChoice) {
        case "Model":
          funkySpawn("model");
          break;
        case "Controller":
          funkySpawn("controller");
          break;
        case "Route":
          funkySpawn("route");
          break;
        case "C.R.U.D.":
          funkySpawn("crud");
          break;
        case "All of them":
          funkySpawn("allTest");
          break;
      } //end run test switch
    case "Save/Restore Database":
      switch (r.backUp) {
        case "Save DataBase":
          funkySpawn("dumpDev");
          break;
        case "Restore DataBase":
          funkySpawn("restoreDev");
          break;
      }
  } //end switch
}); //end of propmt

// ["Start Server", "Run Tests", "Save/Restore Database"]

let funkySpawn = (here) =>
  spawn(`npm run ${here}`, [], {
    detached: true,
    stdio: ["inherit", "inherit", "inherit"],
    shell: true,
  });
