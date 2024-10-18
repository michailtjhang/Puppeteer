const puppetter = require("puppeteer");

const BASE_URL = "https://discord.com";

const discord = {
  browser: null,
  page: null,

  initialize: async () => {
    discord.browser = await puppetter.launch({ headless: false });
    discord.page = await discord.browser.newPage();

    await discord.page.goto(BASE_URL);
  },

  login: async (email, password) => {
    // Navigate to the login page
    await discord.page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle2" });

    // Wait for email input field
    await discord.page.waitForSelector('input[name="email"]');

    // Type in email
    await discord.page.type('input[name="email"]', email, { delay: 100 });

    // Wait for password input field
    await discord.page.waitForSelector('input[name="password"]');

    // Type in password
    await discord.page.type('input[name="password"]', password, { delay: 100 });

    // Wait for login button to be enabled and click it
    await discord.page.click('button[type="submit"]');

    // Optionally, wait for navigation after login (e.g., redirect to dashboard)
    await discord.page.waitForNavigation({ waitUntil: "networkidle2" });
  },

  moveTo: async (url, serverID, channelID) => {
    await discord.page.goto(url + serverID + "/" + channelID);
    await discord.page.waitForNavigation({ waitUntil: "networkidle2" });
  },

  textMSG: async (msg) => {
    console.log(msg);
    // Type the message into the input box
    await discord.page.type('div[data-slate-node="element"]', msg, { delay: 50 });

    // Press 'Enter' to send the message
    await discord.page.keyboard.press("Enter");
  },
};

module.exports = discord;
