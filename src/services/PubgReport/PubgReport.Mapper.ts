import dedent from "dedent";
import { icons } from "../../tools/constants/constants";
import { TStream, TStreamCase } from "./types";


export class PubgReportMapper {
    static mapStreamObjectToString(playerName: string, clips: TStream): string[] {
        const keys = Object.keys(clips);
        const links = keys.map((key: string) => {
            const streamerReport = clips[key];
            let streamerReportLinks: string[] = [];

            streamerReport.forEach((report: TStreamCase) => {
                const attackId = report.AttackID;
                const attacher = report.Killer;
                const victim = report.Victim;
                const isKnocked = report.Event === "LogPlayerMadeGroggy";
                const mode = report.Mode;
                const isDeadByStreamer = victim === playerName;
                const keyword = isKnocked ? "Knocked out" : "Killed";
                const isTeammatePOV = report.Event === "LogTeammateKill";
                const streamerName = isDeadByStreamer ? attacher : victim;
                let streamReport = '';
                streamReport += dedent`${icons.clock} ${report.Date}\n`
                streamReport += dedent`${isDeadByStreamer ? icons.death : icons.win} ${streamerName}\n`
                streamReport += dedent`${icons.lightning} ${attacher} ${(isTeammatePOV && !isDeadByStreamer) ? "'s Teammate" : ''} in mode ${mode} ${keyword} ${victim}${(isTeammatePOV && isDeadByStreamer) ? "'s Teammate" : ""}\n`

                if (report.DamageCauser) streamReport += dedent(icons.knife + " " + report.DamageCauser + '\n');
                streamReport += dedent(`\n<a href='${process.env.PUBG_REPORT_WEBSITE_BASE_URL}/${key}/${attackId}'> Watch </a>`)

                streamerReportLinks.push(streamReport);
            })
            return streamerReportLinks
        });
        return links.flat()
    }
}