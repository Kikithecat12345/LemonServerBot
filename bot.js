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
const fs = require('fs');
const serverId = 728297305312329862;  // this is so jank but the better way is much harder
const specialChannelIds = [
    728297305329106951, // #information
    728322720386777170, // #hibye
    728298426558840922, // #trigger-potentials
    728297305551405156, // #ranting-venting
    744135238103597097, // #m
];
fs.readFile("klaxon.txt", "utf-8", (err, data) => {
    var klaxonBoard = data.split("\n");
    var currentKlaxon = file[0];
    var lastKlaxon = file[1];
    klaxonBoard.splice(0, 2);
});

client.on("ready", () => {
    console.log("Lemon Bot v.0.1");
    console.log("meme mode: activated");
    console.log("LOL ONIONS!");
    console.log("Initializing...");
    // ANCHOR: init code here if needed
    console.log("Initialization Complete.");
});
client.on("message", (message) => {
    processMessage(message);
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
        if (specialChannelIds.includes(message.channel.id)) {
           // ignore klaxon
        } else {   
            //TODO: klaxon code
        }
    }
}

/**
 * klaxonCheck() - checks if the string contains the klaxon
 * @param {string} message - message to be checked
 */
function klaxonCheck(message) {
    let splitMessage = message.split(" ");
    splitMessage.forEach(element => {
        if (element === currentKlaxon) return true;
    });
    return false;
}

// login stuffs (idk how this works but it hides the bot token so :shrug:)
client.login(process.env.TOKEN);
