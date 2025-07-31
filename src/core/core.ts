import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { Commands } from './commands';

export type TBot = TelegramBot;

class Main {
       private _robot!: TBot;
       constructor() {
              this.InitiateRobot();
       }
       private InitiateRobot() {
              dotenv.config();
              import('../services/Axios/Axios')
              const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN!;
              this._robot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

       }
       start() {
              try {
                     console.log("********************* STARTED ***************************")
                     const BotCommands = new Commands(this._robot);
                     BotCommands.registerCommands();
              } catch (e: any) {
                     setInterval(() => {
                            this.InitiateRobot();
                     }, 10000)
                     console.error(`Error: While Start Robot:`, e.message);
              }
       }
}

const Robot = new Main();

Robot.start();

