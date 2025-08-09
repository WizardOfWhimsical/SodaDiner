import mongoose from "mongoose";
import assert from "assert";
import Resp from "#Resp";
import SodaCon from "#Controllers/Soda";

describe("Soda crud operations with...", () => {
  const User = mongoose.Types.ObjectId;
  const same_id = new User(); //used for fails

  describe("Soda crud operations for...", () => {
    it("getOne from DB", (done) => {
      //from seeded DB
      let sprite = {
        name: "Sprite",
        id: "661e95aaff7174cd630106cd",
      };

      let req = {
        params: {
          sodaID: sprite.id,
        },
      };
      const res = {
        ...Resp,
        expStatus: 200,
        done,
        Asserts: [
          {
            funct: assert.strictEqual,
            condition: [
              {
                result: "id",
                answer: sprite.id,
              },
              {
                result: "name",
                answer: sprite.name,
              },
            ],
          },
        ],
      };
      SodaCon.getOne(req, res);
    }); //getOne "it" block

    it("Checking not found", (done) => {
      let req = {
        params: {
          sodaID: same_id,
        },
      };
      const res = {
        ...Resp,
        expStatus: 400,
        done,
        Asserts: [
          {
            funct: assert.match,
            condition: [
              {
                result: "match",
                answer: /failed to find/,
              },
            ],
          },
        ],
      };
      SodaCon.getOne(req, res);
    });
  }); //soda crud getOne opt's

  describe("updatingOne", (done) => {
    it("udateOne tesing to see for update", (done) => {
      //from seeded db
      let cherrySprite = {
        name: "Cherry Sprite",
        id: "661e95aaff7174cd630106dc",
      };
      let update = { name: "Cherry" };
      let req = {
        params: { sodaID: cherrySprite.id },
        body: update,
      };
      let res = {
        ...Resp,
        expStatus: 201,
        done,
        Asserts: [
          {
            funct: assert.strictEqual,
            condition: [
              {
                result: "name",
                answer: update.name,
              },
            ],
          },
        ],
      };

      SodaCon.updateOne(req, res);
    }); //end of It block

    it("looking for failed return 'update failed' and 400", (done) => {
      let update = { name: "CherrySprite" };
      let req = {
        params: { sodaID: same_id }, //different id so it fails to update right pop
        body: update,
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
                answer: /update failed/,
              },
            ],
          },
        ],
      };
      SodaCon.updateOne(req, res);
    });
  }); //end of scribe block for updating

  describe("deleting sodas", () => {
    it("delete testing...", (done) => {
      let faygo = {
        name: "Faygo",
        id: "661e95abff7174cd630106e2",
      };

      let req = {
        params: { sodaID: faygo.id },
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
                result: "name",
                answer: faygo.name,
              },
            ],
          },
        ],
      };
      SodaCon.deleteOne(req, res);
    }); //it block

    it("deleting test 2...", (done) => {
      let req = {
        params: { sodaID: same_id },
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
                answer: /It was not successful/,
              },
            ],
          },
        ],
      };
      SodaCon.deleteOne(req, res);
    }); //it block
  }); //scribe block for deleting

  describe("getMany success/failure test...", () => {
    it("testing to get multiple count back", (done) => {
      let req = {};
      let res = {
        ...Resp,
        done,
        expStatus: 200,
        json(result) {
          try {
            assert.strictEqual(result.sodas.length, 6);
            result.sodas.forEach((doc) => {
              assert.strictEqual(doc.brand, "SodaPop");
            });
          } catch (e) {
            this.errorCatch.push(e);
          }
          this.finish();
        },
      };
      SodaCon.getMany(req, res);
    }); //it success block

    it("getMany failed to find return", (done) => {
      //so mongo returns nothing back
      mongoose.connection.collections.sodas.drop().then(() => {
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
                answer: /Something went wrong/,
              },
            ],
          },
        ],
      };
      SodaCon.getMany(req, res);
    }); //end of It block
  }); //getMany describe block
}); //crud opt's
