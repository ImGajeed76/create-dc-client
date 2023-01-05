const {SlashCommandBuilder, SlashCommandSubcommandBuilder} = require("@discordjs/builders");

class Argument {

    /**
     * @param {function} type
     * @param {function(*): *} options
     */

    constructor(type, options) {
        this.type = type;
        this.options = options;
    }

    /**
     *
     * @param {SlashCommandBuilder | SlashCommandSubcommandBuilder} slashCommand
     */
    createOption(slashCommand) {
        this.type(slashCommand, this.options)
    }
}

module.exports = Argument;
