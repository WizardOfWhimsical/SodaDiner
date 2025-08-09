import { connect, disconnect } from "#Connect";

before((done) => {
  console.log("connected to Mongo");
  connect().then(() => {
    done();
  });
});

after((done) => {
  console.log("ShutDown");
  disconnect().then(() => {
    done();
  });
});
