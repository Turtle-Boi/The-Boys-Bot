const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");


module.exports = {
  name: "joke",
  description: "Get a free laugh!",
  data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Get a free laugh!')
        .setDMPermission(false),

  run: async (client, interaction) => {
    // Returns a random integer from 1 to 10:
    const randomNumber = Math.floor(Math.random() * 10);
    const joke = [
        "How did the telephone propose?",
        "What do you call a singing laptop?",
        "What did the flight attendant say to the 2x4 when it got on the airplane?",
        "What are the strongest days of the week?",
        "Today I found out my toaster isn't waterproof...",
        "A baby seal walks into a club...",
        "What did one wall say to the other wall?",
        "What concert costs 45 cents per ticket?",
        "Did you hear that David can't find his ID?",
        "How come the man driving the train got struck by lightning?"
    ]
    const punchline = [
        "Using a ring ring ring!",
        "A Dell!",
        "Welcome a board!",
        "Saturday and Sunday. All the rest are weak days.",
        "I was shocked!",
        "It starts groaning in pain.",
        "Let's meet up in the corner.",
        "50 cent, ft. Nickelback",
        "His name is now Dav.",
        "He was a good conductor."
    ]
    const randomJoke = joke[randomNumber]
    const randomPunchline = punchline[randomNumber]
    const embed = new EmbedBuilder()
      .setColor("Orange")
      .setTitle("Here's your joke!")
      .setDescription(`${randomJoke}\n||${randomPunchline}||`)
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
