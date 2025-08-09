import Sodas from "#Controllers/Soda";
import Diner from "#Controllers/Diner";
import { isFunction } from "util";
import assert from "assert";

describe("Item controller check", () => {
  it("Sodas has Funct methods, i guess?!", () => {
    const crudMethods = [
      "getOne",
      "createOne",
      "deleteOne",
      "updateOne",
      "getMany",
      "updateServingOne",
    ];

    crudMethods.forEach((name) => {
      assert(isFunction(Sodas[name]));
    });
  });

  it("Diner has Funct methods, i guess?!", () => {
    const crudMethods = [
      "getOne",
      "createOne",
      "deleteOne",
      "updateOne",
      "getMany",
      "updateSodaOne",
    ];

    crudMethods.forEach((name) => {
      assert(isFunction(Diner[name]));
    });
  });
});
