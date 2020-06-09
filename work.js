const babbleBackend = require('babble-backend')

process.on('message', async (message) => {
    process.send(babbleBackend.hello());
});
