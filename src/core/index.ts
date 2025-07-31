// import dotenv from 'dotenv';
// import TelegramBot from 'node-telegram-bot-api';
// import { Match, PlatformRegion, Player, PubgAPI } from 'pubg-typescript-api';

// dotenv.config()

// const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN!;
// const PUBG_API_KEY = process.env.PUBG_API_KEY!;

// const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
// const pubg = new PubgAPI(PUBG_API_KEY, PlatformRegion.STEAM);

// bot.on('message', async msg => {
//        if (!msg.text) return;
//        const playerName = msg.text.trim();

//        try {
//               const players = await Player.filterByName(pubg, [playerName]);
//               if (players.length === 0) {
//                      await bot.sendMessage(msg.chat.id, `No PUBG user found with name "${playerName}".`);
//                      return;
//               }

//               const player = players[0];
//               const matches = player.matchIds;
//               const lines: string[] = [];

//               for (const matchId of matches) {
//                      const match = await Match.get(pubg, matchId);
//                      const telemetry = await match.getTelemetry(pubg);

//                      telemetry.playerAttackEvents.forEach(ev => {
//                             console.log("EV");
//                             console.log(ev);
//                             if (ev.attackType === 'LogPlayerKill') {
//                                    const killer = ev.attacker?.name;
//                                    const victim = ev..name;
//                                    const killerTwitch = ev.killer?.steamAccount?.twitchName;
//                                    const victimTwitch = ev.victim?.steamAccount?.twitchName;
//                                    // streamer must have linked twitch -> API provides twitchName
//                                    if (!killerTwitch && !victimTwitch) return;
//                                    if (killer === playerName && victimTwitch) {
//                                           const url = match.getTwitchClipUrl(ev);
//                                           lines.push(`🎮 You killed a streamer (${victim}, Twitch: ${victimTwitch})\nWatch: ${url}`);
//                                    }
//                                    if (victim === playerName && killerTwitch) {
//                                           const url = match.getTwitchClipUrl(ev);
//                                           lines.push(`💀 You were killed by streamer (${killer}, Twitch: ${killerTwitch})\nWatch: ${url}`);
//                                    }
//                             }
//                      });
//               }

//               if (lines.length === 0) {
//                      await bot.sendMessage(msg.chat.id, `No kills or deaths involving streamers (with linked Twitch) found in the last 14 days.`);
//               } else {
//                      await bot.sendMessage(msg.chat.id, lines.join('\n\n'));
//               }
//        } catch (err: any) {
//               console.error(err);
//               await bot.sendMessage(msg.chat.id, `Error fetching PUBG data: ${err.message}`);
//        }
// });
