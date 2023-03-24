import { getParticipants } from './timenow.service';

describe('Getting participants from TimeNow ', () => {
    test('returns valid list', async () => {
        const participants = await getParticipants({
            url : 'https://my2.raceresult.com/195185/RRPublish/data/list?key=27218262242b8799b75f46b6b98c5780&listname=TEILNEHMERLISTE%20WEBSITE%7CTNL%20123%20-%2001%20Gesamt&page=participants&contest=0&r=all&l=0',
            race: '#1_ULTRA TRAIL (54,5 km)'
        })
        expect(participants.length).toBeGreaterThan(0);
    });
});
