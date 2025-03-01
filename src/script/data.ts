export interface RankData {
    leagueId: string;
    queueType: string;
    tier: string;
    rank: string;
    summonerId: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;
    hotStreak: boolean;
}
export interface Matchinfo {
    metadata: MetadataDto;
    info: InfoDto;
}
interface MetadataDto {
    dataVersion: string;
    matchId: string;
    participants: string[];
}
interface InfoDto {
    participants: ParticipantDto[];
    teams: TeamDto[];
    gameEndTimestamp: number;
    gameDuration: number;
}

export interface ParticipantDto {
    allInPings: number;
    assistMePings: number;
    assists: number;
    baronKills: number;
    bountyLevel: number;
    champLevel: number;
    championId: number;
    championName: string;
    deaths: number;
    doubleKills: number;
    dragonKills: number;
    lane: string;
    neutralMinionsKilled: number;
    nexusKills: number;
    pentaKills: number;
    goldEarned: number;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    kills: number;
    physicalDamageDealtToChampions: number;
    magicDamageDealtToChampions: number;
    totalDamageDealtToChampions: number;
    totalDamageTaken: number;
    riotIdGameName: string;
    riotIdTagline: string;
    puuid: string;
    role: string;
    summonerLevel: number;
    tripleKills: number;
    turretKills: number;
    win: boolean;
    visionScore: number;
}


interface Objectives {
    baron: {
        first: boolean;
        kills: number;
    };
    champion: {
        first: boolean;
        kills: number;
    };
    dragon: {
        first: boolean;
        kills: number;
    };
    horde: {
        first: boolean;
        kills: number;
    };
    inhibitor: {
        first: boolean;
        kills: number;
    };
    riftHerald: {
        first: boolean;
        kills: number;
    };
    tower: {
        first: boolean;
        kills: number;
    };
}

interface TeamDto {
    bans: string[];
    objectives: Objectives;
    teamId: number;
    win: boolean;
}
interface ZhushouRankMatchDto {
    matchId: string;               // 比赛ID，字符串类型
    score: string;                 // 评分，字符串类型
    kda: string;                   // KDA（击杀/死亡/助攻），字符串类型
    csPerMinute: string;           // 分均补刀，字符串类型
    damageTakenPerMinute: string;  // 分均承伤，字符串类型
    damageDealtPerMinute: string;  // 分均伤害，字符串类型
    goldPerMinute: string;         // 分均经济，字符串类型
    dragonKills: string;           // 小龙数量，字符串类型
    riftHeraldKills: string;       // 巢虫数量，字符串类型
    baronKills: string;            // 大龙数量，字符串类型
    ancientDragonKills: string;    // 远古龙数量，字符串类型
}
interface ZhushouRankallDto {
    puuid: string;
    score: string;
    time: Date;
}