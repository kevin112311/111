import axios from 'axios';
import { regin, key } from '../../11.js';

module.exports = async (req, res) => {
    const lolcode = req.params[0];
    const [firstPart, secondPart] = lolcode.split('/');
    if (regin.includes(firstPart)) {
        if (firstPart == 'JP') {
            try {
                const response = await axios.get('https://asia.api.riotgames.com/lol/match/v5/matches/' + secondPart + '?api_key=' + key, {
                    timeout: 5000  // 设置请求超时为 5 秒
                });
                res.json(response.data);
            } catch (error) {
                res.status(500).send('Something went wrong with the API request');
            }
        }
        else if (firstPart == 'KR') {
            try {
                const response = await axios.get('https://asia.api.riotgames.com/lol/match/v5/matches/' + secondPart + '?api_key=' + key, {
                    timeout: 5000  // 设置请求超时为 5 秒
                });
                res.json(response.data);
            } catch (error) {
                res.status(500).send('Something went wrong with the API request');
            }
        }
        else if (firstPart == 'EU') {
            try {
                const response = await axios.get('https://europe.api.riotgames.com/lol/match/v5/matches/' + secondPart + '?api_key=' + key, {
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