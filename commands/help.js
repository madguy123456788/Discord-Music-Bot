const prefix = process.env.PREFIX || "!";
const ownerid = parseInt(process.env.OWNER_ID) || 0;
module.exports = {
	name: 'help',
	description: 'Get Help',
	usage: '[command name]',
	execute(message, args) {
		const data =[]
		const { commands } = message.client;
		const embed = {
            title: "Placeholder",
            color: 0xFFFF00,
            fields: [],
            timestamp: new Date(),
            footer: { text: message.client.user.username }
		}

		if (!args.length) {
			//data.push('Here\'s A List of all my commands:');
			//data.push(commands.map(command => command.name).join(', '));
			//data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
			embed.title = "Command List";
			commands.map( (command) => {
				//if ( command.permission == 'BotOwner' && message.author.id != ownerid ) {
				//	embed.fields.push({ name: `${prefix}${command.name}`, value: command.description, inline: true })
				//var testPerm = ( command.permission == 'Testing' && message.author.id == ownerid);
				if ( command.permission == 'BotOwner' && message.author.id == ownerid ) {
					
					embed.fields.push({ name: `${prefix}${command.name}`, value: command.description, inline: true })
					
				} else if ( command.permission != 'BotOwner' ) {
					if ( command.permission == "Testing" && message.author.id == ownerid) {
						
						embed.fields.push({ name: `${prefix}${command.name}`, value: command.description, inline: true })
						
					} else if ( command.permission != "Testing" ) {
						if (message.member !== null || message.member) {
							if ( command.neededrole && command.neededrole.some((CurrentVal) => {message.member.roles.cache.has(() => {if (message.guild.roles.cache.find(role => role.name === CurrentVal)) { return message.guild.roles.cache.find(role => role.name === CurrentVal).id} else { return null }})})) {
								
								embed.fields.push({ name: `${prefix}${command.name}`, value: command.description, inline: true })
								
							} else if (command.permission == "ServerOwner" && message.member == message.guild.owner) {

								embed.fields.push({ name: `${prefix}${command.name}`, value: command.description, inline: true })

							}
							} else if ( !command.neededrole && command.permission != "ServerOwner") {
								
								embed.fields.push({ name: `${prefix}${command.name}`, value: command.description, inline: true })
								
							}
						} else if ( !command.neededrole && command.permission != "ServerOwner") {
								
							embed.fields.push({ name: `${prefix}${command.name}`, value: command.description, inline: true })
								
						}
					}
				});
			
			//return message.author.send(data, {split: true})
			return message.author.send({ embed: embed })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('Looks like I can\'t DM you! Are your DMs disabled?');
				});
		}
		
		const name = args[0].toLowerCase();
		const command = commands.get(name);
		embed.title = `Command ${prefix}${command.name}`;

		if (!command) {
			return message.reply('That Command Doesn\'t Exist!');
		}
		
		//data.push(`**Name:** ${command.name}`);
		
		//if (command.description) data.push(`**Description:** ${command.description}`);
		//if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		if (command.permission == 'BotOwner' && message.author.id != ownerid) {
			embed.fields.push({ name: "Error", value: `You do not have Permission to view information on system command: \`${prefix}${command.name}\`` });
			embed.fields.push({ name: "Reason", value: "System Command, Required Permission: `Bot Owner`" });
			
		} else if (command.guildOnly && message.channel.type === "dm") {
			
			embed.fields.push({ name: "Error", value: `Information on this command cannot be viewed in a DM, please execute \`${prefix}${this.name} ${command.name}\` in a Server`});
		
		} else if (command.neededrole && (!message.member || message.member == null)) {

			embed.fields.push({ name: "Error", value: `You do not have Permission to view information on \`${prefix}${command.name}\`` });

			embed.fields.push({ name: "Reason", value: "Unable to confirm user roles, please execute in a server!" });

		} else if (command.neededrole && !command.neededrole.some((CurrentVal) => { return message.member.roles.has(message.guild.roles.find(role => role.name == CurrentVal).id)}) && message.channel.type !== "dm") {
			
			embed.fields.push({ name: "Error", value: `You do not have Permission to view information on \`${prefix}${command.name}\`` });
			roles = command.neededrole.join(', ');
			embed.fields.push({ name: "Required Role(s)", value: roles });
			
		} else if (command.permission == "Testing" && message.author.id != ownerid) {
			
			embed.fields.push({ name: "Error", value: `You do not have Permission to view information on command: \`${prefix}${command.name}\`` });
			embed.fields.push({ name: "Reason", value: "Command in Testing" });
			
		} else {
			
			if (command.description) embed.fields.push({ name: "Description", value: command.description });
			if (command.usage) embed.fields.push({ name: "Usage", value: ` ${prefix}${command.name} ${command.usage}` });
			
		}
		
		//message.channel.send(data, { split: true });
		message.channel.send({ embed: embed });
	},
};
