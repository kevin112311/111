import axios from 'axios';
import { regin, key } from '../../11.js';

export default async function handler(req, res) {
    console.log("我在处理", req.url)
    const fullUrl = `http://${req.headers.host}${req.url}`;
    const urlObj = new URL(fullUrl);
    const pathname = urlObj.pathname;

    const parts = pathname.split('/');
    const lolcode = parts.slice(4);

    console.log("我在处理", lolcode)
    const [firstPart, secondPart, thridPart] = lolcode.split('/');
    const path = secondPart + '/' + thridPart
    console.log("我在处理", path)
    if (regin.includes(firstPart)) {
        if (firstPart == 'JP') {
            try {
                const response = await axios.get('https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/' + path + '?api_key=' + key, {
                    timeout: 5000  // 设置请求超时为 5 秒
                });
                res.json(response.data);
            } catch (error) {
                res.status(500).send('Something went wrong with the API request');
            }
        }
        else if (firstPart == 'KR') {
            try {
                const response = await axios.get('https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/' + path + '?api_key=' + key, {
                    timeout: 5000  // 设置请求超时为 5 秒
                });
                res.json(response.data);
            } catch (error) {
                res.status(500).send('Something went wrong with the API request');
            }
        }
        else if (firstPart == 'EU') {
            try {
                const response = await axios.get('https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/' + path + '?api_key=' + key, {
                    timeout: 5000  // 设置请求超时为 5 秒
                });
                res.json(response.data);
            } catch (error) {
                res.status(500).send('Something went wrong with the API request');
            }
        }
        else {
            res.status(500);
            res.json({ message: 'wrong spell!' });
        }
    }
    else {
        res.status(500);
        res.json({ message: 'wrong spell!' });
    }
    /*
    res.json({
        "ee": lolcode,
        message: 'Hello'
    });*/
}