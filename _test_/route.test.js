import sodaRoute from "#Routes/Soda";
import dinerRoute from "#Routes/Diner";
import assert from "assert";

describe("Routes....", () => {
  describe("Soda route....", () => {
    let routes = [
      { path: "/", method: "get" },
      { path: "/", method: "post" },
      { path: "/updateSoda/:sodaID", method: "put" },
      { path: "/serving", method: "get" },
      { path: "/:sodaID", method: "get" },
      { path: "/:sodaID", method: "put" },
      { path: "/:sodaID", method: "delete" },
    ];

    it("running paths and methods check....", (done) => {
      routes.forEach((route) => {
        const match = sodaRoute.stack.find(
          (s) => s.route.path === route.path && s.route.methods[route.method],
        );
        assert(match);
      });
      done();
    }); //end it block
  }); //end soda route block

  describe("Diner route....", () => {
    let routes = [
      { path: "/", method: "get" },
      { path: "/", method: "post" },
      { path: "/:dinerID", method: "get" },
      { path: "/:dinerID", method: "put" },
      { path: "/:dinerID", method: "delete" },
      { path: "/:dinerID/sodas", method: "put" },
    ];

    it("running paths and methods check.....", (done) => {
      routes.forEach((route) => {
        const matchAgain = dinerRoute.stack.find(
          (s) => s.route.path === route.path && s.route.methods[route.method],
        );
        assert(matchAgain);
      });
      done();
    });
  }); //end of scribe block
}); //end route scribe block
