const {ButtonBuilder, ActionRowBuilder} = require('discord.js');

class CarouselBuilder {
    /**
     *
     * @param {WY_Client} client
     * @param {CarouselPage[]} pages
     * @param {ButtonPrefab} prevBtnPrefab
     * @param {ButtonPrefab} nextBtnPrefab
     * @param {string} customId
     * @param {boolean} ephemeral
     * @param {number} startPage
     */
    constructor(client, pages, prevBtnPrefab, nextBtnPrefab, customId, ephemeral = false, startPage = 0) {
        this.pages = pages;
        this.currentPage = startPage;
        this.customId = customId;
        this.ephemeral = ephemeral;

        this.previousBtn = prevBtnPrefab.createButton(client, `prev_${customId}`, async (interaction) => {
            this.previous();
            await interaction.update(this.renderPage());
        });
        this.nextBtn = nextBtnPrefab.createButton(client, `next_${customId}`, async (interaction) => {
            this.next();
            await interaction.update(this.renderPage());
        });
    }

    renderPage() {
        const centerBtn = new ButtonBuilder()
            .setCustomId(`center_${this.customId}`)
            .setLabel(`${this.currentPage + 1}/${this.pages.length}`)
            .setDisabled(true)
            .setStyle(2);

        const buttons = new ActionRowBuilder()
            .addComponents(
                this.previousBtn.btn,
                centerBtn,
                this.nextBtn.btn,
            );

        return {
            embeds: [this.pages[this.currentPage]],
            components: [buttons],
            ephemeral: this.ephemeral
        }
    }

    next() {
        this.currentPage++;
        if (this.currentPage > this.pages.length - 1) this.currentPage = 0;
    }

    previous() {
        this.currentPage--;
        if (this.currentPage < 0) this.currentPage = this.pages.length - 1;
    }
}

module.exports = CarouselBuilder;
