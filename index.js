require("dotenv").config();
const { token } = require('./config.json')
const { Client, Collection, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonComponent } = require("discord.js");

const client = new Client({ intents: 32767 });
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();

// Initializing the project
require("./handler")(client);

client.on('voiceStateUpdate', async (oldState, newState) => {
  //console.log(oldState)
  //console.log(newState)
  const test0 = oldState.toJSON()
  //console.log(test0)
  //console.log(test1)
  const test1 = newState.toJSON()
  const triggeredUserId = test1.id
  const triggeredUser = await client.users.fetch(triggeredUserId)
  const vcLogsChannel = await client.channels.cache.get("1044739015640891543")
  if (oldState.mute !== newState.mute) return;
  if (oldState.deaf !== newState.deaf) return;
  if (oldState.streaming !== newState.streaming) return;
  if (!test1.channel) {
    //Channel leave
    const channelLeftID = test0.channel
    var generatedTimestamp = Date.now()
    var calculatedTimestamp = Math.floor(generatedTimestamp / 1000)
    const vcLeaveEmbed = new EmbedBuilder()
      .setTitle(`Voice channel left.`)
      .setDescription(`${triggeredUser.username} left <#${channelLeftID}>.\n\n<t:${calculatedTimestamp}:R>\n<t:${calculatedTimestamp}:T>`)
      .setColor(`#ff0000`)
      .setFooter({ text: `VC Interaction Log`, iconURL: `${triggeredUser.displayAvatarURL()}`})
    vcLogsChannel.send({ content: `<@&1044824490464518204>`, embeds: [vcLeaveEmbed] })
  } else {
    //Channel Join
    const channelJoinID = test1.channel
    var generatedTimestamp = Date.now()
    var calculatedTimestamp = Math.floor(generatedTimestamp / 1000)
    const vcJoinEmbed = new EmbedBuilder()
      .setTitle(`Voice channel joined.`)
      .setDescription(`${triggeredUser.username} joined <#${channelJoinID}>.\n\n<t:${calculatedTimestamp}:R>\n<t:${calculatedTimestamp}:T>`)
      .setColor(`#46aefc`)
      .setFooter({ text: `VC Interaction Log`, iconURL: `${triggeredUser.displayAvatarURL()}`})
    vcLogsChannel.send({ content: `<@&1044824445241528351>`, embeds: [vcJoinEmbed] })
  }
})

client.on('interactionCreate', async interaction => {
    try {
    if (interaction.isModalSubmit()) {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('joinGroup')
            .setLabel('Join Group')
            .setStyle(ButtonStyle.Success)
            .setEmoji('🎮'),
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
      const logChanel = client.channels.cache.get("1028903092684591154")
      logChanel.send(`<@${interaction.user.id}> made an LFG post for "${gamePlaying}" at <t:${calculatedTimestamp}:T>.`)
      //const filter = (i) => i.user.id === interaction.user.id;
      //const button = await sent.awaitMessageComponent({ filter, time: 60000 })
      const filter = i => i.customId === 'deletePost';
      const filter2 = i => i.customId ==='joinGroup';
      
      const collector = interaction.channel.createMessageComponentCollector({ filter, max: 99 })
      const collector2 = interaction.channel.createMessageComponentCollector({ max: 99 })

      collector2.on('collect', async i => {
        const logChannel = client.channels.cache.get("1028903092684591154")
        if (i.customId === 'joinGroup') {
          if (i.user.id === interaction.user.id) {
            await i.reply({ content: `You cannot join your own LFG!`, ephemeral: true })
            logChannel.send(`<@${i.user.id}> tried to join their own "${gamePlaying}" LFG post.`)
          } else {
            client.users.send(interaction.user.id, `<@${i.user.id}> would like to join your "${gamePlaying}" LFG.`)
            if(i.replied) {
              await i.followUp({ content: `Sent a DM to <@${interaction.user.id}>.`, ephemeral: true })
            } else {
              await i.reply({ content: `Sent a DM to <@${interaction.user.id}>.`, ephemeral: true })
            }
            logChannel.send(`<@${i.user.id}> asked to join <@${interaction.user.id}>'s "${gamePlaying}" LFG.`)
          }
        } else if (i.customId === 'deletePost') {
          if (i.user.id === interaction.user.id) {
            interaction.deleteReply()
            await i.reply({ content: `Your LFG post for "${gamePlaying}" has been deleted at <t:${calculatedTimestamp}:T>.`, ephemeral: true })
            logChannel.send(`<@${i.user.id}> deleted their "${gamePlaying}" LFG post.`)
            collector.stop()
        } else {
            await i.reply({ content: `You are not the original poster!`, ephemeral: true })
            logChannel.send(`<@${i.user.id}> tried to delete <@${interaction.user.id}>'s "${gamePlaying}" LFG post.`)
        }
        } else return
      })
        } 
      } catch (e) {
        console.log(e)
      } 
  });



client.login(token);
