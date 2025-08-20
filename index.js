const { Client } = require("discord.js-selfbot-v13");
const { joinVoiceChannel } = require("@discordjs/voice");
const express = require("express");

const client = new Client();
const app = express();

// ويب سيرفر عشان Render ما يوقف البوت
app.get("/", (req, res) => res.send("✅ Bot is running!"));
app.listen(process.env.PORT || 3000, () =>
  console.log("🌐 Web server running")
);

client.on("ready", async () => {
  console.log(`🤖 Logged in as ${client.user.username}`);

  // ضع الأيدي هنا
  const GUILD_ID = "1289654556598206536";
  const VOICE_CHANNEL_ID = "1357815715465527467";

  const guild = client.guilds.cache.get(GUILD_ID);
  const channel = guild.channels.cache.get(VOICE_CHANNEL_ID);

  // التحقق الصحيح للروم الصوتي
  if (!channel || !channel.isVoiceBased()) {
    return console.log("❌ هذا مو روم صوتي");
  }

  try {
    joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfMute: false,
      selfDeaf: false,
    });
    console.log("✅ دخل الروم الصوتي 24/7");
  } catch (err) {
    console.error("❌ خطأ أثناء محاولة دخول الروم:", err);
  }
});

client.login(process.env.TOKEN); // التوكن من القفل
