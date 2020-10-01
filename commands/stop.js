module.exports = {
    name: "stop",
    description: "Stop the Currently Playing Song",
    guildOnly: true,
    execute(message, args) {
        console.log(`[${new Date()}] Stop Command Executed by ${message.author.username}`)
        if (!message.guild.voiceData) return message.reply("There is Nothing Playing at the Moment!");
        message.guild.voiceData.stopping = true;
        let voiceChannel = message.guild.voiceData.channel;
        
        const response = {
            title: "Stopped!",
            color: 0xFF0000,
            fields: [
                { name: "Music", value: "Music has been stopped!"},
                { name: "Channel", value: "Left channel!"}
            ],
            timestamp: new Date(),
            footer: { text: message.client.user.username }
        }

        voiceChannel.leave();
        message.guild.voiceData = undefined;
        //message.channel.send("**Stopped Music And Left Channel!**")
        message.channel.send({ embed: response })
    }
}