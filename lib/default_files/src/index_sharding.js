const WY_Client = require('./structures/Client');
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
require('dotenv').config();

if (!process.env.TOKEN) throw new Error("TOKEN is not defined in .env file");

try {
    const client = new WY_Client({
            token: process.env.TOKEN,
            guild_id: process.env.GUILD_ID,
            status: process.env.STATUS,
            bot_status: process.env.BOT_STATUS,
        },
        true,
        getInfo().SHARD_LIST,
        getInfo().TOTAL_SHARDS,
    );

    client.cluster = new ClusterClient(client);
    client.start().then();
}
catch (e) {
    const client = new WY_Client({
            token: process.env.TOKEN,
            guild_id: process.env.GUILD_ID,
            status: process.env.STATUS,
            bot_status: process.env.BOT_STATUS,
        },
        false,
        null,
        null
    );

    client.start().then();
}
