const SlashCommand = require('../../structures/SlashCommand.js');
const CarouselBuilder = require('../../structures/CarouselBuilder.js');
const CarouselPage = require("../../structures/CarouselPage");

module.exports = new SlashCommand({
    name: 'carousel',
    description: 'Carousel',
    descriptionLocalizations: {},
    directMessages: true,
    args: [],
    subs: [],

    async run(interaction, args, client) {
        const pages = [
            new CarouselPage()
                .setTitle('Page 1'),
            new CarouselPage()
                .setTitle('Page 2'),
            new CarouselPage()
                .setTitle('Page 3'),
        ]

        const prevBtnPrefab = client.buttonPrefabs.get('default_prev');
        const nextBtnPrefab = client.buttonPrefabs.get('default_next');

        const carousel = new CarouselBuilder(client, pages, prevBtnPrefab, nextBtnPrefab, interaction.id, true);
        await interaction.reply(carousel.renderPage());
    }
})
