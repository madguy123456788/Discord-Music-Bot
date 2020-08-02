const ytdl = require('ytdl-core');
const { prefix } = require('../config.json');
const { nextSong } = require('../modules/music');
module.exports = {
    name: "play",
    description: "Play a Song",
    args: true,
    usage: "<Youtube URL>",
    guildOnly: true,
    execute(message, args) {
        const voiceChannel = message.member.voiceChannel;
        const voiceinformation = { stopping: false, requesters: [] };
        console.log(`[${new Date()}] Play Command Executed by ${message.author.username}`);

        //if (message.guild.voiceData) return message.reply(`Please \`${prefix}stop\` the current Song Before Playing something New!`);

        if (message.guild.voiceProcessing) return message.reply("I'm Currently Building the Song Queue! Please wait a bit and try again");

        if (!message.guild.voiceData) {
            message.guild.voiceProcessing = true;
            console.log(`[${new Date()}] Building Song Queue for Server "${message.guild.name}"...`);
            if (!voiceChannel) return message.reply("Please join a Voice Channel Before Running this Command!");

            voiceinformation.channel = voiceChannel;
            var playqueue = [ args[0] ];
            voiceinformation.queue = playqueue;
            voiceinformation.requesters.push(message.member);

            if(!ytdl.validateURL(args[0])) return message.reply("Please enter a valid Youtube URL!");

            voiceChannel.join().then(async function(connection) {
                voiceinformation.connection = connection;
                var info = await ytdl.getBasicInfo(playqueue[0]);
                var title = info.videoDetails.title;
                let stream = ytdl(playqueue[0], { filter: 'audioonly', highWaterMark: 1<<25 });
                var time = `${Math.floor(info.videoDetails.lengthSeconds / 60)}:${info.videoDetails.lengthSeconds - (Math.floor(info.videoDetails.lengthSeconds / 60) * 60)}`
                let dispatcher = connection.playStream(stream);
                voiceinformation.dispatcher = dispatcher;
                message.guild.voiceData = voiceinformation;
                message.guild.voiceProcessing = undefined;
                //message.channel.send(`**Now Playing: ${playqueue[0]}**`)
                var requester = voiceinformation.requesters[0].nickname || voiceinformation.requesters[0].user.username
                const embed = {
                	title: "Now Playing",
                	color: 0xFF0000,
                	fields: [
                			{ name: "Title", value: title || "Error Getting Title" },
                            { name: "Youtube URL", value: playqueue[0] },
                            { name: "Length", value: time },
                            { name: "Requester", value: requester }
                		],
                	timestamp: new Date(),
                	footer: { text: `${message.client.user.username} • Brought to you By ${message.member.nickname || message.member.user.username}` }
                };
                
                message.channel.send({ embed: embed });
                console.log(`[${new Date()}] Song Queue Built for Server: "${message.guild.name}". Now Playing "${title}"[${playqueue[0]}]`);
                //message.channel.send(`**Now Playing ${title || playqueue[0]}**`);

                dispatcher.on('end', () => {
                    nextSong(message);
                });
            });
        } else {
            if(!ytdl.validateURL(args[0])) return message.reply("Please enter a valid Youtube URL!");
            message.guild.voiceData.queue.push(args[0]);
            message.guild.voiceData.requesters.push(message.member);
            message.channel.send("**Song Queued!**");
        }

        process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
    }
};