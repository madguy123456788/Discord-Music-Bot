const ytdl = require('ytdl-core');

module.exports = {
    nextSong: async function(message) {
        let guild = message.guild;
        if (!guild.voiceData.stopping) {
            guild.voiceData.queue.shift();
            guild.voiceData.requesters.shift();
            if (guild.voiceData.queue.length < 1) {
                guild.voiceData.channel.leave();
                guild.voiceData = null;
            } else {
                var info = await ytdl.getBasicInfo(guild.voiceData.queue[0]);
                var title = info.videoDetails.title;
                var time = `${Math.floor(info.videoDetails.lengthSeconds / 60)}:${info.videoDetails.lengthSeconds - (Math.floor(info.videoDetails.lengthSeconds / 60) * 60)}`
                let stream = ytdl(guild.voiceData.queue[0], { filter: 'audioonly', highWaterMark: 1<<25 });
                let dispatcher = guild.voiceData.connection.playStream(stream);
                guild.voiceData.dispatcher = dispatcher;
                var requester = guild.voiceData.requesters[0].nickname || guild.voiceData.requesters[0].user.username
                //message.channel.send(`**Now Playing: ${guild.voiceData.queue[0]}**`)
                const embed = {
                	title: "Now Playing",
                	color: 0xFF0000,
                	fields: [
                			{ name: "Title", value: title || "Error Getting Title" },
                            { name: "URL", value: guild.voiceData.queue[0] },
                            { name: "Length", value: time },
                            { name: "Requester", value: requester }
                		],
                	timestamp: new Date(),
                	footer: { text: `${message.client.user.username} • Brought to you By ${message.member.nickname || message.member.user.username}` }
                };
                
                message.channel.send({ embed: embed });
                console.log(`[${new Date()}] [${guild.name}] Now Playing Changed to "${title}"[${guild.voiceData.queue[0]}]`);
                //message.channel.send(`**Now Playing: ${title || guild.voiceData.queue[0]}**`);

                dispatcher.on('end', () => {
                    module.exports.nextSong(message);
                });
            }
        }
    }
}