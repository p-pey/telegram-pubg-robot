
export type TPlayer = {
       id: string
       nickname: string
       shard: "xbox" | 'steam' | 'playstation'
}

export type TStreamerOptionTemplate = `${number}: ${string} - ${string}`

export type TStream = Record<string, TStreamCase[]>;

export type TEvent = "LogPlayerDeath" | "LogPlayerMadeGroggy";
export type TMode = "squad-fpp" | "squad-tpp" | "duo-fpp" | "duo-tpp" | 'solo-fpp' | 'solo-tpp'

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
       Map: string
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