const babbleBackend = require("babble-backend");

process.on("message", async (message) => {
  console.log(message);
  if (message === "hello") {
    process.send(babbleBackend.hello());
  } else if (message === "initializeDb") {
    process.send(babbleBackend.initializeDb());
  }
});
