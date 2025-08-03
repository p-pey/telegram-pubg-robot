import { ICommand } from "..";
import { PlayerSettingService } from "../../../services/PlayerSetting/PlayerSeting.service";
import { TBot } from "../../core";




export class PlayerSetting implements ICommand {
       private _robot: TBot;
       private _playerSettingService: PlayerSettingService;

       constructor(bot: TBot) {
              this._robot = bot;
              this._playerSettingService = new PlayerSettingService();
       }

       private getPlayerSettings() {

              this._robot.onText(/^\/setting\s[\w\-]+$/, async (msg) => {
                     try {
                            console.log("------------------------");
                            console.log("Event: Get Settings")
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
                            const pubgName = text.replace('/setting', '').trim().toLowerCase();

                            const settings = await this._playerSettingService.getPlayerSettings(pubgName);

                            if (settings.photoUrl) {
                                   await this._robot.sendPhoto(msg.chat.id, settings.photoUrl, {
                                          caption: settings.caption,
                                          parse_mode: 'Markdown'
                                   });
                            } else {
                                   await this._robot.sendMessage(msg.chat.id, settings.caption, {
                                          parse_mode: 'Markdown',
                                          disable_web_page_preview: true
                                   });
                            }


                     } catch (e: any) {
                            this._robot.sendMessage(msg.chat.id, e.messages);
                     }
              })
       }

       register() {
              this.getPlayerSettings();
       }
}