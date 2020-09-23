# Private-Music-Bot
 
This bot was a private project created by `Just a Mushroom#4101`,
It is a barebones Discord Music Bot written in `discord.js` and *probably* won't work very well

## How to Use (Windows)

Firstly You need to have NodeJS installed, download from [Here](https://nodejs.org/en/download/)

clone the repo with `git clone https://www.github.com/madguy123456788/Private-Music-Bot.git`, or download the latest release (download the source code for the release)

Then `cd` into the newly created `Private-Music-Bot/` directory and run `npm-install`, this will install all of the required dependancies for the bot to function.

Next..

### -Either-

run the Bot with the following commands in command prompt:
*see the block above for the variable options*

`set PREFIX=<prefix>`*optional: if not set, the bot will use `!` as the prefix*

`set STATUS=<status>`*optional: if not set, the bot will display a generic `Ready!` Message*

`set TOKEN=<token>` *required to allow the program to login to the bot account*

`set OWNER_ID=<owner_id>` *optional, don't set if you don't want to use commands like `reload` or `reloadall`*

`set MODE=production` *this is required if you don't plan to use the .env file*

`node index.js`

*If you want to do all this in one command type in:*
`set PREFIX=<prefix> && set STATUS=<status> && set TOKEN=<token> && set OWNER_ID=<owner_id> && set MODE=production && node index.js`

*These commands are Practically Identical to those on linux but instead of `set` the command is `export` instead*

*you will have to execute all the commands again if you close and reopen the command prompt window*

### -OR-

edit the .env file
```
PREFIX=<This is your Bot's Prefix>
STATUS=<This is the Status Message your bot will display as "Playing [Message]">
TOKEN=<This is the Token of your bot get from discord.com/developers/applications>
OWNER_ID=<This is your User ID Obtained from the Discord Client with Developer Options on>
```

then run the bot in command prompt with `node index.js`
it will say that the bot is running in "Testing Mode", This is a result of my implemenation of the .env file to allow for a testing version to run alongside a live version


Once you run the command(s), the bot will load modules and command, then it will start, exiting the command prompt window will kill the bot and stop it responding to commands from users

## How to Use (Linux)

The Process for starting the bot on Linux is almost identical to that on Windows.
The main differences are that node can be installed with `sudo apt-get install node`, instead of using `set` to set the variables, you use `export` instead 
and that the one-liner for the bot is `PREFIX=<prefix> STATUS=<status> TOKEN=<token> OWNER_ID=<owner_id> MODE=production; node index.js`

Once you run the command(s), the bot will load required modules and commands, then it will start. Exiting the command prompt window will kill the bot and stop it responding to commands from users
