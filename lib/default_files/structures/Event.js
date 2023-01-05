const {ClientEvents} = require('discord.js');

/**
 * @template {keyof ClientEvents} K
 * @param {Client} client
 * @param {...ClientEvents[K]} eventArgs
 */

function runFunction(client, ...eventArgs) {
}

/**
 * @template {keyof ClientEvents} K
 */
class Event {
    /**
     *
     * @param {string} event
     * @param {RunFunction<K>} runFunction
     */
    constructor(event, runFunction) {
        this.event = event;
        this.run = runFunction;
    }
}

module.exports = Event;
