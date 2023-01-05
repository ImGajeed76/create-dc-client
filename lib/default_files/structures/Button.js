const Discord = require('discord.js');
const Client = require('./Client');
const {ButtonBuilder} = require('discord.js');

/**
 *
 * @param {Discord.Message | Discord.Interaction} interaction
 * @param {string[]} args
 * @param {Client} client
 */
function RunFunction(interaction, args, client) {
}

class Button {
    /**
     *
     * @param {RunFunction} runFunction
     * @param {ButtonBuilder} btn
     */
    constructor(runFunction, btn) {
        this.btn = btn;
        this.run = runFunction;
    }
}

module.exports = Button;
