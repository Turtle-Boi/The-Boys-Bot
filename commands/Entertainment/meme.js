const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "meme",
  description: "Fetch a meme!",
  data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Fetch a meme')
        .setDMPermission(false),

  run: async (client, interaction) => {
        const rawAPI = await fetch('https://meme-api.herokuapp.com/gimme');
        const decryptedAPI = await rawAPI.json();
        interaction.reply({ content: `${decryptedAPI.url}`, ephemeral: true });
  },
};
