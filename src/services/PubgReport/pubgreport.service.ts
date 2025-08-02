import axios, { Axios } from "axios";
import { PubgReportMapper } from "./PubgReport.Mapper";
import { TPlayer, TStream } from "./types";


export class PubgReportService {
       private readonly _AXIOS: Axios
       constructor() {
              this._AXIOS = axios.create({
                     baseURL: process.env.PUBG_REPORT_API_BASE_URL
              })
       }

       async getPlayerClips(playerName: string, playerId: string): Promise<string[]> {
              try {
                     const playerClips = await this._AXIOS.get<TStream>(`/v1/players/${playerId}/streams`);
                     return PubgReportMapper.mapStreamObjectToString(playerName, playerClips.data)
              } catch (e: any) {
                     console.log(`Error: Get Player Clips:`, e);
                     throw new Error(`Error: ${e.message}`)
              }
       }

       async searchForPlayer(name: string): Promise<TPlayer[]> {
              try {
                     const getPlayerAccount = await this._AXIOS.get<TPlayer[]>(`/search/${name}`);

                     return getPlayerAccount.data
              } catch (e: any) {
                     console.log(`Error: Search For Player: `, e);
                     throw new Error(`Error: Search For Player: ${e.message}`);
              }
       }



}