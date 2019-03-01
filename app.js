const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config/config.json')

//Instancia un colleciion de comandos de Discord
client.commands = new Discord.Collection();

//lee todos los ficheros .js de la carpeta commandos y los añade a la coleccion de comandos
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


//Hace las validaciones de los comandos y los ejecuta
client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Hubo un error al ejecutar el comando');
    }
});



client.on('channelUpdate', (oldChannel, newChannel) => {
    console.log('El canal de ha actualizado');
    newChannel.send('El canal de ha actualizado');
});
client.login(token);