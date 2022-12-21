const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");



module.exports = {
  name: "trivia",
  description: "Test your trivia skills!",
  data: new SlashCommandBuilder()
        .setName('trivia')
        .setDescription('Test your trivia skills!')
        .addStringOption(option =>
            option
                .setName('category')
                .setDescription('Choose one of the specified categories for your question.')
                .setRequired(true)
                .addChoices(
                    { name: 'Random Category', value: 'r_category' },
                    { name: 'General Knowledge', value: '9' },
                    { name: 'Books', value: '10' },
                    { name: 'Film', value: '11' },
                    { name: 'Music', value: '12' },
                    { name: 'Musicals & Theatres', value: '13' },
                    { name: 'Television', value: '14' },
                    { name: 'Video Games', value: '15' },
                    { name: 'Board Games', value: '16' },
                    { name: 'Science & Nature', value: '17' },
                    { name: 'Computer Science', value: '18' },
                    { name: 'Mathematics', value: '19' },
                    { name: 'Mythology', value: '20' },
                    { name: 'Sports', value: '21' },
                    { name: 'Geography', value: '22' },
                    { name: 'History', value: '23' },
                    { name: 'Politics', value: '24' },
                    { name: 'Art', value: '25' },
                    { name: 'Celebrities', value: '26' },
                    { name: 'Animals', value: '27' },
                    { name: 'Vehicles', value: '28' },
                    { name: 'Comics', value: '29' }
                ))
        .addStringOption(option =>
            option
                .setName('difficulty')
                .setDescription('Choose the difficulty for your question.')
                .setRequired(true)
                .addChoices(
                    { name: 'Random Difficulty', value: 'r_difficulty' },
                    { name: 'Easy', value: 'easy' },
                    { name: 'Medium', value: 'medium' },
                    { name: 'Hard', value: 'hard' }
                ))
        .setDMPermission(false),
  

  run: async (client, interaction) => {
    //Option variables
    var chosenCategory = interaction.options.getString('category');
    var chosenDifficulty = interaction.options.getString('difficulty');

    //Link Builder
    var apiLink = (`https://opentdb.com/api.php?amount=1&category=${chosenCategory}&difficulty=${chosenDifficulty}&type=multiple`)
    if(chosenCategory == `r_category`) {
        var apiLink = (`https://opentdb.com/api.php?amount=1&difficulty=${chosenDifficulty}&type=multiple`)
        if(chosenDifficulty == `r_difficulty`) {
            var apiLink = (`https://opentdb.com/api.php?amount=1&type=multiple`)
        }
    }
    if(chosenDifficulty == `r_difficulty`) {
        var apiLink = (`https://opentdb.com/api.php?amount=1&category=${chosenCategory}&type=multiple`)
        if(chosenCategory == `r_category`) {
            var apiLink = (`https://opentdb.com/api.php?amount=1&type=multiple`)
        }
    }
    

    //API Fetched
    const rawAPI = await fetch(`${apiLink}`);
    const decryptedAPI = await rawAPI.json();

    //console.log(apiLink)
    //console.log(decryptedAPI)

    //Embed Assets Defined
    const apiCategory = decryptedAPI.results[0].category;
    const apiDifficulty = decryptedAPI.results[0].difficulty;
    const apiQuestion = decryptedAPI.results[0].question;
    const apiCorrectAnswer = decryptedAPI.results[0].correct_answer;
    const apiIncorrectAnswer1 = decryptedAPI.results[0].incorrect_answers[0];
    const apiIncorrectAnswer2 = decryptedAPI.results[0].incorrect_answers[1];
    const apiIncorrectAnswer3 = decryptedAPI.results[0].incorrect_answers[2];

    //Unix timestamp
    const generatedTimestamp = Date.now()
    const calculatedTimestamp = Math.floor(generatedTimestamp / 1000)

    //Shuffle Array
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
    var arr = [
        `${apiCorrectAnswer}`,
        `${apiIncorrectAnswer1}`,
        `${apiIncorrectAnswer2}`,
        `${apiIncorrectAnswer3}`
    ]
    shuffle(arr)

    // program to convert first letter of a string to uppercase
    function capitalizeFirstLetter(str) {

        // converting first letter to uppercase
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

        return capitalized;
    }
    const result = capitalizeFirstLetter(apiDifficulty);
    //Build Embed
    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(`Trivia`)
      .setDescription(`**Category**\n${apiCategory}\n\n**Difficulty**\n${result}\n\n**Question**\n${apiQuestion}\n\n**Answers**\nA. ${arr[0]}\nB. ${arr[1]}\n C. ${arr[2]}\nD. ${arr[3]}\n\n**Correct Answer**\n||${apiCorrectAnswer}||`)
      .setFooter({ text: `Provided by OpenTDB.com`, iconURL: `${interaction.user.displayAvatarURL()}` })
      .setTimestamp();

    //send final embed
    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
