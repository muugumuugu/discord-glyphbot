console.log("Beep beep! 🤖");
const Discord = require("discord.js");
const client = new Discord.Client();
client.login('ODQxMDU5ODc4NjkyMDYxMTk0.YJhQDQ.dsXX_3dNO10lX0Zx_ElTG8EQTA4');

client.on("ready", readyDiscord);

function readyDiscord() {
  console.log("hewwo");
}

const commandHandler = require("./commands.js");

client.on("message", commandHandler);
