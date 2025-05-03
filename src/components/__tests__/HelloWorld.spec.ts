import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'
import LolShowtier from '../../views/lol/rankdiv/showtier.vue'
import Showmatchs from '../../views/lol/rankdiv/showmatchs.vue'
import Matchoverview from '../../views/lol/rankdiv/matchoverview.vue'
import { getlolppuid, getlolsummerid, getlolrankinfo, getlolsummerids, getname } from '@/script/func'
import type { RankData } from '@/script/data'
/*
describe('getlolppuid 真实API测试', () => {
  it('应返回正确的puuid', async () => {
    // 这是真实的API调用，需要后端服务可用
    const puuid = await getlolppuid('KR', 'Heart', 'KR1');

    expect(puuid).toBe('swOsOKPp4-lawFnNrwQlLGnmYKw5uFcJmZReBuAD0fu1zoB-G9uvTIuZVoBmyEmuDgBgDza3YNHJaQ');
  });
});

describe('getlolsummerid 真实API测试', () => {
  it('应返回正确的summerid', async () => {
    // 这是真实的API调用，需要后端服务可用
    const puuid = await getlolsummerid('KR' + '/' + 'swOsOKPp4-lawFnNrwQlLGnmYKw5uFcJmZReBuAD0fu1zoB-G9uvTIuZVoBmyEmuDgBgDza3YNHJaQ');
    let id = '';
    if (puuid != null && puuid !== undefined) {
      id = puuid.id;
    }
    expect(id).toBe('6Ae1bqenvcmuapTpQFJfC5ZN7dqTHmzVSNVynf8FlYHA8A');
  });
});
describe('getlolsummerids 真实API测试', () => {
  it('应返回正确的summerid', async () => {
    // 这是真实的API调用，需要后端服务可用
    const puuid = await getlolsummerids('KR' + '/' + 'swOsOKPp4-lawFnNrwQlLGnmYKw5uFcJmZReBuAD0fu1zoB-G9uvTIuZVoBmyEmuDgBgDza3YNHJaQ');

    expect(puuid).toBe('6Ae1bqenvcmuapTpQFJfC5ZN7dqTHmzVSNVynf8FlYHA8A');
  });
});
describe('getname 真实API测试', () => {
  it('应返回正确的name', async () => {
    // 这是真实的API调用，需要后端服务可用
    const puuid = await getname('swOsOKPp4-lawFnNrwQlLGnmYKw5uFcJmZReBuAD0fu1zoB-G9uvTIuZVoBmyEmuDgBgDza3YNHJaQ');
    console.log(puuid);
    expect(puuid).toBe('Heart   #KR1');
  });
});

describe('getlolrankinfo 真实API测试', () => {
  it('应返回正确的rankinfo', async () => {
    // 这是真实的API调用，需要后端服务可用
    const rankdata = await getlolrankinfo('KR' + '/' + 'swOsOKPp4-lawFnNrwQlLGnmYKw5uFcJmZReBuAD0fu1zoB-G9uvTIuZVoBmyEmuDgBgDza3YNHJaQ');
    const mockResponseData =
    {
      "leagueId": "1483f467-de64-33f6-9459-c27a04b83c54",
      "queueType": "RANKED_SOLO_5x5",
      "tier": "MASTER",
      "rank": "I",
      "summonerId": "6Ae1bqenvcmuapTpQFJfC5ZN7dqTHmzVSNVynf8FlYHA8A",
      "puuid": "swOsOKPp4-lawFnNrwQlLGnmYKw5uFcJmZReBuAD0fu1zoB-G9uvTIuZVoBmyEmuDgBgDza3YNHJaQ",
      "leaguePoints": 445,
      "wins": 337,
      "losses": 327,
      "veteran": false,
      "inactive": false,
      "freshBlood": false,
      "hotStreak": false
    };
    expect(rankdata).toEqual(mockResponseData);
  });
});
// 模拟图标导入
vi.mock('@/assets/pic/Season_2023_-_Bronze.webp', () => ({
  default: '/mocks/bronze.webp'
}))
vi.mock('@/assets/pic/Season_2023_-_Silver.webp', () => ({
  default: '/mocks/silver.webp'
}))
vi.mock('@/assets/pic/Season_2023_-_Gold.webp', () => ({
  default: '/mocks/gold.webp'
}))
vi.mock('@/assets/pic/Season_2023_-_Platinum.webp', () => ({
  default: '/mocks/platinum.webp'
}))
vi.mock('@/assets/pic/Season_2023_-_Diamond.webp', () => ({
  default: '/mocks/diamond.webp'
}))
vi.mock('@/assets/pic/Season_2023_-_Master.webp', () => ({
  default: '/mocks/master.webp'
}))
vi.mock('@/assets/pic/Season_2023_-_Grandmaster.webp', () => ({
  default: '/mocks/grandmaster.webp'
}))
vi.mock('@/assets/pic/Season_2023_-_Challenger.webp', () => ({
  default: '/mocks/challenger.webp'
}))

*/


