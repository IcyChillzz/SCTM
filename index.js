const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

client.on('ready', () => {
    console.log('ready')
    client.user.setActivity('/help', { type: "LISTENING" })
});
//DefineArgs
client.on("message", message => {
    if(message.author.bot) return;
    const args = message.content.slice(prefix.length).split(' ');
})
//Welcome
client.on("guildMemberAdd", member => {
    const guild = member.guild;
    guild.defaultChannel.sendMessage(`Welcome ${member.user} to this server.`).catch(console.error);
});
//Goodbye
client.on("guildMemberRemove", member => {
    let guild = member.guild;
    guild.defaultChannel.sendMessage(`${member.user} left this server.`).catch(console.error);
});
//Ping
client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'ping' || 'Ping')) {
        message.reply('Pong!')
    }
});
//Prefix
client.on("message", message => {
    if (message.content.startsWith(prefix + 'prefix||Prefix')) {
        message.reply('My prefix is: `/`')
    }
});
//Help
client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'help' || 'Help')) {
        const helpEmbed = new Discord.RichEmbed()
            .setAuthor(`${message.guild.name}`)
            .setTitle('Help List')
            .setColor(0xb10d73)
            .setDescription('This is the official help list for the <@773126964210040852> Bot')
            .addField('Prefix:', '/')
            .addField('Moderation(staff only):', 'kick \nban')
            .addField('Info:', 'info \nhelp \nprefix \navatar \nmembercount \nonline \nserverinfo')
            .addField('Other:', 'ping \nsuggest')
        message.channel.send(helpEmbed)
    }
});
//Info
client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'info' || 'Info')) {
        const infoEmbed = new Discord.RichEmbed()
            .setAuthor(`${message.guild.name}`)
            .setTitle('Bot Info')
            .setColor(0xb10d73)
            .setDescription(`This is the bot's Info!`)
            .addField('Bot Version:', 'v1.0')
            .addField('discord.js Version:', 'v11.6.4')
            .setFooter(`Requested By: ${message.author.username}`)
            .setTimestamp()
        message.channel.send(infoEmbed)
    }
});
//DeleteInvites
client.on("message", message => {
    if (message.content.includes('discord.gg/' || 'invite.gg/'))
        message.delete()
            .then(message.reply(`You can not send Invite Links in ${message.guild.name}`))
});
//Kick
client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'kick' || 'Kick'))
        if (message.member.hasPermission('BAN_MEMBERS')) {
            const userKick = message.mentions.users.first()

            if (userKick) {
                var member = message.guild.member(userKick);

                if (member) {
                    member.kick('You have been kicked from the server!').then(() => {
                        message.reply(`Kicked ${userKick.tag}`);
                    }).catch(err => {
                        message.reply('I was not able to kick that user!')
                        console.log(err);
                    })
                } else {
                    message.reply('That user is not in the server!')
                }
            } else {
                message.reply('There was no user mentioned')
            };
        }
}
);
//Ban
client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'ban' || 'Ban'))

        if (message.member.hasPermission('BAN_MEMBERS')) {
            const userBan = message.mentions.users.first();

            if (userBan) {
                var member = message.guild.member(userBan);

                if (member) {
                    member.ban({
                        reason: `You have been banned from ${member.guild.name}.`
                    }).then(() => {
                        message.reply(`${userBan.tag} was banned from the server`)
                    })
                } else {
                    message.reply('that user is not in the server.');
                }
            } else {
                message.reply('you need to state a user to ban.')
            }


        } else {
            message.reply('your not alllowed to do that sorry')
        };
}
)
//Membercount
client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'membercount' || 'Membercount')) {
        const membersInServer = message.guild.memberCount;
        const memberEmbed = new Discord.RichEmbed()
            .setAuthor(`${message.guild.name}`)
            .setColor(0xb10d73)
            .setTitle(`Membercount for: ${message.guild.name}`)
            .addField('Membercount:', `${membersInServer}`)
            .setFooter(`Requested By: ${message.author.username}`)
            .setTimestamp()

        message.channel.send(memberEmbed);
    }
});
//WhoIs
client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'whois' || 'WhoIs' || 'Whois')) {
        let mentionedMember = message.mentions.members.first();
        let mentionedUser = message.mentions.users.first();

        const userInfoEmbed = new Discord.RichEmbed()
            .setTitle('User Information for:', `${mentionedUser.user}`)
            .addField('Username', `${mentionedUser.username}`)
            .addField('User ID:', `${mentionedUser.id}`)
            .addField('Account Creation:', `${mentionedUser.createdAt}`)
            .addField('Joined Server At:', `${mentionedMember.joinedAt}`)
            .addField('User Status:', `${mentionedUser.presence.status}`)
            .setFooter(`Requested By: ${message.author.username}`)
            .setTimestamp()

        message.channel.send(userInfoEmbed).catch(err => console.log(err))
    }
});
//Avatar
client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'avatar' || 'Avatar')) {
        const args = message.content.slice(prefix.length).split(' ');
        if (args[0]) {
            const user = message.mentions.users.first()
            if (!user) return message.reply('Please mention a user to receive their avatar')
            const otherIconEmbed = new Discord.RichEmbed()
                .setTitle(`${user.username}'s Avatar!`)
                .setImage(user.displayAvatarURL)
                .setFooter(`Requested By: ${message.author.username}`)
                .setTimestamp()

            return message.channel.send(otherIconEmbed).catch(err => console.log(err));
        }
    }
});
//Suggest
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'suggest')) {
        const args = message.content.slice(12).trim().split(/ +/g);
        const suggestion = args.slice(0).join(" ");
        const suggestionEmbed = new Discord.RichEmbed()
            .setColor(0xb10d73)
            .setTitle('Suggestion')
            .setDescription('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n▬▬▬▬▬▬▬▬▬**«    SupremeCommissions™ Player Suggestion    »**▬▬▬▬▬▬▬▬▬▬\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n**Suggested By »** ' + message.author + '\n\n**Suggestion »** ' + suggestion)
            .setFooter(`Suggested By: ${message.author.username}`, message.author.avatarURL)

        message.channel.send('@here')
        message.channel.send(suggestionEmbed).then(sentEmbed => {
            sentEmbed.react("👍")
            sentEmbed.react("👎")
        })
    }
})
//ServerInfo
client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'serverinfo')) {
        const serverInfoEmbed = new Discord.RichEmbed()
            .setAuthor(`Server Info For: ${message.guild.name}`)
            .setColor(0xb10d73)
            .addField('Server Name:', `${message.guild.name}`)
            .addField('Server Created At:', `${message.guild.createdAt}`)
            .addField('Total Members:', `${message.guild.memberCount}`)
        message.channel.send(serverInfoEmbed)
    }
})
//Online
client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'online')) {
        message.channel.send('I am up and running!')
    }
})
//Purge
client.on("message", message => {
    if (message.content.startsWith(prefix + 'purge')) {
        if (message.channel.type !== 'dm') {
            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                const purgeEmbed = new Discord.RichEmbed()
                    .setColor(0xb10d73)
                    .setTimestamp()
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .addField(':warning: Error :warning:', 'You need to have `Manage Messages` perm.')
                return message.author.sendEmbed(purgeEmbed);
            }
        }
        message.channel.bulkDelete(100);
        const deletedEmbed = new Discord.RichEmbed()
            .setAuthor(`${message.author.username}`)
            .setTitle('Messages Deleted!')
            .setColor(0xb10d73)
        return message.channel.send(deletedEmbed).then(message => message.delete(600));

    }
});
client.login(token);