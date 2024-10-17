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

  login: async () => {
    let loginButton = await discord.page.$x('//a[contains(text(), "Login")]');

    await loginButton[0].click();
    await discord.page.waitForNavigation();
    await discord.page.waitForTimeout(1000);

    await discord.page.type('input[name="email"]', process.env.DISCORD_EMAIL, {
      delay: 200,
    });
    await discord.page.type(
      'input[name="password"]',
      process.env.DISCORD_PASSWORD,
      { delay: 100 }
    );

    loginButton = await discord.page.$x('//button[contains(text(), "Log In")]');
    await loginButton[0].click();
    await discord.page.waitForNavigation();
  },

  moveTo: async (serverID, channelID, url) => {
    await discord.page.goto(url + serverID + "/" + channelID);
    await discord.page.waitForTimeout(5000);
  },

  textMSG: async (msg) => {
    await discord.page.$type('div[data-slate-node="element"]', msg, {
      delay: 50,
    });
    await discord.page.waitForTimeout(3000);
    await discord.page.keyboard.press("Enter");
    await discord.page.waitForTimeout(3000);
    await discord.page.keyboard.press("Enter");
  },
};

module.exports = discord;
