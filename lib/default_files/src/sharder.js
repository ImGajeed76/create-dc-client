const Cluster = require("discord-hybrid-sharding");
const {ChalkAdvanced} = require("chalk-advanced");
require('dotenv').config();

if (process.env.TOKEN === undefined) {
    throw new Error("TOKEN is not defined in .env file");
}

const manager = new Cluster.Manager(`src/index.js`, {
    totalShards: "auto",
    shardsPerClusters: 2,
    mode: "process",
    token: process.env.token,
});

manager.on("clusterCreate", (cluster) => {
    console.log(
        ChalkAdvanced.white("Cluster"),
        ChalkAdvanced.green(cluster.id + 1),
        ChalkAdvanced.white("has been created")
    )
});

manager.spawn({timeout: -1}).then();
