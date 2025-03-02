import axios from 'axios';
import { regin, key } from '../../11.js';

export default async function handler(req, res) {
    const fullUrl = `http://${req.headers.host}${req.url}`;
    const urlObj = new URL(fullUrl);
    const pathname = urlObj.pathname;
    console.log(pathname);
    const parts = pathname.split('/');
    console.log(parts);
    const lolcode = parts.slice(4);
    console.log(lolcode);
    const firstPart = lolcode[0];
    var mess = lolcode[1] + '/ids?';
    if (lolcode.length >= 3) {
        mess += lolcode[2] + '&';
    }
    if (regin.includes(firstPart)) {
        if (firstPart == 'JP') {
            try {
                const response = await axios.get('https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/' + mess + 'api_key=' + key, {
                    timeout: 5000  // 设置请求超时为 5 秒
                });
                res.json(response.data);
            } catch (error) {
                res.status(500).send('Something went wrong with the API request');
            }
        }
        else if (firstPart == 'KR') {
            try {
                const response = await axios.get('https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/' + mess + 'api_key=' + key, {
                    timeout: 5000  // 设置请求超时为 5 秒
                });
                res.json(response.data);
            } catch (error) {
                res.status(500).send('Something went wrong with the API request');
            }
        }
        else if (firstPart == 'EU') {
            try {
                const response = await axios.get('https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/' + mess + 'api_key=' + key, {
                    timeout: 5000  // 设置请求超时为 5 秒
                });
                res.json(response.data);
            } catch (error) {
                res.status(500).send('Something went wrong with the API request');
            }
        }
        else {
            res.status(500);
            res.json({ message: 'wrong regin!' });
        }
    }
    else {
        res.status(500);
        res.json({ message: 'wrong spell!' });
    }
}