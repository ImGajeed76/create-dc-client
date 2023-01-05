const SlashCommand = require("../../structures/SlashCommand");
const SubCommands = require("../../structures/SubCommands");

module.exports = new SlashCommand({
    name: "echo",
    description: "Repeats what you say",
    descriptionLocalizations: {},
    directMessage: false,
    args: [],
    subs: SubCommands.getSubCommands("echo"),

    async run(interaction, args) {
        SubCommands.findAndRunSubCommand(interaction, args);
    }
});
[]
