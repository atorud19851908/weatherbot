const { Telegraf } = require("telegraf");
const fetch = require("node-fetch");
const emoji = require("node-emoji").emoji;
require("dotenv").config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) =>
  ctx.reply(
    `Assalomu aleykum ${ctx.message.from.first_name}.
    Istalgan hudud nomini yozib ayni paytdagi ob-havo ma'lumotini olishingiz mumkin`
  )
);
bot.on("text", (ctx) => {
  let text = ctx.message.text;
  let chatId = ctx.message.chat.id;
  let address = text;

  if (text && text !== "/start") {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${address}&lang=ru&appid=${process.env.KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const temp = Math.round(data.main.temp - 273);
        bot.telegram.sendMessage(
          chatId,
          ` 🏙️ Hudud nomi: ${data.name}. ${data.sys.country}
 🌡️Temperatura: ${temp}°C
 ☁️ Bulutli: ${data.clouds.all}%
 💨 Shamol tezligi: ${data.wind.speed} metr/sek
 `
        );
      })
      .catch((error) => {
        bot.telegram.sendMessage(chatId, "Manzil nomini to'gri kiriting 😐");
      });
  }
});

bot.launch();
