import {PubgReportUtility} from "../../services/PubgReport/pubgreport.utility";
import {SendMessageOptions} from "node-telegram-bot-api";
import {TPlayer} from "../../services/PubgReport/types";
import {TBot} from "../core";
import {PubgReportService} from "../../services/PubgReport/pubgreport.service";
import {ICommand} from "./index";


export class PubgReportCommand implements ICommand {
    private _robot: TBot;
    private _PubgReportService: PubgReportService;
    constructor(Bot: TBot) {
        this._robot = Bot;

        this._PubgReportService = new PubgReportService();
    }
    private getPlayerPubgReport() {
        this._robot.onText(/^\/player\s\w+$/, async (msg) => {
            console.log("------------------------");
            console.log("Event: Get Player")
            console.log("------------------------");
            const text = msg.text;
            if (!text) {
                await this._robot.sendMessage(
                    msg.chat.id,
                    '<b> Please insert player name after command</b>',
                    {
                        parse_mode: "HTML"
                    }
                );
                return
            }
            const pubgName = text.replace('/player', '').trim();
            const players = await this._PubgReportService.searchForPlayer(pubgName);
            console.log(players);
            if (players.length === 0) {
                this._robot.sendMessage(
                    msg.chat.id,
                    '<b>Player Not Found</b>',
                    {
                        message_thread_id: msg.chat.id,
                        parse_mode: "HTML"
                    }
                );
                return;
            }
            if (players.length > 1) {
                const playersList = PubgReportUtility.displayPlayersName(players)
                const options: SendMessageOptions = {
                    reply_markup: {
                        inline_keyboard: playersList.map((item, index) => [{ text: item, callback_data: `player-${index}` }]),
                        resize_keyboard: true,
                        one_time_keyboard: true,
                    },

                };

                await this._robot.sendMessage(
                    msg.chat.id,
                    "Please choose a player:",
                    options

                )
                this.onPlayerChooseCallback(players)
                return
            }
            const player = players[0];
            const clips = await this._PubgReportService.getPlayerClips(player.nickname, player.id);
            await this._robot.sendMessage(
                msg.chat.id,
                clips,
                {
                    parse_mode: "HTML",
                }
            );
        });


    }

    private onPlayerChooseCallback(players: TPlayer[]) {
        this._robot.on("callback_query", async (callbackQuery) => {
            console.log("------------------------");
            console.log("Event: Callback Query")
            console.log("------------------------");
            const data = callbackQuery.data as `player-${number}`;

            if (!data?.startsWith('player-')) {
                await  this._robot.answerCallbackQuery(callbackQuery.id, {
                    text: "Wrong Answer"
                });
                return;
            }
            const getQueryOptionIndex = parseInt(data.replace('player-', ''));
            const player = players[getQueryOptionIndex];
            const clips = await this._PubgReportService.getPlayerClips(player.nickname, player.id);

            const maxLen = clips.length;
            const chunkSize = 10;
            const totalResponse = Math.ceil(maxLen / chunkSize);

            const responseChunk = [];

            for (let i = 0; i < totalResponse; i++) {
                responseChunk.push(clips.slice(i * chunkSize, (i + 1) * chunkSize));
            }


            await this._robot.answerCallbackQuery(callbackQuery.id);
            await this._robot.editMessageReplyMarkup({ inline_keyboard: [] }, {
                chat_id: callbackQuery.message!.chat.id,
                message_id: callbackQuery.message!.message_id
            });
            await Promise.all(responseChunk.map(chunk => {
                return this._robot.sendMessage(callbackQuery.message!.chat.id, chunk, {
                    parse_mode: "HTML"
                })
            }))

        })
    }


    register() {
        this.getPlayerPubgReport()
    }
}