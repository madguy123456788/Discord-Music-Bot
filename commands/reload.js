module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	usage: '<name of command>',
	permission: 'BotOwner',
	execute(message, args) {
		if (!args.length) return message.channel.send(`You Didn't Pass a command to reload! ${message.author}`);
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName);
		
		if (!command) return message.channel.send(`There are No Commands called \`${commandName}\``);
		
		delete require.cache[require.resolve(`./${command.name}.js`)];
		
		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${command.name}\` was Reloaded!`);
		} catch (error) {
			console.log(error);
			message.channel.send(`There was an error when reloading command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};