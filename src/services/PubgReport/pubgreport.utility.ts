import {TEvent, TPlayer, TStream, TStreamCase, TStreamerOptionTemplate} from "./types";



export class PubgReportUtility {
       static convertStreamObjectToString(playerName: string, clips: TStream) {
              const keys = Object.keys(clips);
                            const divider = "- - - - - - - - - - - "
              const links = keys.map((key: any) => {

                     const streamerReport = clips[key];
                     let streamerReportLinks = '';

                     streamerReport.forEach((report: TStreamCase) => {
                            const attackId = report.AttackID;
                            const attacher = report.Killer;
                            const victim = report.Victim;
                            const isKnocked = report.Event === "LogPlayerMadeGroggy";
                            const mode = report.Mode;
                            const isDeadByStreamer = victim === playerName;
                            const keyword = isKnocked ? "Knocked" : "Killed";
                            const isTeammatePOV = report.Event === "LogTeammateKill";
                            streamerReportLinks += `${attacher} in mode ${mode} ${keyword} ${victim}${ isTeammatePOV ? "'s Teammate" : "" } <a href='https://pubg.report/matches/${key}/${attackId}'> Watch </a> \n`
                     })
                     return streamerReportLinks
              });
              return links.join(`\n ${ divider } \n`)
       }
       static displayPlayersName(players: TPlayer[]): TStreamerOptionTemplate[] {
              return players.map((player, index) => `${index + 1}: ${player.nickname} - ${player.shard}`) as TStreamerOptionTemplate[];
       }
       static getPlayerReportAsKiller() {

       }
       static getPlayerReportAsVictim() {

       }
       static getStreamerOptionNumber(optionName: `${number}: ${string} - ${string}`) {
              const splited = optionName.split('-');

              console.log(splited);
       }
}