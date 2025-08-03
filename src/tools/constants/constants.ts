import { TMap, TWeapon } from "../../services/PubgReport/types";

export const TEMPLATE_DIVIDER = "- - - - - - - - - - - "


export const icons = {
    clock: '⏰',
    hourglass: '⏳',
    check: '✅',
    cross: '❌',
    warning: '⚠️',
    info: 'ℹ️',
    star: '⭐',
    heart: '❤️',
    flag: '🏁',
    pencil: '✏️',
    trash: '🗑️',
    search: '🔍',
    settings: '⚙️',
    mail: '✉️',
    lock: '🔒',
    unlock: '🔓',
    eye: '👁️',
    calendar: '📅',
    bell: '🔔',
    game: '🎮',
    lightning: '⚡',
    arrowLeft: '⬅️',
    death: '💀',
    'win': '🏆',
    'knife': '🗡️',
    'map': '🗺️'
};

export const WEAPONS: Record<TWeapon, string> = {
    "WeapCrossbow_1_C": "Crossbow",
    "Mortar_Projectile_C": "Mortar",
    "WeapBerylM762_C": "Beryl M762",
    "WeapAUG_C": "Aug",
    "WeapUMP_C": "Ump",
    "WeapAK47_C": "Akm",
    "WeapWinchester_C": "Win98",
    "WeapUZI_C": "Uzi",
    "WeapMk12_C": "MK12",
    "WeapDragunov_C": "Dragunov",
    "ProjGrenade_C": "Grenade",
    "WeapHK416_C": "M416",
    "WeapG36C_C": "G36",
    "WeapMP9_C": "MP9",
    "WeapM249_C": "M249"
} as const;

export const MAPS: Record<TMap, string> = {
    Baltic_Main: "",
    Desert_Main: "Miramar",
    Tiger_Main: "",
    DihorOtok_Main: "",
    Kiki_Main: "",
    Neon_Main: "",
    Savage_Main: "",
    Summerland_Main: ""
}