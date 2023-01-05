const {readdirSync} = require('fs');
const {ChalkAdvanced} = require("chalk-advanced");
const Client = require("./Client");

class EventLoader {
    /**
     *
     * @param {Client} client
     * @param {string} path
     * @param {string} pathFromSource
     */
    static async loadEvents(client, path = './src/events', pathFromSource = '../events') {
        console.log(
            ChalkAdvanced.white("Loading Events:")
        )

        await readdirSync(path).filter(file => file.endsWith('_.js')).forEach(file => {
            const event = require(`${pathFromSource}/${file}`);

            if (event.event !== undefined && event.event !== null) {
                client.on(event.event, event.run.bind(null, client));
                console.log(
                    " -",
                    ChalkAdvanced.green(event.event)
                );
            } else {
                console.log(
                    " -",
                    ChalkAdvanced.red(file.replace('_.js', '')),
                    ChalkAdvanced.gray("Invalid Export")
                );
            }
        });

        const ready = require(`${pathFromSource}/ready.js`);
        if (ready.event !== undefined && ready.event !== null) {
            client.once(ready.event, ready.run.bind(null, client));
            console.log(
                " -",
                ChalkAdvanced.green(ready.event)
            );
        } else {
            console.log(
                " -",
                ChalkAdvanced.red("ready.js"),
                ChalkAdvanced.gray("Doesn't has a valid class")
            );
        }
    }
}

module.exports = EventLoader;
module.exports.loadEvents = EventLoader.loadEvents;
