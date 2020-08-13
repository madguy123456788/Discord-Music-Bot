const ytdl = require('ytdl-core');
module.exports = {
    name: "queue",
    description: "View the Play Queue",
    guildOnly: true,
    execute: async function(message, args) {
        console.log(`[${new Date()}] Queue Command Executed by ${message.author.username}`);
        if (!message.guild.voiceData) {//return message.reply("There is no music Playing Right Now!");
            const embed = {
                title: "Current Queue",
                color: 0xFF0000,
                fields: [
                    { name: "Queue is Empty", value: "There is No Music Playing Right Now" }
                ],
                timestamp: new Date(),
                footer: { text: message.client.user.username }
            };
            message.channel.send({ embed: embed });
        } else {
            const queue = message.guild.voiceData.queue;
            const embed = {
                title: "Current Queue",
                color: 0x00FF00,
                fields: [],
                timestamp: new Date(),
                footer: { text: message.client.user.username }
            };
            message.channel.send("Getting Queue Information, Please Wait a Moment...")
            var count = 0;
            for (var item in queue) {
                var info = await ytdl.getBasicInfo(queue[item]);
                var itemtitle = info.videoDetails.title;
                if (count === 0) {
                    //embed.fields.push({ name: "Now Playing", value: queue[item] });
                    embed.fields.push({ name: "Now Playing", value: itemtitle || queue[item] });
                } else {
                    //embed.fields.push({ name: "Queue Item", value: queue[item] });
                    embed.fields.push({ name: "Queue Item", value: itemtitle || queue[item] });
                }
                count += 1;
            }

            message.channel.send({ embed: embed });
        }
    }
}