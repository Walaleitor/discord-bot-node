saludo = {
    name: 'saludo',
    description: 'Da un saludo al usuario',
    execute(msg) {
        msg.channel.send(`Saludos ${msg.author.username}`)
    }
};
module.exports = saludo;