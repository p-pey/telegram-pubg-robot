
export type TPlayer = {
       id: string
       nickname: string
       shard: "xbox" | 'steam' | 'playstation'
}

export type TStreamerOptionTemplate = `${number}: ${string} - ${string}`

export type TStream = Record<string, TStreamCase[]>;

export type TEvent = "LogPlayerDeath" | "LogPlayerMadeGroggy" | "LogTeammateKill";
export type TMode = "squad-fpp" | "squad-tpp" | "duo-fpp" | "duo-tpp" | 'solo-fpp' | 'solo-tpp'
export type TMap = "DihorOtok_Main" | "Desert_Main" | "Baltic_Main" | "Neon_Main" | "Kiki_Main" | "Tiger_Main" | "Summerland_Main" | "Savage_Main";
export type TWeapon = "WeapCrossbow_1_C" | "Mortar_Projectile_C" | "WeapBerylM762_C" | "WeapAUG_C" | "WeapUMP_C" | "WeapAK47_C" | "WeapWinchester_C" | "WeapUZI_C" | "WeapMk12_C" | "WeapDragunov_C" | "ProjGrenade_C" | "WeapHK416_C" | "WeapG36C_C" | "WeapMP9_C" | "WeapM249_C"

export type TStreamCase = {
       AttackID: number;
       DamageCauser: TWeapon;
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