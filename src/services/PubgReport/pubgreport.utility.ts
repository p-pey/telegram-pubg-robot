import { TPlayer, TStream, TStreamerOptionTemplate } from "./types";



export class PubgReportUtility {
       static convertStreamObjectToString(playerName: string, clips: TStream) {
              const keys = Object.keys(clips);
              const links = keys.map((key: any) => {

                     const streamerReport = clips[key];
                     let streamerReportLinks = '';

                     streamerReport.forEach((report: any) => {
                            const attackId = report.AttackID;
                            const attacher = report.Killer;
                            const victim = report.Victim;
                            const isKnocked = report.Event === "LogPlayerMadeGroggy";
                            const mode = report.Mode;
                            const isDeadByStreamer = victim === playerName;
                            const keyword = isKnocked && isDeadByStreamer ? "You Were Knocked by" : isKnocked && !isDeadByStreamer ? "You Knocked" : !isKnocked && isDeadByStreamer ? "You Killed by" : "You Killed"
                            streamerReportLinks += `${attacher} in mode ${mode} ${keyword} ${isDeadByStreamer ? attacher : victim} <a href='https://pubg.report/matches/${key}/${attackId}'> Watch </a> \n`
                     })
                     return streamerReportLinks
              });
              return links
       }
       static displayPlayersName(players: TPlayer[]): TStreamerOptionTemplate[] {
              return players.map((player, index) => `${index + 1}: ${player.nickname} - ${player.shard}`) as TStreamerOptionTemplate[];
       }
       static getStreamerOptionNumber(optionName: `${number}: ${string} - ${string}`) {
              const splited = optionName.split('-');

              console.log(splited);
       }
}