const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "meme",
  description: "Fetch a meme!",
  data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('This command is temporarily disabled.')
        .setDMPermission(false),

  run: async (client, interaction) => {
        const rawAPI = await fetch('https://meme-api.herokuapp.com/gimme');
        const decryptedAPI = await rawAPI.json();
        //interaction.reply({ content: `${decryptedAPI.url}`, ephemeral: true });
        interaction.reply({ content: `This command is temporarily disabled.`, ephemeral: true });
  },
};
