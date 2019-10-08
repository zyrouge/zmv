//ZMV Bot
const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true, sharding: false});
const prefix = '??';
const db = require("quick.db");

client.on("ready", () => {
  console.log('<---------------------------->')
  console.log('ZMV | Bot Online');
  console.log('<---------------------------->')
  client.user.setActivity(`Halloween : ZMV`, {type: 'WATCHING'});
  client.user.setStatus('dnd')
});

client.on("message", async message => {
  if(message.channel.id == '603628398883110938') {
    if(message.content.toLowerCase() == "verify") {
      message.member.addRole("587047044716298241");
      message.delete();
    } else if(message.author.id == '521007613475946496') { return
    } else { message.delete(); }
  }
});

client.on("guildMemberAdd", member => {
  client.channels.get('611474252713164810').setName(`Citizens: ${member.guild.memberCount}`)
});

client.on("guildMemberRemove", member => {
  client.channels.get('611474252713164810').setName(`Citizens: ${member.guild.memberCount}`)
});

client.on("message", async message => {
  if (message.author.bot) return;
  
  if(message.content.indexOf(prefix) !== 0) return;
  const args = message.content.split(/\s+/g);
  const command = args.shift().slice(prefix.length).toLowerCase();
  
  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  
  if(command === "ping") {
    message.channel.send(client.ping + ' ms.');
  }
 
  if (command === "eval") {
    if(message.author.id !== '521007613475946496') return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      message.channel.send(clean(evaled), {code:"xl", split:true});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``,{split:true});
    }
  }
});

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

//-------------------------------------------------------------------------------


//Website
var express = require('express');
var app = express();

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('static'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/join', function(req, res) {
    res.render('join');
});

app.get('/updates', function(req, res) {
    res.render('updates');
});

app.get('/stats', function(req, res) {
  res.render('stats', {
    zmv: client.guilds.get("587042898546262043").name,
    membercount: client.guilds.get("587042898546262043").memberCount,
    citizens: client.guilds.get("587042898546262043").members.filter(m => m.user.bot != true).size,
    region: client.guilds.get("587042898546262043").region,
    emojis: client.guilds.get("587042898546262043").emojis.size,
    text: client.guilds.get("587042898546262043").channels.findAll('type', 'text').length,
    voice: client.guilds.get("587042898546262043").channels.findAll('type', 'voice').length,
    roles: client.guilds.get("587042898546262043").roles.size,
    owner: client.guilds.get("587042898546262043").owner.user.tag,
    available: (client.guilds.get("587042898546262043").available ? "Available" : "Not Available"),
});
});


var port = 8080;
app.listen(port, function() {
  console.log('<---------------------------->')
  console.log('ZMV | Website Online on Port ', port)
  console.log('<---------------------------->')
});

client.login(process.env.TOKEN)