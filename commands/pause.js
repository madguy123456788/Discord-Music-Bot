module.exports = {
    name: "pause",
    description: "Pause/Resume the Current Song",
    guildOnly: true,
    execute(message, args) {
        console.log(`[${new Date()}] Pause Command Executed by ${message.author.username}`)
        if (!message.guild.voiceData) return message.reply("There is Nothing Playing at the Moment!");
        const voiceinformation = message.guild.voiceData;
        let dispatcher = voiceinformation.dispatcher;

        if (dispatcher.paused) {
            dispatcher.resume();
            message.channel.send("**Song Unpaused**")
        } else if (!dispatcher.paused) {
            dispatcher.pause();
            message.channel.send("**Song Paused**")
        }
    }
}