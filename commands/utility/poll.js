const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");



module.exports = {
  name: "poll",
  description: "Start a poll!",
  data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Start a poll!')
        .addStringOption(option =>
            option
                .setName('question')
                .setDescription('Input the question for the poll.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('firstoption')
                .setDescription('Input the first option for the poll.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('secondoption')
                .setDescription('Input the second option for the poll.')
                .setRequired(true))
        .setDMPermission(false),
  

  run: async (client, interaction) => {
    //Options
    const pollTitle = interaction.options.getString('question');
    const optionOne = interaction.options.getString('firstoption');
    const optionTwo = interaction.options.getString('secondoption');

    //Unix timestamp
    const generatedTimestamp = Date.now()
    const calculatedTimestamp = Math.floor(generatedTimestamp / 1000)

    //Ephemeral Embed
    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(`${pollTitle}`)
      .setDescription(`1️⃣ ${optionOne}\n2️⃣ ${optionTwo}`)
      .setFooter({ text: `Started by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });

    //Send embed silently
    

    //Replicate option content
    await interaction.channel.send({ embeds: [embed] })
    await interaction.reply({ content: `Poll started!`, ephemeral: true });
  },
};