describe('LolShowtier.vue - 完整测试套件', () => {
  // 基础props数据
  const baseProps = {
    tier: 'GOLD',
    rank: 'I',
    losses: 20,
    wins: 30,
    name: 'PlayerOne',
    code: '1234',
    leaguePoints: 100
  }

  // 测试组件渲染和基本结构
  describe('组件渲染测试', () => {
    it('正确渲染组件整体结构', () => {
      const wrapper = mount(LolShowtier, { props: baseProps })

      // 验证主要容器和子元素
      expect(wrapper.find('.rankbar').exists()).toBe(true)
      expect(wrapper.find('.mid-headicon').exists()).toBe(true)
      expect(wrapper.find('.rankdiv').exists()).toBe(true)
      expect(wrapper.find('.icontierdiv').exists()).toBe(true)
      expect(wrapper.find('.loltiermidshow').exists()).toBe(true)
      expect(wrapper.find('.smalltext').exists()).toBe(true)
    })

    it('正确显示玩家名称和标签', () => {
      const wrapper = mount(LolShowtier, { props: baseProps })
      expect(wrapper.find('.mid-headicon p').text()).toBe('PlayerOne#1234')

      // 测试长名称和代码
      const longNameWrapper = mount(LolShowtier, {
        props: {
          ...baseProps,
          name: 'VeryLongPlayerNameWithSpecialChars@123',
          code: '9999'
        }
      })
      expect(longNameWrapper.find('.mid-headicon p').text())
        .toBe('VeryLongPlayerNameWithSpecialChars@123#9999')
    })

    it('始终显示SOLO/DUO模式标识', () => {
      const wrapper = mount(LolShowtier, { props: baseProps })
      expect(wrapper.find('.rankdiv > div:first-child p').text()).toBe('SOLO/DUO')
    })
  })

  // 段位图标和显示测试
  describe('段位图标和显示测试', () => {
    const tierTestCases = [
      { tier: 'BRONZE', expectedIcon: '/src/assets/pic/Season_2023_-_Bronze.webp', rank: 'IV', expectedText: 'BRONZE IV' },
      { tier: 'SILVER', expectedIcon: '/src/assets/pic/Season_2023_-_Silver.webp', rank: 'III', expectedText: 'SILVER III' },
      { tier: 'GOLD', expectedIcon: '/src/assets/pic/Season_2023_-_Gold.webp', rank: 'II', expectedText: 'GOLD II' },
      { tier: 'PLATINUM', expectedIcon: '/src/assets/pic/Season_2023_-_Platinum.webp', rank: 'I', expectedText: 'PLATINUM I' },
      { tier: 'DIAMOND', expectedIcon: '/src/assets/pic/Season_2023_-_Diamond.webp', rank: 'IV', expectedText: 'DIAMOND IV' },
      { tier: 'MASTER', expectedIcon: '/src/assets/pic/Season_2023_-_Master.webp', rank: 'I', expectedText: 'MASTER' },
      { tier: 'GRANDMASTER', expectedIcon: '/src/assets/pic/Season_2023_-_Grandmaster.webp', rank: 'I', expectedText: 'GRANDMASTER' },
      { tier: 'CHALLENGER', expectedIcon: '/src/assets/pic/Season_2023_-_Challenger.webp', rank: 'I', expectedText: 'CHALLENGER' }
    ]

    tierTestCases.forEach(({ tier, expectedIcon, rank, expectedText }) => {
      it(`正确显示${tier}段位(rank: ${rank})`, () => {
        const wrapper = mount(LolShowtier, {
          props: { ...baseProps, tier, rank }
        })

        // 验证图标
        const img = wrapper.find('.icontierdiv img')
        expect(img.attributes('src')).toBe(expectedIcon)
        expect(img.attributes('alt')).toBe(tier)
        expect(img.attributes('width')).toBe('72')

        // 验证段位文本
        const tierText = wrapper.find('.loltiermidshow p:first-child').text()
        expect(tierText).toBe(expectedText)
      })
    })
  })

  // 胜点和胜负数据显示测试
  describe('游戏数据展示测试', () => {
    it('正确显示胜点(LP)', () => {
      const testCases = [
        { lp: 100, expected: '100points' },
        { lp: 0, expected: '0points' },
        { lp: 999, expected: '999points' }
      ]

      testCases.forEach(({ lp, expected }) => {
        const wrapper = mount(LolShowtier, {
          props: { ...baseProps, leaguePoints: lp }
        })
        expect(wrapper.find('.loltiermidshow p:nth-child(2)').text()).toBe(expected)
      })
    })

    it('正确显示胜负场次', () => {
      const testCases = [
        { wins: 30, losses: 20, expected: 'W: 30 L: 20' },
        { wins: 0, losses: 10, expected: 'W: 0 L: 10' },
        { wins: 100, losses: 0, expected: 'W: 100 L: 0' },
        { wins: 999, losses: 999, expected: 'W: 999 L: 999' }
      ]

      testCases.forEach(({ wins, losses, expected }) => {
        const wrapper = mount(LolShowtier, {
          props: { ...baseProps, wins, losses }
        })
        expect(wrapper.find('.smalltext span:first-child').text()).toBe(expected)
      })
    })
  })

  // 胜率计算测试
  describe('胜率计算逻辑测试', () => {
    const winRateTestCases = [
      { wins: 30, losses: 20, expected: '60%' },  // 正常情况
      { wins: 1, losses: 1, expected: '50%' },    // 平局
      { wins: 0, losses: 10, expected: '0%' },    // 全败
      { wins: 10, losses: 0, expected: '100%' },  // 全胜
      { wins: 0, losses: 0, expected: '0%' },     // 无比赛
      { wins: 3, losses: 7, expected: '30%' },    // 小数向下取整
      { wins: 7, losses: 3, expected: '70%' },    // 小数向上取整
      { wins: 333, losses: 667, expected: '33%' } // 大量比赛
    ]

    winRateTestCases.forEach(({ wins, losses, expected }) => {
      it(`计算${wins}胜${losses}负的胜率为${expected}`, () => {
        const wrapper = mount(LolShowtier, {
          props: { ...baseProps, wins, losses }
        })
        expect(wrapper.find('.smalltext span:last-child').text()).toBe(expected)
      })
    })
  })
})