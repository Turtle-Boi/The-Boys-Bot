const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");


module.exports = {
  name: "whitelist",
  description: "Whitelist yourself on The Boys SMP!",
  data: new SlashCommandBuilder()
        .setName('whitelist')
        .setDescription('Whitelist yourself on The Boys SMP!')
        .setDMPermission(false)
        .addStringOption(option => 
            option
                .setName('username')
                .setDescription('Enter your Minecraft Java username! Caps sensitive!')
                .setRequired(true)
            ),

  run: async (client, interaction) => {
    const javaName = interaction.options.getString('username')
    const whitelistChannel = client.channels.cache.get('1056092874674020422')
    const consoleChannel = client.channels.cache.get('1056084867391176765')
    consoleChannel.send(`whitelist add ${javaName}`)
    whitelistChannel.send(`<@${interaction.user.id}> is **${javaName}**.`)
    interaction.reply({ content: `You have been whitelisted using the name **${javaName}**!\n*If an error in your username has occurred, contact corb.*`, ephemeral: true });
  },
};
