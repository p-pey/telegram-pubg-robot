import { PubgReportService } from "../../../services/PubgReport/Pubgreport.service";
import { TBot } from "../../core";
import { ICommand } from "../index";
import { PubgReportUtility } from "./Pubgreport.utility";


export class PubgReportCommand implements ICommand {
    private _robot: TBot;
    private _PubgReportService: PubgReportService;
    constructor(Bot: TBot) {
        this._robot = Bot;

        this._PubgReportService = new PubgReportService();
    }
    private getPlayerPubgReport() {
        this._robot.onText(/^\/player\s[\w\s\-_]+$/, async (msg) => {
            try {
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
                if (players.length === 0) {
                    await this._robot.sendMessage(
                        msg.chat.id,
                        '<b>Player Not Found</b>',
                        {
                            message_thread_id: msg.chat.id,
                            parse_mode: "HTML"
                        }
                    );
                    return;
                }

                const player = players[0];
                const chunkSize = 10;
                const clips = await this._PubgReportService.getPlayerClips(player.nickname, player.id);
                const paginatedData = PubgReportUtility.calculatePagination(clips.length, chunkSize, 1, 'next');
                const inlineKeyboardOptions = PubgReportUtility.paginationInlineKeyboardGenerator({
                    currentPage: 1,
                    isNext: paginatedData.remainingLen > 0,
                    isPrev: paginatedData.isPreviousPage,
                    remainLen: paginatedData.remainingLen,
                }, player.nickname);

                await this._robot.sendMessage(msg.chat.id, PubgReportUtility.sliceClipsBasedOnPaginationData(clips, paginatedData), {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [inlineKeyboardOptions]
                    }
                })
            } catch (e: any) {
                console.log(`Error: Get Player Report:`, e);
                this._robot.sendMessage(
                    msg.chat.id,
                    '<b> Not Found </b>',
                    {
                        parse_mode: "HTML"
                    }
                );
            }
        });

    }
    private onPlayerChooseCallback() {
        this._robot.on("callback_query", async (callbackQuery) => {
            try {

                console.log("------------------------");
                console.log("Event: Callback Query")
                console.log("------------------------");
                console.log(callbackQuery.data)
                const data = callbackQuery.data as `/player ${string}:${"next" | "prev"}:${number}`;
                const callbackQueryDataRegexp = /^\/player\s[\w\-\:\s]+$/;
                if (!callbackQueryDataRegexp?.test(data)) {
                    await this._robot.answerCallbackQuery(callbackQuery.id, {
                        text: "Wrong Answer"
                    });
                    return;
                }
                const value = data.replace('/player', '').trim() as `${string}:${"next" | "prev"}:${number}`;
                const [playerName, position, pageNumber] = value.split(':');

                const players = await this._PubgReportService.searchForPlayer(playerName);
                if (players.length === 0) {
                    await this._robot.sendMessage(
                        callbackQuery.message!.chat.id,
                        '<b>Player Not Found</b>',
                        {
                            message_thread_id: callbackQuery.message!.chat.id,
                            parse_mode: "HTML"
                        }
                    );
                    return;
                }

                const player = players[0];
                const chunkSize = 10;
                const clips = await this._PubgReportService.getPlayerClips(player.nickname, player.id);
                const paginatedData = PubgReportUtility.calculatePagination(clips.length, chunkSize, parseInt(pageNumber), position as 'next' | 'prev');

                const inlineKeyboardOptions = PubgReportUtility.paginationInlineKeyboardGenerator({
                    currentPage: parseInt(pageNumber),
                    isNext: paginatedData.remainingLen > 0,
                    isPrev: paginatedData.isPreviousPage,
                    remainLen: paginatedData.remainingLen,
                }, player.nickname);


                await this._robot.answerCallbackQuery(callbackQuery.id);
                await this._robot.sendMessage(callbackQuery.message!.chat.id, PubgReportUtility.sliceClipsBasedOnPaginationData(clips, paginatedData), {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [inlineKeyboardOptions],
                    }
                })
            } catch (e: any) {
                await this._robot.sendMessage(callbackQuery.message!.chat.id, e.message, {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [],
                    }
                })
            }
        });


    }


    register() {
        this.getPlayerPubgReport();
        this.onPlayerChooseCallback()
    }
}