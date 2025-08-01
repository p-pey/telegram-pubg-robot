
export type TPlayer = {
       id: string
       nickname: string
       shard: "xbox" | 'steam' | 'playstation'
}

export type TStreamerOptionTemplate = `${number}: ${string} - ${string}`

export type TStream = Record<string, TStreamCase[]>;

export type TEvent = "LogPlayerDeath" | "LogPlayerMadeGroggy" | "LogTeammateKill";
export type TMode = "squad-fpp" | "squad-tpp" | "duo-fpp" | "duo-tpp" | 'solo-fpp' | 'solo-tpp'
export type TMap = "DihorOtok_Main" | "Desert_Main" | "Baltic_Main" | "Neon_Main" | "Kiki_Main" | "Tiger_Main" | "Summerland_Main" | "Savage_Main"

export type TStreamCase = {
       AttackID: number;
       DamageCauser: string;
       Date: string;
       Distance: number
       Event: TEvent
       ExpiresAt: number
       ID: string
       Killer: string
       KillerBadges: string[]
       Map: TMap
       MatchID: string;
       MixerID: string;
       Mode: TMode
       Rank: number
       RoundsPlayed: number;
       TimeDiff: string;
       TimeEvent: string
       TwitchID: number;
       Victim: string
       VictimBadges: string[]
       VideoID: string

}