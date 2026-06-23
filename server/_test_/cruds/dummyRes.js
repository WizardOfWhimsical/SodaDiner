import assert from "assert";

const Resp = {
  // count: 0,
  errorCatch: [],
  expStatus: null,
  Asserts: [],
  /*
    we build our Asserts as a nameless obj inside the array with a funct property so we can loop through
    (the funct: /assert/)for multiple assertion  and contion checks. The conditions is an array of Obj's 
    (with key/value pairs), this way we can run more than one check with the particular kind of assertion.
      {
          funct: /yourAssertionHere/
          condition:[{
              result: /what we are testing/, <--wheather it is the Id, soda name or diner location
              answer: /what should return/
          }]
      }
      */
  status(s) {
    try {
      assert.strictEqual(s, this.expStatus);
      return this;
    } catch (e) {
      this.errorCatch.push(e);
      // this.count++
      return this;
    }
  },
  json(result) {
    // console.log(this.count)
    // this.count++
    try {
      for (let ass of this.Asserts) {
        for (let con of ass.condition) {
          let results;
          let answers = `${con.answer}`;

          switch (con.result) {
            case "id":
              results = `${result.soda._id}`;
              break;
            case "name":
              results = `${result.soda.name}`;
              break;
            case "location":
              results = `${result.diner.location}`;
              break;
            default:
              results = result;
              answers = con.answer;
              break;
          }
          ass.funct(results, answers);
        }
      }
    } catch (e) {
      this.errorCatch.push(e);
    }
    this.finish();
  },
  finish() {
    // console.log(this.count)
    if (this.errorCatch.length > 0) {
      for (let e of this.errorCatch) {
        console.log(e.AssertionError);
      }
      this.done(this.errorCatch[0]);
    } else this.done();
  },
};
export default Resp;
