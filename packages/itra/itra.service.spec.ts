import { getItraScore, getRunnersId } from './itra.service';

describe('ITRA "API"', () => {
    test('returns runnerId', async () => {
        const runnerId = await getRunnersId(
            {
                firstName: 'Georg',
                lastName: 'Fichtinger',
            }, 
            {
                url: 'https://www.itra.run',
                header: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
                },
            }
        )
        expect(runnerId).toEqual('4571405')
    });
    test('returns itraScore', async () => {
        const itraScore = await getItraScore(
            {
                firstName: 'Georg',
                lastName: 'Fichtinger',
                runnerId: '4571405',
            },
            {
                url: 'https://www.itra.run',
                header: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
                },
            }
        )
        expect(itraScore).toEqual(494)
    });
});
