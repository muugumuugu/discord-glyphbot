const etch = require("./glypher.js");

const commands = {etch};

module.exports = async function (msg) {
    let tokens = msg.content.split(" ");
    let command = tokens.shift();
    if (command.charAt(0) === "!") {
      command = command.substring(1);
      commands[command](msg, tokens);
    }
};
