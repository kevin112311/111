import axios from 'axios';
import { regin, key } from '../../11.js';
import { console } from 'inspector';

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
    const secondPart = lolcode[1];
    if (regin.includes(firstPart)) {
        if (firstPart == 'JP') {
            try {
                const response = await axios.get('https://jp1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/' + secondPart + '?api_key=' + key, {
                    timeout: 5000  // 设置请求超时为 5 秒
                });
                res.json(response.data);
            } catch (error) {
                res.status(500).send('Something went wrong with the API request');
            }
        }
        else if (firstPart == 'KR') {
            try {
                const response = await axios.get('https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/' + secondPart + '?api_key=' + key, {
                    timeout: 5000  // 设置请求超时为 5 秒
                });
                res.json(response.data);
            } catch (error) {
                res.status(500).send('Something went wrong with the API request');
            }
        }
        else if (firstPart == 'EU') {
            try {
                const response = await axios.get('https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/' + secondPart + '?api_key=' + key, {
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