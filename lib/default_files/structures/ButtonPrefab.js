const Discord = require('discord.js');
const Client = require('./Client');
const Button = require('./Button');
const {ButtonBuilder} = require('discord.js');

/**
 *
 * @param {Discord.Message | Discord.Interaction} interaction
 * @param {string[]} args
 * @param {Client} client
 */
function RunFunction(interaction, args, client) {
}

class ButtonPrefab {
    constructor(name) {
        this.name = name;
        this.btn = new ButtonBuilder();
    }

    setStyle(style) {
        this.btn.setStyle(style);
        return this;
    }

    setLabel(label) {
        this.btn.setLabel(label);
        return this;
    }

    setEmoji(emoji) {
        this.btn.setEmoji(emoji);
        return this;
    }

    setDisabled(disabled) {
        this.btn.setDisabled(disabled);
        return this;
    }

    setURL(url) {
        this.btn.setURL(url);
        return this;
    }

    /**
     *
     * @param {Client} client
     * @param {string} customId
     * @param {RunFunction} runFunction
     * @returns {Button}
     */
    createButton(client, customId, runFunction) {
        const btn_copy = ButtonBuilder
            .from(this.btn.toJSON())
            .setCustomId(customId);

        const button = new Button(runFunction, btn_copy);
        client.buttons.set(customId, button);

        return button;
    }
}

module.exports = ButtonPrefab;
