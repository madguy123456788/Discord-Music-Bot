module.exports = {
    name: "stop",
    description: "Stop the Currently Playing Song",
    guildOnly: true,
    execute(message, args) {
        console.log(`[${new Date()}] Stop Command Executed by ${message.author.username}`)
        if (!message.guild.voiceData) return message.reply("There is Nothing Playing at the Moment!");
        message.guild.voiceData.stopping = true;
        let voiceChannel = message.guild.voiceData.channel;
        
        voiceChannel.leave();
        message.guild.voiceData = null;
        message.channel.send("**Stopped Music And Left Channel!**")
    }
}