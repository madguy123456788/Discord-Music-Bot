const fs = require('fs');
module.exports = {
	name: 'reloadall',
	description: 'Reloads all commands',
	permission: 'BotOwner',
	execute(message, args) {
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
		
		for (const file of commandFiles) {
			delete require.cache[require.resolve(`./${file}`)];
			const command = require(`./${file}`);
			message.client.commands.set(command.name, command);
		}
		
		message.channel.send("All Commands Reloaded");
	}
};