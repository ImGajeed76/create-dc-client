const {GatewayIntentBits, Client, Collection} = require("discord.js");
const {loadEvents} = require("./EventLoader");
const {loadSlashCommands} = require("./SlashCommandLoader");
const {loadButtons} = require("./ButtonLoader");
const {ChalkAdvanced} = require("chalk-advanced");

const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
]

class DC_Client extends Client {
    /**
     * @typedef {{token: string, guild_id: string, status: string, bot_status}} Options
     * @param {Options} config
     * @param {boolean} enableSharding
     * @param {any} shards
     * @param {any} shardCount
     */
    constructor(config, enableSharding, shards, shardCount) {
        if (enableSharding) super({intents: intents, shards: shards, shardCount: shardCount});
        else super({intents: intents});

        this.slashCommands = new Collection();
        this.buttonPrefabs = new Collection();
        this.buttons = new Collection();
        this.config = config
    }

    async start() {
        await this.login(this.config.token);

        await loadEvents(this);
        await loadButtons(this);
        await loadSlashCommands(this);

        console.log(
            ChalkAdvanced.white("---------------- Bot is ready! ---------------- ")
        )
    }
}

module.exports = DC_Client;
