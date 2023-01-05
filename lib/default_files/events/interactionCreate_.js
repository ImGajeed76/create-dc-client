const Event = require('../structures/Event');
const {ChalkAdvanced} = require('chalk-advanced');

let runCommand = (interaction, client) => {
    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;

    try {
        command.run(interaction, interaction.options, client);
    } catch (err) {
        if (err) {
            console.error(
                ChalkAdvanced.red("Error in event (interactionCreate):\n"),
                ChalkAdvanced.red(err)
            )
        }

        interaction.reply({
            content: "An error occurred while trying to execute that command.",
            ephemeral: true,
        });
    }
}

let runButton = (interaction, client) => {
    const button = client.buttons.get(interaction.customId);

    if (!button) return interaction.reply({
        content: "Please use the command again.",
        ephemeral: true
    });

    try {
        button.run(interaction, interaction.options, client);
    } catch (err) {
        if (err) {
            console.error(
                ChalkAdvanced.red("Error in event (interactionCreate):\n"),
                ChalkAdvanced.red(err)
            )
        }

        interaction.reply({
            content: "An error occurred while trying to execute that button.",
            ephemeral: true,
        });
    }
}

module.exports = new Event("interactionCreate", (client, interaction) => {
    if (interaction.isChatInputCommand()) {
        runCommand(interaction, client);
    }

    if (interaction.isButton()) {
        runButton(interaction, client);
    }
});
