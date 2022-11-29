const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");



module.exports = {
  name: "say",
  description: "Have the bot replicate exactly what you say!",
  data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Define the message content for the bot.')
        .addStringOption(option =>
            option
                .setName('content')
                .setDescription('The content you want the bot to replicate')
                .setRequired(true))
        .setDMPermission(false),
  

  run: async (client, interaction) => {
    //Options
    

    const content = interaction.options.getString('content');

    //Unix timestamp
    const generatedTimestamp = Date.now()
    const calculatedTimestamp = Math.floor(generatedTimestamp / 1000)

    //Ephemeral Embed
    const embed = new EmbedBuilder()
      .setColor("#08ee33")
      .setTitle("Say command executed!")
      .setDescription(`"Say" command executed at <t:${calculatedTimestamp}:T>`)
      .setFooter({ text: `Ran by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });

    //Send embed silently
    

    //Replicate option content
    await interaction.channel.send(`${content}`)
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
