const WY_Client = require('./structures/Client');
require('dotenv').config();

if (!process.env.TOKEN) throw new Error("TOKEN is not defined in .env file");

const client = new WY_Client({
        token: process.env.TOKEN,
        guild_id: process.env.GUILD_ID,
        status: process.env.STATUS,
        bot_status: process.env.BOT_STATUS,
    },
    false,
    null,
    null,
);

client.start().then();
