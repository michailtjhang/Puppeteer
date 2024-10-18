const ds = require('./ds');
require('dotenv').config();

const EMAIL = process.env.DISCORD_EMAIL;
const PASSWORD = process.env.DISCORD_PASSWORD;
const URL = 'https://discord.com/channels/';
const SERVER_ID = process.env.SERVER_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;
const MESSAGE = process.env.MESSAGE;


(async () => {
    await ds.initialize();
    await ds.login(EMAIL, PASSWORD);
    await ds.moveTo(URL, SERVER_ID, CHANNEL_ID);
    await ds.textMSG(MESSAGE);
})();