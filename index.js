const { Client } = require("discord.js-selfbot-v13");
const client = new Client();
const CHANNEL_ID = '1372504359778385930'; // Replace with your channel ID

function getCurrentTime() {
    const now = new Date();
    return now.toTimeString().split(" ")[0].slice(0, 5); // HH:MM
}

function getRandomDelay() {
    const min = 60_000;     // 1 minute
    const max = 120_000;    // 2 minutes
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function sendHourlyMessage(channel) {
    const delay = getRandomDelay();
    console.log(`⏳ Waiting ${(delay / 1000 / 60).toFixed(1)} minutes before sending...`);

    await new Promise(resolve => setTimeout(resolve, delay));

    const currentTime = getCurrentTime();
    const message = `⏰ Hourly message at ${currentTime} (with delay)`;

    try {
        await channel.send(message);
        console.log(`✅ Sent: ${message}`);
    } catch (err) {
        console.error("❌ Error sending message:", err);
    }

    // Wait 1 hour, then call again
    setTimeout(() => sendHourlyMessage(channel), 60 * 60 * 1000);
}

client.on("ready", async () => {
    console.log(`🟢 Logged in as ${client.user.tag}`);

    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel) {
        console.log("❌ Channel not found.");
        return;
    }

    // Start the loop
    sendHourlyMessage(channel);
});

// ⚠️ Use at your own risk
client.login(process.env.TOKEN);
