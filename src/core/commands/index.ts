
import { TBot } from "../core";
import { PubgReportCommand } from "./PubgReport/PubgReport.command";

export interface ICommand {
       register:()=> void;
}

export class Commands {

       private readonly _robot: TBot;
       constructor(Bot: TBot) {
              this._robot = Bot;
       }
       registerCommands() {
             new PubgReportCommand(this._robot).register()

       }
}