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


//VOICE INTERACTION LOGS
client.on('voiceStateUpdate', async (oldState, newState) => {
  //console.log(oldState)
  //console.log(newState)
  const test0 = oldState.toJSON()
  const test1 = newState.toJSON()
  //console.log(test0)
  //console.log(test1)
  const triggeredUserId = test1.id
  const triggeredUser = await client.users.fetch(triggeredUserId)
  const vcLogsChannel = await client.channels.cache.get("1044739015640891543")
  if (oldState.mute !== newState.mute) return;
  if (oldState.deaf !== newState.deaf) return;
  const guildThing = client.guilds.cache.get('1028882986046861352')
    const member = await guildThing.members.fetch(newState.id)
    const memberNick = member.displayName
  //Went AFK
  if (newState.channelId == "1052147455766052875") {
    //#46aefc
    const channelLeftID = test0.channelId
    var generatedTimestamp = Date.now()
    var calculatedTimestamp = Math.floor(generatedTimestamp / 1000)
    const vcAFKEmbed = new EmbedBuilder()
      .setTitle(`User AFK.`)
      .setDescription(`${memberNick} has gone AFK.\n\n<t:${calculatedTimestamp}:R>\n<t:${calculatedTimestamp}:T>`)
      .setColor(`#46aefc`)
      .setFooter({ text: `VC Interaction Log`, iconURL: `${triggeredUser.displayAvatarURL()}`})
    vcLogsChannel.send({ content: `**${memberNick}** has gone AFK.`, embeds: [vcAFKEmbed] })
  }
  //Not AFK
  if (oldState.channelId == "1052147455766052875") {
    //#46aefc
    const channelLeftID = test0.channelId
    var generatedTimestamp = Date.now()
    var calculatedTimestamp = Math.floor(generatedTimestamp / 1000)
    const vcNOTRAFKEmbed = new EmbedBuilder()
      .setTitle(`User AFK.`)
      .setDescription(`${memberNick} is no longer AFK.\n\n<t:${calculatedTimestamp}:R>\n<t:${calculatedTimestamp}:T>`)
      .setColor(`#46aefc`)
      .setFooter({ text: `VC Interaction Log`, iconURL: `${triggeredUser.displayAvatarURL()}`})
    vcLogsChannel.send({ content: `${memberNick} is no longer AFK.`, embeds: [vcNOTRAFKEmbed] })
  }
  if (oldState.streaming !== newState.streaming) return;
  if (!test1.channelId) {
  if (oldState.channelId == "1052147455766052875") return;
    //Channel leave
    const channelLeftID = test0.channelId
    const channelLeft = client.channels.cache.get(`${channelLeftID}`)
    var generatedTimestamp = Date.now()
    var calculatedTimestamp = Math.floor(generatedTimestamp / 1000)
    const vcLeaveEmbed = new EmbedBuilder()
      .setTitle(`Voice channel left.`)
      .setDescription(`${memberNick} left <#${channelLeftID}>.\n\n<t:${calculatedTimestamp}:R>\n<t:${calculatedTimestamp}:T>`)
      .setColor(`#ff0000`)
      .setFooter({ text: `VC Interaction Log`, iconURL: `${triggeredUser.displayAvatarURL()}`})
    vcLogsChannel.send({ content: `${memberNick} left the ${channelLeft.name} VC.`, embeds: [vcLeaveEmbed] })
  } else {
    if (newState.channelId == "1052147455766052875") return;
    //Channel Join
    const channelJoinID = test1.channelId
    const channelJoined = client.channels.cache.get(`${channelJoinID}`)
    var generatedTimestamp = Date.now()
    var calculatedTimestamp = Math.floor(generatedTimestamp / 1000)
    const vcJoinEmbed = new EmbedBuilder()
      .setTitle(`Voice channel joined.`)
      .setDescription(`${memberNick} joined <#${channelJoinID}>.\n\n<t:${calculatedTimestamp}:R>\n<t:${calculatedTimestamp}:T>`)
      .setColor(`#00ff29`)
      .setFooter({ text: `VC Interaction Log`, iconURL: `${triggeredUser.displayAvatarURL()}`})
    vcLogsChannel.send({ content: `${memberNick} joined the ${channelJoined.name} VC.`, embeds: [vcJoinEmbed] })
  }
})

//NEW MEMBER JOIN
client.on('guildMemberAdd', async member => {
  const joinedID = member.id;
  const joinedUsername = member.displayName;
  const welcomeChannel = client.channels.cache.get("1052827879530041434")
  //how to add role: <GuildMember>.roles.add(<roleID)
  //Games role id: 1028899483918024735
  //member role id: 1028903160703623188
})

//BUTTON MANAGER
client.on('interactionCreate', async interaction => {
  //Code here, unused at the moment.
});





  client.login(token);