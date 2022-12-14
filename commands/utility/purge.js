const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");


module.exports = {
  name: "purge",
  description: "Clear an entire channel of text!",
  data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Clear an entire channel of text!')
        .setDMPermission(false),

  run: async (client, interaction) => {
    const purgeChannelID = interaction.channel.id
    const purgeChannel = client.channels.cache.get(`${purgeChannelID}`)
    const logChannel = client.channels.cache.get("1028903092684591154")
    const generatedTimestamp = Date.now()
    const calculatedTimestamp = Math.floor(generatedTimestamp / 1000)
    purgeChannel.bulkDelete(100, { filterOld: true }).then(messages => {
        const embed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("Channel Purged")
        .setDescription(`Successfully purged ${messages.size} messages.`)
        .setTimestamp()
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        logChannel.send({ content: `<@${interaction.user.id}> deleted ${messages.size} messages in <#${purgeChannelID}> at <t:${calculatedTimestamp}:T>.` })
        interaction.reply({ embeds: [embed], ephemeral: true });
    })
  },
};
