const client = require("../index");
const { ActivityType } = require("discord.js")
 
client.on("ready", () => {
  const generatedTimestamp = Date.now()
  const calculatedTimestamp = Math.floor(generatedTimestamp / 1000)
  console.log(`${client.user.tag} is up and ready to go!`);
  const logChannel = client.channels.cache.get("1028903092684591154")
  const vcLogs = client.channels.cache.get("1044739015640891543")
  logChannel.send(`**Bot online at** <t:${calculatedTimestamp}:T>**.**`)
  vcLogs.send(`Bot rebooted, some join logs may be omitted.`)
  function setStatus() {
    client.user.setActivity(`at ${client.ws.ping} ping`, { type: ActivityType.Playing })
  }
  setTimeout(setStatus, 5000)
  setInterval(setStatus, 60000)
});
