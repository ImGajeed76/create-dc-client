const {
    SlashCommandBuilder,
    SlashCommandSubcommandGroupBuilder,
    SlashCommandSubcommandsOnlyBuilder,
    SlashCommandSubcommandBuilder
} = require("@discordjs/builders");

class Options {

    /**
     *
     * @param {SlashCommandBuilder} data
     * @param {Omit} option
     * @returns {Omit<*, "addSubcommand" | "addSubcommandGroup">}
     * @constructor
     */
    static STRING = (data, option) => {
        return data.addStringOption(option)
    };

    /**
     *
     * @param {SlashCommandBuilder} data
     * @param {Omit} option
     * @returns {Omit<*, "addSubcommand" | "addSubcommandGroup">}
     * @constructor
     */
    static ATTACHMENT = (data, option) => {
        return data.addAttachmentOption(option)
    };

    /**
     *
     * @param {SlashCommandBuilder} data
     * @param {Omit} option
     * @returns {Omit<*, "addSubcommand" | "addSubcommandGroup">}
     * @constructor
     */
    static BOOLEAN = (data, option) => {
        return data.addBooleanOption(option)
    };

    /**
     *
     * @param {SlashCommandBuilder} data
     * @param {Omit} option
     * @returns {Omit<*, "addSubcommand" | "addSubcommandGroup">}
     * @constructor
     */
    static CHANNEL = (data, option) => {
        return data.addChannelOption(option)
    };

    /**
     *
     * @param {SlashCommandBuilder} data
     * @param {Omit} option
     * @returns {Omit<*, "addSubcommand" | "addSubcommandGroup">}
     * @constructor
     */
    static INTEGER = (data, option) => {
        return data.addIntegerOption(option)
    };

    /**
     *
     * @param {SlashCommandBuilder} data
     * @param {Omit} option
     * @returns {Omit<*, "addSubcommand" | "addSubcommandGroup">}
     * @constructor
     */
    static MENTIONABLE = (data, option) => {
        return data.addMentionableOption(option)
    };

    /**
     *
     * @param {SlashCommandBuilder} data
     * @param {Omit} option
     * @returns {Omit<*, "addSubcommand" | "addSubcommandGroup">}
     * @constructor
     */
    static NUMBER = (data, option) => {
        return data.addNumberOption(option)
    };

    /**
     *
     * @param {SlashCommandBuilder} data
     * @param {Omit} option
     * @returns {Omit<*, "addSubcommand" | "addSubcommandGroup">}
     * @constructor
     */
    static ROLE = (data, option) => {
        return data.addRoleOption(option)
    };

    /**
     *
     * @param {SlashCommandBuilder} data
     * @param {SlashCommandSubcommandBuilder} option
     * @returns {SlashCommandSubcommandsOnlyBuilder}
     * @constructor
     */
    static SUBCOMMAND = (data, option) => {
        return data.addSubcommand(option)
    };

    /**
     *
     * @param {SlashCommandBuilder} data
     * @param {SlashCommandSubcommandGroupBuilder} option
     * @returns {SlashCommandSubcommandsOnlyBuilder}
     * @constructor
     */
    static SUBCOMMAND_GROUP = (data, option) => {
        return data.addSubcommandGroup(option)
    };

    /**
     *
     * @param {SlashCommandBuilder} data
     * @param {Omit} option
     * @returns {Omit<*, "addSubcommand" | "addSubcommandGroup">}
     * @constructor
     */
    static USER = (data, option) => {
        return data.addUserOption(option)
    };
}

module.exports = Options;
