console.log("Loading nodejs Environment...");
console.log("Loading Modules...");
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client(/*{ ws: { intents: Discord.Intents.ALL } }*/);
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
console.log("Initializing Discord.js Bot...");
//const { prefix, token, presence, ownerid } = require('./config.json');
console.log("Setting Variables...");
if (process.env.MODE != 'production' || process.env.MODE == undefined) {
	console.log("WARNING: Bot Running in Testing Mode!")
	try {
		require('dotenv').config();
	} catch (err) {
		console.log(`An Error Occurred when accessing '.env': ${err}`)
		process.exit();
	}
}
const prefix = process.env.PREFIX || "!";
const token = process.env.TOKEN;
//const { status } = require('./config.json');
const status = process.env.STATUS || "Ready!";
const ownerid = process.env.OWNER_ID || 0;

console.log(`Loading Discord.js Bot With Prefix ${prefix}...`);
var count = 0;

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	console.log(`Command ${prefix}${command.name} loaded.`);
	count += 1;
}

console.log(`${count} Commands were Loaded!`);

client.once('ready', () => {
	//console.log('Ready!');
	console.log("The Bot is Online and Ready");
	if (status){
		client.user.setPresence({ game: { name: status }, status: 'online'});
	};
		//.then(console.log)
		//.catch(console.error);
});

client.on('message', message => {
	//console.log(message.content);
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	//console.log(command);
	//console.log(args);
	//console.log(`Command Executed: ${commandName} With Arguments: ${args}`);
	
	if (!client.commands.has(commandName)) return;
	
	const command = client.commands.get(commandName);

	
	
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply("This Command Can't be Used in DMs");
	}

	//if (command.neededrole && message.channel.type !== 'dm' && !message.member.roles.cache.some(role => role.name === command.neededrole)) {
	if ( command.neededrole && !command.neededrole.some((CurrentVal) => {message.member.roles.cache.has(() => {if (message.guild.roles.cache.find(role => role.name === CurrentVal)) { return message.guild.roles.cache.find(role => role.name === CurrentVal).id} else { return null }})})) {
		return message.reply(`You Don't Have Permission to use this command! Required Role: \`${command.neededrole}\``);
	}
	if ( command.permission == "Testing" && message.author.id != ownerid) {
		return message.reply("The command you tried to use is currently being tested and is not available for public use");
	}

	if (command.args && !args.length) {
		let reply = `No Arguments were Provided, ${message.author}`;
		
		if (command.usage) {
			reply += `\nThe Proper Usage is \`${prefix}${command.name} ${command.usage}\``;
		}
			return message.channel.send(reply);
	}
	
	try {
		if ( command.permission == "BotOwner" && message.author.id != ownerid ) {
			//console.log(`${message.author.id} !== ${ownerid}`);
			return message.reply("You need to be my Owner in order to do That!");
		} else {
			command.execute(message,args);
		}
	}catch (error) {
		console.error(error);
		message.reply('Something went wrong trying to execute that command!');
	}
});


if (!token) {
	console.log("Bot Token not Defined!");
	process.exit();
}
client.login(token);
