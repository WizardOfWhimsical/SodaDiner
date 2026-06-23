import mongoose from "mongoose";
import assert from "assert";
import sodaModel from "#Models/Soda";
import dinerModel from "#Models/Diner";

describe("testing the models", () => {
  describe("Soda Model test", () => {
    let { name, brand, fizziness, rating, served } = sodaModel.schema.obj;
    it("name", () => {
      assert.deepEqual(name, {
        type: String,
        trim: true,
        required: true,
      });
    }); //end of IT

    it("brand", () => {
      assert.deepEqual(brand, {
        type: String,
        trim: true,
        required: true,
        default: "SodaPop",
      });
    }); //end of IT

    it("fizziness", () => {
      assert.deepEqual(fizziness, {
        type: Number,
        min: 1,
        max: 10,
        default: 1,
        required: true,
      });
    }); //end of IT

    it("rating", () => {
      assert.deepEqual(rating, {
        type: Number,
        min: 1,
        max: 10,
        default: 1,
        required: true,
      });
    }); //end of IT

    it("served", () => {
      assert.deepEqual(served, {
        type: Boolean,
        default: false,
      });
    }); //end of IT
  }); //end of soda scribe

  describe("Diner Model tests", () => {
    let { name, location, sodas } = dinerModel.schema.obj;
    it("name", () => {
      assert.deepEqual(name, {
        type: String,
        trim: true,
        required: true,
      });
    }); //end of IT
    it("location", () => {
      assert.deepEqual(location, {
        type: String,
        trim: true,
        required: true,
      });
    }); //end of IT
    it("sodas", () => {
      assert.deepEqual(sodas, [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Soda",
        },
      ]);
    }); //end of IT
  }); //end of diner scribe
}); //end of overAll scribe
