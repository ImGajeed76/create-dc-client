const WY_Client = require('./structures/Client');
const Cluster = require("discord-hybrid-sharding");
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
        Cluster.data.shards,
        Cluster.data.shardCount
    );

    client.cluster = new Cluster.Client(client);
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
