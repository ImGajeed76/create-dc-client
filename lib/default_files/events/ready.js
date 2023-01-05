const Event = require('../structures/Event');

module.exports = new Event("ready", client => {
    client.user.setPresence({
        activities: [{name: 'Booting up...'}],
        status: 'idle',
    });

    setInterval(() => {
        client.user.setPresence({
            activities: [{name: client.config.bot_status}],
            status: 'online',
        });
    }, 15000);
});
