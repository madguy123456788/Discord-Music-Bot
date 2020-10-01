//const { prefix } = require("../config.json")
const prefix = process.env.PREFIX || "!";
module.exports = {
    name: "skip",
    description: "Skip the Current Song",
    guildOnly: true,
    execute(message, args) {
        console.log(`[${new Date()}] Skip Command Executed by ${message.author.username}`)
        let guild = message.guild;
        if (!guild.voiceData) return message.reply("Nothing is Playing at the Moment!");
        if (guild.voiceData.queue.length < 2) return message.reply(`There are no more songs in the queue! please use \`${prefix}stop\` instead!`);
        const response = {
            title: "Skipped!",
            color: 0x0000FF,
            fields: [
                { name: "Music", value: "Song has been skipped!"}
            ],
            timestamp: new Date(),
            footer: { text: message.client.user.username }
        }
        let dispatcher = guild.voiceData.dispatcher;
        dispatcher.destroy();
        message.channel.send({ embed: response })
    }
}