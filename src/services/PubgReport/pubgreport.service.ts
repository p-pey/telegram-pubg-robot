import axios from "axios";
import { PubgReportUtility } from "./pubgreport.utility";
import { TPlayer, TStream } from "./types";

export class PubgReportService {

       async getPlayerClips(playerName: string, playerId: string): Promise<string> {
              try {
                     const playerClips = await axios.get<TStream>(`/v1/players/${playerId}/streams`);
                     return PubgReportUtility.convertStreamObjectToString(playerName, playerClips.data)
              } catch (e: any) {
                     console.log(`Error: Get Player Clips:`, e);
                     throw new Error(`Error: ${e.message}`)
              }
       }

       async searchForPlayer(name: string): Promise<TPlayer[]> {
              try {
                     const getPlayerAccount = await axios.get<TPlayer[]>(`/search/${name}`);

                     return getPlayerAccount.data
              } catch (e: any) {
                     console.log(`Error: Search For Player: `, e);
                     throw new Error(`Error: Search For Player: ${e.message}`);
              }
       }



}