const { Telegraf, Markup } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();
const text = require("./const");
const forwardChatId = process.env.CHAT_ID;

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(async (ctx) => {
  try {
    await ctx.reply(
      ctx.message.from.first_name
        ? `Привет, ${ctx.message.from.first_name} ! Добро пожаловать в наш бот-помощник! Здесь ты найдешь ответы на свои вопросы и сможешь оставить заявку. 👋😊 #ботприветствует`
        : `Привет, Дорогов Посититель ! Добро пожаловать в наш бот-помощник! Здесь ты найдешь ответы на свои вопросы и сможешь оставить 
        заявку. 👋😊 #ботприветствует`
    );
    await ctx.replyWithHTML(
      `<b>🚩______...◽️🔻◽️🔻◽️ 🧰 Menu ◽️🔻◽️🔻◽️...______🚩 
      </b>
▪️<i> Для подписчиков канала https://t.me/codingcase действует 20 % от объявленной цены</i>▪️`,
      Markup.inlineKeyboard([
        [Markup.button.callback(" 🌐 ▪️ Веб-разработка ▪️ ", "btn_1")],
        [Markup.button.callback(" 🟣 ▪️ UI/UX-дизайн ▪️ ", "btn_2")],
        [Markup.button.callback(" 🎨 ▪️ Graphic Design ▪️ ", "btn_3")],
        [Markup.button.callback(" 🤖 ▪️ Chat BOT Telegram ▪️ ", "btn_4")],
        [Markup.button.callback(" Ⓜ️ ▪️ Marketing ▪️ ", "btn_5")],
        [Markup.button.callback(" 💻 ▪️ DevOps ▪️", "btn_6")],
      ])
    );
  } catch (error) {
    console.log(error);
  }
});
bot.help((ctx) => ctx.reply(text.commands));
bot.command("admin", async (ctx) => {
  try {
    await ctx.replyWithHTML(`🔗 Click on link - https://t.me/DevBoT_Biainili`, {
      disable_web_page_preview: true,
    });
  } catch (error) {
    console.log(error);
  }
});
const codingcasePhoto = "./imgForBot/CodInfo.png";
bot.command("info", async (ctx) => {
  try {
    await ctx.replyWithPhoto({ source: codingcasePhoto });
    await ctx.replyWithHTML(text.textforInfo, {
      disable_web_page_preview: true,
    });
  } catch (error) {
    console.log(error);
  }
});
let cout = 0;
function nextBuuton(btn) {
  bot.action(btn, async (ctx) => {
    try {
      ctx.answerCbQuery();
      switch (btn) {
        case "btn_1":
          cout = 1;
          break;
        case "btn_2":
          cout = 2;
          break;
        case "btn_3":
          cout = 3;
          break;
        case "btn_4":
          cout = 4;
          break;
        case "btn_5":
          cout = 5;
          break;
        case "btn_6":
          cout = 6;
          break;
        default:
          cout = 0;
          break;
      }

      await ctx.replyWithHTML(
          (btn === "btn_1" && text.textForBnt_1) ||
          (btn === "btn_2" && text.textForBnt_2) ||
          (btn === "btn_3" && text.textForBnt_3) ||
          (btn === "btn_4" && text.textForBnt_4) ||
          (btn === "btn_5" && text.textForBnt_5) ||
          (btn === "btn_6" && text.textForBnt_6) 
      ,
        Markup.inlineKeyboard([
          [
            Markup.button.callback("✅ Оставить Запрос ", "btn_9"),
            Markup.button.callback("ℹ️ Информация про раздел", "btn_10"),
          ],
        ])
      );
    } catch (error) {
      console.log(error);
    }
  });
}

// Zaptos

let switchE = false;
try {
  bot.action("btn_9", async (ctx) => {
    ctx.answerCbQuery();
    await ctx.replyWithHTML(
        (cout === 1 && "<b> 🌐 ▪️ Веб-разработка ▪️ </b>") ||
        (cout === 2 && "<b> 🟣 ▪️ UI/UX-дизайн ▪️ </b>") ||
        (cout === 3 && "<b> 🎨 ▪️ Graphic Design ▪️ </b>") ||
        (cout === 4 && "<b> 🤖 ▪️ Chat BOT Telegram ▪️ </b>") ||
        (cout === 5 && "<b> Ⓜ️ ▪️ Marketing ▪️ </b>") ||
        (cout === 6 && "<b> 💻 ▪️ DevOps ▪️ </b>")
    );
    ctx.replyWithHTML(text.textForReqfect, {
      disable_web_page_preview: true,
    });
    switchE = true;

    bot.on("text", async (ctx) => {
      const chatId = ctx.chat.id;
      const message = ctx.message.text;
      switch (cout) {
        case 1:
          cout = "🌐 ▪️ Веб-разработка ▪️";
          break;
        case 2:
          cout = "🟣 ▪️ UI/UX-дизайн ▪️";
          break;
        case 3:
          cout = "🎨 ▪️ Graphic Design ▪️";
          break;
        case 4:
          cout = "🤖 ▪️ Chat BOT Telegram ▪️";
          break;
        case 5:
          cout = "Ⓜ️ ▪️ Marketing ▪️ ";
          break;
        case 6:
          cout = "💻 ▪️ DevOps ▪️ ";
          break;
        default:
          "";
          break;
      }
      if (ctx.chat.type === "private" && switchE === true) {
        await bot.telegram.forwardMessage(
          forwardChatId,
          chatId,
          ctx.message.message_id
        );
        await bot.telegram.sendMessage(
          forwardChatId,
          `Send Catygory: ${cout} by @${ctx.message.chat.username}`
        );
        (await ctx.message.message_id) &&
          ctx.replyWithHTML(text.textForFormget);

        message !== undefined ? (switchE = false) : (switchE = true);
      }
    });
  });
} catch (error) {
  console.log(error);
}

bot.action("btn_10", async (ctx) => {
  ctx.answerCbQuery();
  try {
    await ctx.replyWithHTML(
      (cout === 1 && text.textBtn_1Info) ||
        (cout === 2 && text.textBtn_2Info) ||
        (cout === 3 && text.textBtn_3Info) ||
        (cout === 4 && text.textBtn_4Info) ||
        (cout === 5 && text.textBtn_5Info) ||
        (cout === 6 && text.textBtn_6Info) 

    );
  } catch (error) {
    console.log(error);
  }
});

nextBuuton("btn_1");
nextBuuton("btn_2");
nextBuuton("btn_3");
nextBuuton("btn_4");
nextBuuton("btn_5");
nextBuuton("btn_6");
nextBuuton("btn_7");
nextBuuton("btn_8");

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
