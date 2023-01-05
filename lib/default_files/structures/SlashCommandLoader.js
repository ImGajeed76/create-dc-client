const {readdirSync, statSync} = require('fs');
const {REST} = require("@discordjs/rest");
const {ChalkAdvanced} = require('chalk-advanced');
const {Routes} = require('discord-api-types/v10');
const SlashCommand = require("./SlashCommand");
const Client = require("./Client");

class SlashCommandLoader {
    /**
     *
     * @param {Client} client
     * @param {string} path
     * @param {string} pathFromSource
     */
    static async loadSlashCommands(client, path = './src/commands', pathFromSource = '../commands') {
        const commandArray = [];

        console.log(
            ChalkAdvanced.white("Loading Slash-Commands:")
        )

        await readdirSync(path).filter(file => statSync(`${path}/${file}`).isDirectory()).forEach(dir => {
            readdirSync(`${path}/${dir}`).filter(file => file.endsWith('_.js')).forEach(file => {
                const slashCommand = require(`${pathFromSource}/${dir}/${file}`);

                if (slashCommand.data !== undefined && slashCommand.data !== null) {
                    client.slashCommands.set(slashCommand.data.name, slashCommand);
                    commandArray.push(slashCommand.data.toJSON());
                    console.log(
                        " -",
                        ChalkAdvanced.green(slashCommand.data.name),
                        slashCommand.args ? `<${slashCommand.args}> ` : ""
                    );
                } else {
                    console.log(
                        " -",
                        ChalkAdvanced.red(file.replace('_.js', '')),
                        ChalkAdvanced.gray("Invalid Export")
                    );
                }
            });
        });

        const rest = new REST({version: '10'}).setToken(client.token);
        await (async () => {
            try {
                if (client.config.status === 'PRODUCTION') {
                    // If the bot is in production mode it will load slash commands for all guilds
                    await rest.put(Routes.applicationCommands(client.user.id), {
                        body: commandArray,
                    });

                    console.log(
                        ChalkAdvanced.white('Would You?'),
                        ChalkAdvanced.gray('>'),
                        ChalkAdvanced.green('Successfully registered commands globally'),
                    );
                } else {
                    if (!client.config.guild_id) {
                        return console.log(
                            ChalkAdvanced.red("Looks like your bot is not in production mode and you don't have a guild id set in .env")
                        );
                    }

                    await rest.put(
                        Routes.applicationGuildCommands(client.user.id, client.config.guild_id),
                        {
                            body: commandArray,
                        },
                    );

                    console.log(
                        ChalkAdvanced.white('Would You?'),
                        ChalkAdvanced.gray('>'),
                        ChalkAdvanced.green('Successfully registered commands locally')
                    );
                }
            } catch (err) {
                if (err) console.error(err);
            }
        })();
    }
}

module.exports = SlashCommandLoader;
module.exports.loadSlashCommands = SlashCommandLoader.loadSlashCommands;
