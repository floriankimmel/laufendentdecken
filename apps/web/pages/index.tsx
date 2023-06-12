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
    const [loading, setLoading] = React.useState<boolean>(false);
    const [participants, setParticipants] = React.useState<Participant[]>([]);

    React.useEffect(() => {
        if (!loading) {
            setLoading(true)
        }   
    }, [])

    React.useEffect(() => {
        if (loading) {
            getParticipants({
                url : 'https://my2.raceresult.com/195185/RRPublish/data/list?key=27218262242b8799b75f46b6b98c5780&listname=TEILNEHMERLISTE%20WEBSITE%7CTNL%20123%20-%2001%20Gesamt&page=participants&contest=0&r=all&l=0',
                race: '#2_SUPER TRAIL (34 km)'
            }).then((participants) => {
                    setParticipants(participants)
                    participants.map(async (runner: Participant) => {
                        try {
                            const runnerId = await getRunnersId({
                                firstName: runner.firstName,
                                lastName: runner.lastName,
                            }, { url: 'http://localhost:3000/itra' });
                            console.log(`${runner.firstName} ${runner.lastName} with id: ${runnerId}`)

                            const itraScore = runnerId ? await getItraScore({
                                firstName: runner.firstName,
                                lastName: runner.lastName,
                                runnerId: runnerId,
                            }, { url: 'http://localhost:3000/itra' }) : -1;
                            console.log(`${runner.firstName} ${runner.lastName} with score: ${itraScore}`)

                            const newRunner: Runner = {     
                                firstName: runner.firstName,
                                lastName: runner.lastName,
                                runnerId: runnerId ? runnerId : Math.floor(Math.random() * 100001).toString(),
                                itraScore,
                                url: `https://itra.run/RunnerSpace/${runner.lastName}.${runner.firstName}/${runnerId}`,
                            }

                            setRunners((itraRunners) => itraRunners.concat(newRunner).sort((a, b) => b.itraScore - a.itraScore));
                        } catch (err) {
                            console.error(err);
                        }

                    })
                })
        }
    }, [loading])

    return (
        <div>
            <h2>Runners ({runners.length} / {participants.length}):</h2>
            <ul>
                {runners.map((runner) => (
                    <li key={runner.runnerId}> {runner.firstName} {runner.lastName} / <a href={runner.url} target="_top">{runner.itraScore}</a></li>
                ))}
            </ul>
        </div>
    );
}
