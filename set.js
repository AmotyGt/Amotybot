const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUNkR3hodURMVktjd1U4eWh3UEhaaHUvaFk1dXdGTlYvN0l5b1JoNUtGbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUlFckdLVzRJeUVVZGxyV3NsK2I5SU1qalUvbjZCbDI3RlA1d2FnVUxSQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlSDN1UGY3ZGNuWnhWcE1oQWhtUlpXb2pYbDN3Z3c2Rk5iSlR6MmJ6Nkc0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRNHF5cUVXUzVqVlhuMHZzRDJ0STZtbFhYK3VZbnpjL0N4enFKVTcrMFhZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVLTFM2cjdXQnVURmQ5Rnp6R2pHa2xFQ1FlV2wwWkpuOHBPQzdMMWp3VUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikx1ZGN2NHR0RFEyQTEycElRYm9tSkRNYnIyaktzdXlGUXc3ZVBQV21td0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ000T21NUHNYMmFBb1QvNENWQ0RQQSs0QXpDMk1FOUF5VUMwSHd2Z05raz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicWdSSy9kVTA4TVQzSUxncko4MXdFb0lQbVZRWGxrK2xMdHNsMzBGU2pTRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkV0R24xTXlyYWsreFZDTFhnY3RYcUhaYVJvbFFRVFZWTGFUVGp6Q2F0ZFhZMDZoSURjenY1b3ZBcTNVeVVVS1NKMG94TXpGaHNxaEFlVEpreW90UWdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcsImFkdlNlY3JldEtleSI6Ik4rTndBV3RaRXR1ZXpmNDhEcEZMeCs4b2NXcXpQdGJaYWNqTVZJTTVRQWs9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzE1NTM5MjU2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjVENzk3NjRCMjU4MDgwRUJBNzIxMDhDNTRCMTA0RjhEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Mjg0MDcyMzB9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlJlWnpReS1tVEhDUEwxX3FDa1V3YUEiLCJwaG9uZUlkIjoiMzkxYTQ4ZTQtMDc4Mi00Mzk5LWI2Y2EtNzRiMzViYWY3ZGU1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNEOCtVRmhxUDU2N04rQ2Y2Mzg2WTlTWTBuMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUdGk1Wnljb3hCRTl1Y1FCOHZiUkdVQ0RjczQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSFpKSlkzQjMiLCJtZSI6eyJpZCI6IjI1NDcxNTUzOTI1NjozQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPTHo1NHNERUs3TmxiZ0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJXMFltMEs5WkMwL0tuN0cwZ2FobmhLbzczbmxTMjNlOTVJY2pBeUhwZkcwPSIsImFjY291bnRTaWduYXR1cmUiOiIyZDF4TElpb3B3bmxidEh0cHFOK1p0cU9uM3RaNzBWaUh2c2NHdnJxbkUwSTA3b1Q0bEoxNi9uQ0VrQWZtQXZrbHk4NEd3ZGxCR2tpdE9kdkJuZUdCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNzlPR2docnpVcnVnUlAwZm45REFoTlpFSGlqMnJNWndmSUdEU0lFUU1ZVTQzMXFWK1BBWjlCT1BFMTBjNFNBcDVqdktiTmJ0d2hEMUMycU84WENNanc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MTU1MzkyNTY6M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWdEdKdEN2V1F0UHlwK3h0SUdvWjRTcU85NTVVdHQzdmVTSEl3TWg2WHh0In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI4NDA3MjI4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUpIcCJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
