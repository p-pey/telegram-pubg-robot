import { InlineKeyboardButton } from "node-telegram-bot-api";
import { TPlayer, TStreamerOptionTemplate, TWeapon } from "../../../services/PubgReport/types";
import { icons, TEMPLATE_DIVIDER, WEAPONS } from "../../../tools/constants/constants";



export class PubgReportUtility {
       static calculatePagination(totalLength: number, chunkSize: number, currentPage: number, position: "next" | "prev"): { remainingLen: number, nextPage: number; isPreviousPage: boolean; range: { from: number, to: number } } {
              const isNextPage = ((currentPage + 1) & chunkSize) < totalLength;
              const isPreviousPage = currentPage !== 1;


              const nextPage = position === 'next' ? isNextPage ? currentPage : currentPage : isPreviousPage ? currentPage : currentPage;
              const remainingLen = totalLength - (currentPage * chunkSize);
              const range = {
                     from: (currentPage * chunkSize) - chunkSize,
                     to: currentPage * chunkSize
              }
              return {
                     nextPage,
                     remainingLen: remainingLen < 0 ? 0 : remainingLen,
                     isPreviousPage,
                     range
              }
       }
       static paginationInlineKeyboardGenerator(args: { remainLen: number; isNext: boolean; isPrev: boolean; currentPage: number }, playerName: string): InlineKeyboardButton[] {

              switch (true) {
                     case args.remainLen > 0: {
                            const inlineKeyboard = [
                                   { text: `${icons.arrowLeft} Next (${args.remainLen})`, callback_data: `/player ${playerName}:next:${args.currentPage + 1}` }
                            ];
                            if (args.isPrev) {
                                   inlineKeyboard.push({ text: `${icons.arrowLeft} Prev`, callback_data: `/player ${playerName}:prev:${args.currentPage - 1}` });
                            }
                            return inlineKeyboard
                     };
                     case !args.isNext && args.isPrev: {
                            return [
                                   { text: `${icons.arrowLeft} Prev`, callback_data: `prev-${args.currentPage - 1}` }
                            ]
                     };
                     default: return [];
              }
       }
       static sliceClipsBasedOnPaginationData(clips: string[], paginatedData: {
              remainingLen: number;
              nextPage: number;
              isPreviousPage: boolean;
              range: {
                     from: number;
                     to: number;
              }
       }) {
              const removeWhiteSpaces = clips.filter(Boolean);
              return removeWhiteSpaces.slice(paginatedData.range.from, paginatedData.range.to).join(`\n${TEMPLATE_DIVIDER} \n`)
       }
       static displayPlayersName(players: TPlayer[]): TStreamerOptionTemplate[] {
              return players.map((player, index) => `${index + 1}: ${player.nickname} - ${player.shard}`) as TStreamerOptionTemplate[];
       }
       static getPlayerReportAsKiller() {

       }
       static getPlayerReportAsVictim() {

       }

       static getFamiliarMapName() {

       }
       static getFamiliarGunName(weapon: TWeapon) {
              return WEAPONS[weapon] ?? weapon
       }
       static calculateResponseChunk(clips: string) {
              const clipsArray = clips.split('\n');
              const maxLen = clipsArray.length;
              const chunkSize = 9;
              const totalResponse = Math.ceil(maxLen / chunkSize);

              const responseChunk: string[][] = [];

              for (let i = 0; i < totalResponse; i++) {
                     responseChunk.push(clipsArray.slice(i * chunkSize, (i + 1) * chunkSize));
              }
              return responseChunk
       }

}