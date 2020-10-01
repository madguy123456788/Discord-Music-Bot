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
		
		const response = {
			title: "Placeholder title",
			color: 0xFFFF00,
			fields:[],
			timestamp: new Date(),
			footer: { text: message.client.user.username }
		}

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			response.title = "Command Reloaded";
			response.fields.push({ name: "Reload Successful", value: "The command was successfully reloaded!"});
			response.fields.push({ name: "Command Reloaded", value: newCommand.name });
			//message.channel.send(`Command \`${command.name}\` was Reloaded!`);
			message.channel.send({ embed: response})
		} catch (error) {
			console.log(error);
			response.title = "Command Reload Failed";
			response.color = 0xFF0000;
			response.fields = [
				{ name: "Command not Reloaded", value: "An error occured while reloading"},
				{ name: "Affected Command", value: command.name },
				{ name: "Error", value: error }
			];
			//message.channel.send(`There was an error when reloading command \`${command.name}\`:\n\`${error.message}\``);
			message.channel.send({ embed: response });
		}
	},
};