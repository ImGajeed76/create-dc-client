const SubCommand = require("../../../structures/SubCommands");
const Argument = require("../../../structures/SlashCommandArgument");
const Options = require("../../../structures/SlashCommandOptions");

module.exports = new SubCommand({
    name: "file",
    description: "echo a file",
    descriptionLocalizations: {},
    args: [
        new Argument(Options.ATTACHMENT, options => options
            .setName("file")
            .setDescription("file to reply with")
            .setRequired(true)
        ),
    ],

    async run(interaction, slashCommandArgs, args) {
        interaction.reply({files: [slashCommandArgs.getAttachment("file")], ephemeral: true});
    }
})
