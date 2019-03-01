ping = {
    name: 'ping',
    description: 'Ping!',
    execute(msg) {
        msg.channel.send('Pong!');
    }
}

module.exports = ping;