const Discord = require("discord.js");
const Cleverbot = require("cleverbot-node");

const client = new Discord.Client();
const clbot = new Cleverbot;
const newUsers = [];

clbot.configure({botapi: "lol"});

const config = {
  "token" : "lol",
  "prefix" : "b!",
}

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setGame(`b!help | DM me`);
  client.user.setStatus('dnd')
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on('guildMemberAdd', member => {
  member.guild.channels.get('393117255531102210').send('**' + member.user.username + '**, has joined the server!'); 
  client.channels.get('393117255531102210').send(`Welcome to the British Breakfast's Official server, ${member}!`);
});


client.on("message", message => { //clbot index
  if (message.channel.type === "dm") {
    if (message.author.bot) return;
    clbot.write(message.content, (response) => {
      message.channel.startTyping();
      setTimeout(() => {
        message.channel.send(response.output).catch(console.error);
        message.channel.stopTyping();
      }, Math.random() * (1 - 3) + 1 * 1000);
    });
  }
if(message.content === "mohid") { //personalised for mohid
   message.reply(`\:fire: My master! \:fire:`);
}
if (message.content === "hamaad") { //personalised for hammy
  message.reply(`\:poop: piece of crap \:poop:`)
}
if (message.content === "furrukh") { //personalised for far
  message.reply(`\:boom: terrorist \:boom:`)
}
if (message.content === "vesgucci") { //irrelevant builer
  message.reply(`\:fire: My other master! :fire:`)
}
if (message.content === "frameshift") { //irrelevant builer
  message.reply(`\:fire: My other master! :fire:`)
}

const swearWords = ["dick", "shit", "bitch", "fuck", "nigger", "faggot"]; // swearword filter
  if( swearWords.some(word => message.content.includes(word)) ) {
    message.delete();
    message.reply("Please watch your language.");
  }
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    if(!message.member.roles.some(r=>["Bot Admin"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");
    
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {
    if(!message.member.roles.some(r=>["Bot Admin"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  if (command === "invite") {
    message.guild.channels.get('393117255531102210').createInvite().then(invite =>
    message.channel.send(invite.url)
    );
  }
  
  if(command === "purge") {
    if(!message.member.roles.some(r=>["Bot Admin"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
      const user = message.mentions.users.first();
      const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
      if (!amount) return message.reply('Must specify an amount to delete!');
        if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
        message.channel.fetchMessages({
        limit: amount,
      }).then((messages) => {
       if (user) {
        const filterBy = user ? user.id : Client.user.id;
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
       }
       message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
      });
    }

  if (command === "help") {
    message.channel.send({embed: {
    color: 15105570,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Bot Commands",
    url: "https://www.roblox.com/My/Groups.aspx?gid=3422972",
    description: "These are commands that I can perform:",
    fields: [{
        name: "Kick",
        value: "``Kick a user from the discord chat whose been naughty.``"
      },
      {
        name: "Ban",
        value: "``Ban a user from the discord chat who has been REALLY naughty.``"
      },
      {
        name: "Say",
        value: "``What do you want me to say then?``"
      },
      {
        name: "Purge",
        value: "``Delete either a select messages, within a chat or from a single user.``"
      },
      {
        name: "Ping",
        value: "``Find out how speedy your latency is!``"
      },
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© British Breakfast"
    }
  }
});
  }


});

client.login(config.token);
