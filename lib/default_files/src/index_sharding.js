const WY_Client = require('./structures/Client');
const Cluster = require("discord-hybrid-sharding");
require('dotenv').config();

const ENABLE_SHARDING = process.env.enableSharding === "true";

if (ENABLE_SHARDING) {
    const client = new WY_Client({
            token: process.env.TOKEN,
            guild_id: process.env.GUILD_ID,
            status: process.env.STATUS,
            bot_status: process.env.BOT_STATUS,
        },
        ENABLE_SHARDING,
        Cluster.data.shards,
        Cluster.data.shardCount
    );

    client.cluster = new Cluster.Client(client);
    client.start().then();
}
else {
    const client = new WY_Client({
            token: process.env.TOKEN,
            guild_id: process.env.GUILD_ID,
            status: process.env.STATUS,
            bot_status: process.env.BOT_STATUS,
        },
        ENABLE_SHARDING,
        null,
        null
    );

    client.start().then();
}
