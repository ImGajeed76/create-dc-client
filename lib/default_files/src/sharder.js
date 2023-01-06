const { ClusterManager } = require('discord-hybrid-sharding');
const {ChalkAdvanced} = require("chalk-advanced");
require('dotenv').config();

if (!process.env.TOKEN) throw new Error("TOKEN is not defined in .env file");

const manager = new ClusterManager(`src/index.js`, {
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

if(process.env.STATUS == "DEVELOPMENT") {
    manager.on("debug", console.log);
}

manager.spawn({timeout: -1}).then()
