const Discord = require('discord.js');
const Client = require('./Client');
const {SlashCommandBuilder} = require("@discordjs/builders");

/**
 *
 * @param {Discord.Message | Discord.Interaction} interaction
 * @param {string[]} args
 * @param {Client} client
 */
function RunFunction(interaction, args, client) {
}

class SlashCommand {

    /**
     *
     * @param {{name: string, description: string, descriptionLocalizations: {}, directMessages: boolean, run: RunFunction, args: Array<Argument>, subs: Array<SubCommand>}} options
     */

    constructor(options) {
        this.data = new SlashCommandBuilder()
            .setName(options.name)
            .setDMPermission(options.directMessages)
            .setDescription(options.description)
            .setDescriptionLocalizations(options.descriptionLocalizations);

        if (options.subs.length === 0) {
            options.args.forEach(arg => arg.createOption(this.data));
        }

        options.subs.forEach(subCommand => subCommand.createSubCommand(this.data, options.args));

        this.run = options.run;
    }
}

module.exports = SlashCommand;
