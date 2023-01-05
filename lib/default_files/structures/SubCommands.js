const fs = require("fs");
const {SlashCommandSubcommandBuilder} = require("@discordjs/builders");


class SubCommand {
    constructor(options) {
        this.args = options.args;
        this.run = options.run;
        this.data = new SlashCommandSubcommandBuilder()
            .setName(options.name)
            .setDescription(options.description)
            .setDescriptionLocalizations(options.descriptionLocalizations);
    }

    static getSubCommands(folder) {
        let subCommands = [];
        fs.readdirSync(`./src/commands/${folder}/subs`).forEach(file => {
            if (file.endsWith("_.js")) {
                let command = require(`../commands/${folder}/subs/${file}`);
                if (command instanceof SubCommand) {
                    subCommands.push(command);
                }
            }
        });
        return subCommands;
    }

    static findAndRunSubCommand(interaction, SlashCommandArgs, subCommands = null, ...args) {
        if (subCommands === null) {
            subCommands = this.getSubCommands(interaction.commandName);
        }

        subCommands.forEach(subCommand => {
            if (subCommand.data.name === SlashCommandArgs.getSubcommand()) {
                subCommand.run(interaction, SlashCommandArgs, args);
            }
        });
    }

    createSubCommand(data, globalArgs = []) {
        if (globalArgs.length > 0) {
            globalArgs.forEach(arg => arg.createOption(this.data));
        }
        this.args.forEach(arg => arg.createOption(this.data));

        return data.addSubcommand(this.data);
    }
}

module.exports = SubCommand;
