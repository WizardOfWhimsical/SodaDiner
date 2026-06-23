import mongoose from "mongoose";
import assert from "assert";
import Resp from "#Resp";
// import DinerMod from "#Models/Diner";
import DinerCon from "#Controllers/Diner";

describe("Diner crud operations...", () => {
  const User = mongoose.Types.ObjectId;
  const same_id = new User(); //used to make fails

  describe("getOne success/fail test...", () => {
    it("getOne success test", (done) => {
      let req = {
        params: {
          dinerID: "661e7333714d6eaaebfb2c08",
        },
      };

      let res = {
        ...Resp,
        expStatus: 200,
        done,
        Asserts: [
          {
            funct: assert.strictEqual,
            condition: [
              {
                result: "location",
                answer: "TimBuck2, NoWhere",
              },
            ],
          },
        ],
      };
      DinerCon.getOne(req, res);
    }); //It success block

    it("getOne fail test", (done) => {
      let req = {
        params: {
          dinerID: same_id,
        },
      };

      let res = {
        ...Resp,
        expStatus: 404,
        done,
        Asserts: [
          {
            funct: assert.match,
            condition: [
              {
                result: "match",
                answer: /Diner not found/,
              },
            ],
          },
        ],
      };
      DinerCon.getOne(req, res);
    }); //It fail block
  }); //getOne scribe block

  describe("createOne crud success/fail test.....", () => {
    it("createOne success...", (done) => {
      let req = {
        body: {
          name: "PistolPetes",
          location: "Here, WeAre",
        },
      };
      let res = {
        ...Resp,
        expStatus: 201,
        done,
        json(result) {
          try {
            assert.strictEqual(result.location, "Here, WeAre");
          } catch (e) {
            this.errorCatch.push(e);
          }
          this.finish();
        },
      };
      DinerCon.createOne(req, res);
    }); //success it block

    it("createOne fail.......", (done) => {
      //this is to check for validation
      let req = {
        body: {
          name: "PistolPetes",
          unknown: "values",
        },
      };
      let res = {
        ...Resp,
        expStatus: 500,
        done,
        json(result) {
          try {
            assert.match(result.ErrorMessage, /diner validation/);
          } catch (e) {
            this.errorCatch.push(e);
          }
          this.finish();
        },
      };
      DinerCon.createOne(req, res);
    }); //fail it block
  }); //scribe createOne block
  describe("deleteOne test.......", () => {
    it("deleteOne...", (done) => {
      let req = {
        params: {
          dinerID: "661e7333714d6eaaebfb2c18",
        },
      };
      let res = {
        ...Resp,
        expStatus: 200,
        done,
        Asserts: [
          {
            funct: assert.strictEqual,
            condition: [
              {
                result: "location",
                answer: "NotherOne, Home",
              },
            ],
          },
        ],
      };
      DinerCon.deleteOne(req, res);
    }); //it block

    it("deleteOne fails...", (done) => {
      let req = {
        params: {
          dinerID: same_id,
        },
      };
      let res = {
        ...Resp,
        expStatus: 400,
        done,
        Asserts: [
          {
            funct: assert.match,
            condition: [
              {
                result: "match",
                answer: /not deleted/,
              },
            ],
          },
        ],
      };
      DinerCon.deleteOne(req, res);
    }); //it fails block
  }); //end of delete scribe

  describe("getMany success/fail....", () => {
    it("getMany success...", (done) => {
      let req = {};
      let res = {
        ...Resp,
        expStatus: 200,
        done,
        json(result) {
          try {
            assert.strictEqual(result.diners.length, 5);
            result.diners.forEach((doc) => {
              assert.strictEqual(doc.sodas.length, 0);
            });
          } catch (e) {
            this.errorCatch.push(e);
          }
          this.finish();
        },
      };
      DinerCon.getMany(req, res);
    }); //getMany success It block

    it("getMany fail...", (done) => {
      mongoose.connection.collections.diners.drop().then(() => {
        console.log("Dropping for get many fail");
      });

      let req = {};
      let res = {
        ...Resp,
        expStatus: 404,
        done,
        Asserts: [
          {
            funct: assert.match,
            condition: [
              {
                result: "match",
                answer: /Nothing found/,
              },
            ],
          },
        ],
      };
      DinerCon.getMany(req, res);
    }); //getMany fail It block
  }); //getMany scribe block
}); //overAll scribe block
