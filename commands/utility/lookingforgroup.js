const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require("discord.js");



module.exports = {
  name: "lookingforgroup",
  description: "Create an LFG post!",
  data: new SlashCommandBuilder()
        .setName('lookingforgroup')
        .setDescription('Create an LFG post')
        .setDMPermission(false),

  run: async (client, interaction) => {
    // Create the modal
		const modal = new ModalBuilder()
        .setCustomId('myModal')
        .setTitle('Looking for Group');

    // Add components to modal

    // Create the text input components
    const gameInput = new TextInputBuilder()
        .setCustomId('gameInput')
        // The label is the prompt the user sees for this input
        .setLabel("What game are you playing?")
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short)
        .setMinLength(4)
        .setMaxLength(50)
        //Text in box
        .setPlaceholder(`Apex Legends, Dead by Daylight, etc.`);

    const playercountInput = new TextInputBuilder()
        .setCustomId('playercountInput')
        .setLabel("How many players do you need?")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Short)
        .setMinLength(1)
        .setMaxLength(3)
        .setPlaceholder(`1 through 999`);
    const gamemodeInput = new TextInputBuilder()
        .setCustomId('gamemodeInput')
        .setLabel("What gamemode are you playing?")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Short)
        .setMinLength(1)
        .setMaxLength(20)
        .setPlaceholder(`Input "Any" if you don't care.`);
    const notesInput = new TextInputBuilder()
        .setCustomId('notesInput')
        .setLabel("Anything else?")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Paragraph)
        .setMaxLength(100)
        .setPlaceholder(`Anything else players may need to know? If not, just say "No".`);

    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(gameInput);
    const secondActionRow = new ActionRowBuilder().addComponents(playercountInput);
    const thirdActionRow = new ActionRowBuilder().addComponents(gamemodeInput);
    const fourthActionRow = new ActionRowBuilder().addComponents(notesInput)

    // Add inputs to the modal
    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);
    
      /* client.on('interactionCreate', async interaction => {
        try {
        if (interaction.isModalSubmit()) {
          const row = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId('deletePost')
                .setLabel('Delete post')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('🗑️'),
            );
          const generatedTimestamp = Date.now()
          const calculatedTimestamp = Math.floor(generatedTimestamp / 1000)
          const gamePlaying = interaction.fields.getTextInputValue('gameInput');
          const playerCount = interaction.fields.getTextInputValue('playercountInput');
          const gamemode = interaction.fields.getTextInputValue('gamemodeInput');
          const notes = interaction.fields.getTextInputValue('notesInput')
          const embed = new EmbedBuilder()
            .setTitle('Looking for Group')
            .setFooter({ text: `LFG post`, iconURL: `${interaction.user.displayAvatarURL()}` })
            .setDescription(`**Game:**\n${gamePlaying}\n\n**Players needed:**\n${playerCount}\n\n**Gamemode:**\n${gamemode}\n\n**Anything else?**\n${notes}\n\n=-=-=-=-=-=-=-=-=\n\nPosted by ${interaction.user.username} <t:${calculatedTimestamp}:R>`)
            .setColor('Aqua');
          const sent = await interaction.reply({ embeds: [embed], components: [row] })
          //const filter = (i) => i.user.id === interaction.user.id;
          //const button = await sent.awaitMessageComponent({ filter, time: 60000 })
            } else if(interaction.isButton()) {
              interaction.message.delete();
            } else return;
          } catch (e) {
            console.log(e)
          } 
      }); */
    
    
  },
};
