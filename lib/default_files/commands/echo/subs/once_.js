const SubCommand = require("../../../structures/SubCommands");
const Argument = require("../../../structures/SlashCommandArgument");
const Options = require("../../../structures/SlashCommandOptions");

module.exports = new SubCommand({
    name: "once",
    description: "Repeats what you say",
    descriptionLocalizations: {},
    args: [
        new Argument(Options.STRING, options => options
            .setName("text")
            .setDescription("The text you want to repeat")
            .setRequired(true)
        ),
    ],

    async run(interaction, slashCommandArgs, args) {
        interaction.reply({content: slashCommandArgs.get("text").value, ephemeral: true});
    }
});
