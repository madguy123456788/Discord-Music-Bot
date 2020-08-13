module.exports = {
	name: "quit",
	description: "Quits the Bot",
	permission: "BotOwner",
	execute(message, args) {
		message.channel.send("Quitting Bot...");
		message.client.destroy();
		process.exit();
	}
}