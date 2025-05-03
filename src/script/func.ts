/* eslint-disable no-var */
import axios from 'axios';
import type { RankData, Matchinfo, phbdata, name, TFTMatchinfo, TFTParticipantDto, Lolsummerdata } from './data';
const backendUrl = 'http://localhost:5000';
//const backendUrl = 'https://kktxba.vercel.app';
//const backendUrl = 'http://111.229.130.174:5000';

export function getloldata(regin: string, name: string, code: string, start: number = 0, end: number = 0, count: number = 20, type: string = '', queue: number = 0) {
    axios.get(backendUrl + '/api/lol/searchlolbycode/' + regin + ' ' + name + ' ' + ' ' + start + ' ' + count);

}
export async function getlolppuid(regin: string, name: string, code: string): Promise<string> {
    var ans: string = "rejuct";
    try {
        const response = await axios.get(backendUrl + '/api/lol/getpuuid/' + regin + '/' + name + '/' + code, { timeout: 5000 });
        ans = response.data.puuid;
        console.log(ans);
        console.log(backendUrl + '/api/lol/getpuuid/' + regin + '/' + name + '/' + code);
    } catch (error) { ans = "rejuct"; }
    return ans;
}
export async function getlolsummerid(message: String): Promise<Lolsummerdata | null> {
    var ans = null;
    try {
        const response = await axios.get(backendUrl + '/api/lol/getsummerid/' + message, { timeout: 5000 });
        if (response.status == 200) {
            ans = response.data;
        }
        else {
            ans = null;
        }
    } catch (error) { ans = null; }
    return ans;
}
export async function getlolsummerids(message: String): Promise<String> {
    var ans: string = "rejuct";
    try {
        const response = await axios.get(backendUrl + '/api/lol/getsummerids/' + message, { timeout: 5000 });
        ans = response.data;
    } catch (error) { ans = "rejuct"; }
    return ans;
}
export async function getlolrankinfo(message: String): Promise<RankData | null | string> {
    var ans = null;
    try {
        const response = await axios.get(backendUrl + '/api/lol/getrankbysummerid/' + message, { timeout: 5000 });
        if (response.status == 200 && !isEmptyObject(response.data)) {
            ans = response.data[0];
        }
        else if (response.status == 200) {
            ans = "";
        }
        else {
            ans = null;
        }
    } catch (error) { ans = null; }
    return ans;
}
export async function gettftrankinfo(message: String): Promise<RankData | null> {
    var ans = null;
    try {
        const response = await axios.get(backendUrl + '/api/tft/getrankbysummerid/' + message, { timeout: 5000 });
        console.log(response);
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
export async function gettftmatchlist(message: String, start?: number): Promise<string[] | null> {
    var ans = null;
    try {
        if (start == null) {
            const response = await axios.get(backendUrl + '/api/tft/getmatchlist/' + message, { timeout: 5000 });
            ans = response.data;
        }
        else if (start != null) {
            message += "/start=" + start;
            const response = await axios.get(backendUrl + '/api/tft/getmatchlist/' + message, { timeout: 5000 });
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
export async function gettftmatchinfo(message: String): Promise<TFTMatchinfo | null> {
    var ans = null;
    try {
        const response = await axios.get(backendUrl + '/api/tft/getmatchinfo/' + message, { timeout: 5000 });
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
export async function getlolphb(): Promise<phbdata | null> {
    var ans = null;
    try {
        const response = await axios.get(backendUrl + '/api/lol/getlolphb');
        ans = response.data;
    } catch (error) { ans = null; }
    return ans;
}
export async function getname(puuid: string): Promise<string> {
    var ans = "";
    try {
        const response = await axios.get(backendUrl + '/api/lol/getname/' + puuid);
        const i: name | null = response.data;
        if (i != null) {
            ans = i.gameName + "   #" + i.tagLine
        }
    } catch (error) { ans = ""; }
    return ans;
}
export async function gettftphb(): Promise<phbdata | null> {
    var ans = null;
    try {
        const response = await axios.get(backendUrl + '/api/tft/gettftphb');
        ans = response.data;
    } catch (error) { ans = null; }
    return ans;
}
export function paixu(list: TFTParticipantDto[]): TFTParticipantDto[] {
    for (let i = 0; i < list.length; i++) {
        for (let j = i; j < list.length; j++) {
            if (list[i].placement > list[j].placement) {
                const temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
        }
    }
    return list;
}
export async function getaiscore(message: string) {
    var ans = "rejuct";
    try {
        const response = await axios.get(backendUrl + '/api/lol/getaiscore/' + message, { timeout: 5000 });
        console.log(response.data);
        ans = response.data;
    } catch (error) { ans = "rejuct"; }
    return ans;
}
function isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0;
}
export async function updateloldata(part1: string | undefined, puuid: string | undefined): Promise<Boolean> {
    if (puuid == undefined || part1 == undefined) {
        return false;
    }
    else {
        try {
            const response = await axios.post(backendUrl + '/api/lol/updateloldata', {
                puuid: puuid,
                part1: part1
            }, { timeout: 5000 });
            if (response.status == 200) {
                window.location.reload();
                return true;
            }
        } catch (error) { console.log("error"); }
    }
    return false;
}

export async function updatetftdata(part1: string | undefined, puuid: string | undefined): Promise<Boolean> {
    if (puuid == undefined || part1 == undefined) {
        return false;
    }
    else {
        try {
            const response = await axios.post(backendUrl + '/api/tft/updatetftdata', {
                puuid: puuid,
                part1: part1
            }, { timeout: 5000 });
            if (response.status == 200) {
                window.location.reload();
                return true;
            }
        } catch (error) { console.log("error"); }
    }
    return false;
}
export async function updatetime(game: string, puuid: string,part1:string): Promise<number | null> {
    switch (game) {
        case "lol": {
            const response = await axios.post(backendUrl + '/api/lol/updateloltime', {
                puuid: puuid,
                part1: part1
            }, { timeout: 5000 });
            if (response.status == 200) {
                return response.data.time;
            }
            break;
        }
        case "tft": {
            const response = await axios.post(backendUrl + '/api/tft/updatetfttime', {
                puuid: puuid,
                part1: part1
            }, { timeout: 5000 });
                return -1;
            break;
        }
    }
    return -1;

}