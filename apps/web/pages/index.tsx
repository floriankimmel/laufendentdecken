import { getRunnersId, getItraScore } from "itra";
import { getParticipants, Participant } from "timenow"; 
import * as React from 'react';
import { ItraRunner } from "itra/itra.interfaces";

interface Runner extends ItraRunner {
    itraScore: number;
    url: string;
}

export default function Web() {
    const [runners, setRunners] = React.useState<Runner[]>([]);

    React.useEffect(() => {
        const fetchRunners = async () => {
            const participants = await getParticipants({
                url : 'https://my2.raceresult.com/195185/RRPublish/data/list?key=27218262242b8799b75f46b6b98c5780&listname=TEILNEHMERLISTE%20WEBSITE%7CTNL%20123%20-%2001%20Gesamt&page=participants&contest=0&r=all&l=0',
                race: '#2_SUPER TRAIL (34 km)'
            })
            const itraRunners: Array<Runner> = await Promise.all(participants.map(async (runner: Participant): Promise<Runner> =>  {
                try {
                    const runnerId = await getRunnersId({
                        firstName: runner.firstName,
                        lastName: runner.lastName,
                    }, { url: 'http://localhost:3000/itra' });

                    if (runnerId) {
                        const itraScore = await getItraScore({
                            firstName: runner.firstName,
                            lastName: runner.lastName,
                            runnerId: runnerId,
                        }, { url: 'http://localhost:3000/itra' });
                        return {     
                            firstName: runner.firstName,
                            lastName: runner.lastName,
                            runnerId: runnerId,
                            itraScore,
                            url: `https://itra.run/RunnerSpace/${runner.lastName}.${runner.firstName}/${runnerId}`,
                        }
                    }

                } catch (err) {
                    console.error(err);
                }

                return {
                    firstName: runner.firstName,
                    lastName: runner.lastName,
                    runnerId: `${runner.firstName}.${runner.lastName}`,
                    itraScore: Number(-1),
                    url: ""
                }
            }))
            itraRunners.sort((a, b) => b.itraScore - a.itraScore);

            setRunners(itraRunners);
        }
        fetchRunners().catch((err) => {
            console.error(err);
        })

    }, []);
    return (
        <ul>  
            {runners.map((runner) => (
                <li key={runner.runnerId}> {runner.firstName} {runner.lastName} / <a href={runner.url} target="_top">{runner.itraScore}</a></li>
            ))}

        </ul>
    );
}
