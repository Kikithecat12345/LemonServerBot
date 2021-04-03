/**
 * Fuck you lemon bot
 * 
 * version 0.1 
 *
 * Please add JSDoc documentation to any added functions
 * 
 * ***FOR IF YOU ARE HOSTING THIS FOR TESTING***
 * install node and npm and run the following command in the folder with the bot.js file:
 * 
 * npm install discord.js
 * 
 * add a file called ".env" and add the following line in it:
 * 
 * TOKEN=(insert bot token here)
 * https://discord.com/oauth2/authorize?client_id=806330256893673523&scope=bot
 */

require("dotenv").config(); // import .env so we can get the token
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const serverId = 728297305312329862;  // this is so jank but the better way is much harder
const specialChannelIds = [
    728297305329106951, // #information
    728322720386777170, // #hibye
    728298426558840922, // #trigger-potentials
    728297305551405156, // #ranting-venting
    744135238103597097, // #m
];
const logChannel = 806680464022175774; // #dick-kicking-zone

var isKlaxonOn = true;
var klaxonBoard;
var currentKlaxon = "";
var lastKlaxon;
var waitingForKlaxon = false;
var timer;

fs.readFile("klaxon.txt", "utf-8", (err, data) => {
    klaxonBoard = data.split("\n");
    currentKlaxon = klaxonBoard[0];
    lastKlaxon = klaxonBoard[1];
    klaxonBoard.splice(0, 2);
});

client.on("ready", () => {
    console.log("Lemon Bot v.0.1");
    console.log("meme mode: activated");
    console.log("LOL ONIONS!");
    console.log("Initializing...");
    // ANCHOR: init code here if needed
    setStatus();
    console.log("Initialization Complete.");
});
client.on("message", (message) => {
    if (message.author.bot) return;
    if (message.guild === null) {
        if (waitingForKlaxon) {
            setKlaxon(message)
        } 
    } else processMessage(message);
     if (message.content.toLowerCase().indexOf("cum") >= 0) {
        message.react("😋");
    } 
    
});

/**
 * processMessage() - Processes the messages being sent by users.
 * @param {object} message - message being processed
 */
function processMessage(message) {
    // wheeeeeeeeeeeeee ctrl c ctrl v go brrrr
    if (/^\~/g.test(message.content)) {
        processCommand(message.content.substr(1)); // remove the leading character (the ">")
    } else if (message.channel.id === specialChannelIds[5]) {
        //mAnageMEnt(message) TODO
    } else {
        console.log("message read as pot claxon \n" + message)
        klaxon(message);
    }
}

/**
 * processCommand() - determines which command to run
 * @param {string} message - command without the prefix
 */
function processCommand(message) {
    // TODO: literally everything here
}

/**
 * klaxon() - checks if the message matches the klaxon
 * @param {object} message 
 */
function klaxon(message) {
    if (klaxonCheck(message.content)) {
        if (specialChannelIds.includes(message.channel.id)) return;  //is it in a no-no channel? 
        console.log("got here")
        //TODO: klaxon code
        if (message.author.bot || !isKlaxonOn) return;
        message.channel.send("> `" + message.content + "`\nKLAXON WORD: " + currentKlaxon + "\n" + message.member.user.username + " -10 Points LOL!");
        isKlaxonOn = false;
        dmKlaxon(message);
        
    } else console.log("bruh how")
}

/**
 * klaxonCheck() - checks if the string contains the klaxon
 * @param {string} message - message to be checked
 */
function klaxonCheck(message) {
    let active = false;
    console.log("a")
    let splitMessage = message.split(" ");
    console.log("b")
    splitMessage.forEach(element => {
        console.log("c " + (element === currentKlaxon) + " " + element + " " +currentKlaxon)
        if (element.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ") === currentKlaxon.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")) active = true; // strips all punctuation and makes the word lowercase on both sides
    });
    if (active) return true;
    else return false;
}

/**
 * dmKlaxon() - DMs the user and recieves the new klaxon.
 * @param {object} message - the message of the klaxon.
 */
function dmKlaxon(message) {
    client.users.cache.get(message.author.id).send("Set the new klaxon by DMing me back. If you do not set it in 10 minutes it defaults to \"test\" \nAs a common courtesy for others, keep the klaxon reasonable. Remember, you are trying to get others to trigger it!");
    waitingForKlaxon = message.author.id;
    timer = setTimeout( () => {
        client.users.cache.get(waitingForKlaxon).send("Welp, you ran out of time. LOL!");
        waitingForKlaxon = false;
        isKlaxonOn = true;
        currentKlaxon = "test"
        fs.writeFile("klaxon.txt", currentKlaxon, function (err) {
            if (err) {
                console.log("lmao");
            }
        });
    }, 600000);
}

/**
 * setStatus() - Starts the status loop
 */
function setStatus() {
    client.user.setActivity("Blan's Birthday!", { type: 'COMPETING' });
    var timeout = setTimeout(setStatus(), 600000);
}

/**
 * setKlaxon() - sets the new klaxon.
 * @param {object} message - the message containing the new klaxon
 */
function setKlaxon(message) {
    if (message.author.id = waitingForKlaxon) {
        if (/^\~/g.test(message.content)) {
            client.users.cache.get(message.author.id).send("Invalid string: Contains the bot's prefix.");
            return;
        } else if (!/^[a-zA-Z]*$/.test(message.content)) {
            client.users.cache.get(message.author.id).send("Invalid string: a-Z characters allowed only.");
            return;
        } else {
            clearTimeout(timer);
            currentKlaxon = message.content; 
            waitingForKlaxon = false;
            console.log("lol!");
            isKlaxonOn = true;
            fs.writeFile("klaxon.txt", message.content, function (err) {
                if (err) {
                    console.log("lmao");
                }
            });
            client.users.cache.get(message.author.id).send("Klaxon: ACTIVE");
        }
    }
}



// login stuffs (idk how this works but it hides the bot token so :shrug:)
client.login(process.env.TOKEN);
