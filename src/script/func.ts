/* eslint-disable no-var */
import axios from 'axios';
import type { RankData, Matchinfo } from './data';
//const backendUrl = 'http://localhost:5000';
//const backendUrl = 'https://kktxba.vercel.app';
const backendUrl = 'http://111.229.130.174:5000';

export function getloldata(regin: string, name: string, code: string, start: number = 0, end: number = 0, count: number = 20, type: string = '', queue: number = 0) {
    axios.get(backendUrl + '/api/lol/searchlolbycode/' + regin + ' ' + name + ' ' + ' ' + start + ' ' + count);

}
export async function getlolppuid(regin: string, name: string, code: string): Promise<string> {
    var ans: string = "rejuct";
    try {
        const response = await axios.get(backendUrl + '/api/lol/getppuid/' + regin + '/' + name + '/' + code, { timeout: 5000 });
        ans = response.data.puuid;
    } catch (error) { ans = "rejuct"; }
    return ans;
}
export async function getlolsummerid(message: String): Promise<string> {
    var ans: string = "rejuct";
    try {
        const response = await axios.get(backendUrl + '/api/lol/getsummerid/' + message, { timeout: 5000 });
        ans = response.data.id;
    } catch (error) { ans = "rejuct"; }
    return ans;
}
export async function getlolrankinfo(message: String): Promise<RankData | null> {
    var ans = null;
    try {
        const response = await axios.get(backendUrl + '/api/lol/getrankbysummerid/' + message, { timeout: 5000 });
        ans = response.data[0];
    } catch (error) { ans = null; }
    return ans;
}
export async function getlolmatchlist(message: String, start?: number): Promise<string[] | null> {
    var ans = null;
    try {
        if (start == null) {
            const response = await axios.get(backendUrl + '/api/lol/getmatchlist/' + message, { timeout: 5000 });
            ans = response.data;
        }
        else if (start != null) {
            message += "/start=" + start;
            const response = await axios.get(backendUrl + '/api/lol/getmatchlist/' + message, { timeout: 5000 });
            ans = response.data;
        }
    } catch (error) { ans = null; }
    return ans;
}
export async function getlolmatchinfo(message: String): Promise<Matchinfo | null> {
    var ans = null;
    try {
        const response = await axios.get(backendUrl + '/api/lol/getmatchinfo/' + message, { timeout: 5000 });
        ans = response.data;
    } catch (error) { ans = null; }
    return ans;
}
export function goodexpforriotid(text: string): boolean {
    const inputval = text.split('#');
    if (inputval.length === 2) {
        return true;
    }
    return false;
}
export function getcookie(name: string): string {
    return "";
}
function calculatePlayerScore(
    kills: number,
    deaths: number,
    assists: number,
    cs: number,
    minutes: number,
    playerDamageDealt: number,
    playerDamageTaken: number,
    vision: number,
    totalDamageDealt: number,
    totalDamageTaken: number,
    totalVision: number,
    totalCs: number
): string {
    // 1. 计算 KDA 评分 (占40%)
    const kda = (kills + assists) / (deaths || 1);  // 避免除以零
    const kdaScore = kda > 4 ? 10 : (kda / 4) * 10;  // KDA > 4 得满分，否则根据KDA/4计算

    // 2. 计算 伤害输出评分 (占25%)：根据玩家的伤害占全队伤害的比例来评分
    const damageOutputScore = (playerDamageDealt / totalDamageDealt) * 10;  // 玩家伤害占比全队总伤害

    // 3. 计算 承受伤害评分 (占20%)：承受的伤害越多得分越高
    const damageTakenScore = (playerDamageTaken / totalDamageTaken) * 10;  // 玩家承受伤害占比全队承受伤害

    // 4. 计算 小兵击杀评分 (占10%)：根据玩家的补刀占全队补刀的比例来评分
    const csScore = (cs / totalCs) * 10;  // 玩家补刀占比全队总补刀

    // 5. 计算 视野评分 (占5%)：根据玩家视野占全队视野的比例来评分
    const visionScore = (vision / totalVision) * 10;  // 玩家视野占比全队总视野

    // 综合得分计算：根据每个维度的得分和权重计算总分
    const totalScore = (
        (kdaScore * 0.4) +
        (damageOutputScore * 0.25) +
        (damageTakenScore * 0.2) +
        (csScore * 0.1) +
        (visionScore * 0.05)
    );

    // 保证总得分在0-10之间
    return Math.min(Math.max(totalScore, 1), 10).toFixed(2);
}