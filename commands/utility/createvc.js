const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, ChannelType, Embed } = require("discord.js");
const { guilds } = require("../..");



module.exports = {
  name: "createvc",
  description: "Create a new VC with a user limit!",
  data: new SlashCommandBuilder()
        .setName('createvc')
        .setDescription('Create a new VC with a user limit!')
        .addNumberOption(option =>
            option
                .setName('userlimit')
                .setDescription('Set a user limit for your created VC.')
                .setRequired(true)
                .setMinValue(2)
                .setMaxValue(99)
                )
        .addStringOption(option => 
            option
                .setName('vcgame')
                .setDescription('Choose the name of the game the vc is for')
                .setRequired(true)
            )
        .setDMPermission(false),
  

  run: async (client, interaction) => {
    var generatedTimestamp = Date.now()
    var calculatedTimestamp = Math.floor(generatedTimestamp / 1000)
    //Option variables
    var vcUserLimit = interaction.options.getNumber('userlimit')
    const vcGame = interaction.options.getString('vcgame')
    const vcUserLimitString = vcUserLimit.toString()
    const theBoysGuild = client.guilds.cache.get('1028882986046861352')
    //console.log(`User Limit: ${vcUserLimitString}`)
    const member = await theBoysGuild.members.fetch(interaction.user.id)
    const memberNick = member.displayName

    const channelCreateEmbed = new EmbedBuilder()
    .setTitle(`New Channel Created`)
    .setColor(`#46aefc`)
    .setDescription(`**Creator**\n${memberNick}\n\n**Category**\n${vcGame}\n\n**Limit**\n${vcUserLimitString}\n\n<t:${calculatedTimestamp}:R>\n<t:${calculatedTimestamp}:T>`)
    .setFooter({ text: `VC Creation Log`, iconURL: `${interaction.user.displayAvatarURL()}`})

    const newChannel = await theBoysGuild.channels.create({
        name: `${vcGame} - ${memberNick}`,
        type: ChannelType.GuildVoice,
        userLimit: vcUserLimit,
        reason: `VC Create by ${memberNick}`,
        parent: '1055740233620135966'
    });
    const newChannelID = await newChannel.id
    //console.log(newChannelID)
    const logChannel = client.channels.cache.get("1028903092684591154")
    client.on('voiceStateUpdate', async (oldState, newState) => {
        const oldieState = oldState.toJSON()
        //console.log(oldieState.id)
        if(oldieState.channel == newChannelID) {
            if(newChannel.members.size == '0') {
                await theBoysGuild.channels.delete(newChannelID, `${memberNick}'s VC became vacant.`)
                logChannel.send(`${memberNick}'s VC deleted.`)
                return
            }
        }
    })


    await interaction.reply({ content: `Created a new voice channel! <#${newChannelID}> *Channel will delete upon vacancy.*`, ephemeral: true });
    
    logChannel.send({ embeds: [channelCreateEmbed] })
  },
};
