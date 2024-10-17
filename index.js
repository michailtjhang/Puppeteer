const ds = require('./ds');

const URL = 'https://discord.com/channels/';
const SERVER_ID = process.env.SERVER_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;

(async () => {
    await ds.initialize();
    await ds.login();
    // await ds.moveTo(URL, SERVER_ID, CHANNEL_ID);
})();