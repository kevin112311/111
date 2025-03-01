
function getloldata(regin, name, code, start: number = 0, count: number = 20) {    
}

function goodexpforriotid(text): boolean {
    const inputval = text.split('#');
    if (inputval.length === 2) {
        if (!isNaN(Number(inputval[1]))) {
            return true;
        }
    }
    return false;
}
export { getcookie, getloldata, goodexpforriotid };
/*
fetch('https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/x28EfZSWa3tX99bX1dIQSDnxecxkIrkvam_GHl3BUQXWwNiq94fLE19NswNSa4kWYhEQ7fl2drjiiw/ids?start=0&count=20&api_key=RGAPI-ea648efd-0bc3-4621-85ee-f029d9d3b3b6',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        }
    )
        .then(response => {
            if (response.ok) {
                console.log('请求成功，响应:', response.ok);
            }
        })
        .then(data => {
            console.log('请求成功，响应:', data==null);
        })
        .catch(error => {
            console.error('跨域请求失败:', error);
        });
 */