const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");


module.exports = {
  name: "ping",
  description: "Responds with bot latency!",
  data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responds with bot latency')
        .setDMPermission(false),

  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("🏓 Pong!")
      .setDescription(`Latency : ${client.ws.ping}ms`)
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
