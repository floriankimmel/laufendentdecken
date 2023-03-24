import { Participant, Event } from './timenow.interfaces';

export const getParticipants = async (event: Event): Promise<Array<Participant>> => {
    const response = await fetch(event.url, {
        "method": "GET"
    });
    const {data, error} = await response.json()

    if (response.ok) {
        return Promise.all(data[event.race].map(async (participant: any) => {
            const firstName = participant[3]
            const lastName = participant[2]

            return {
                firstName,
                lastName,
            }
        }))
    } else console.log(error)
    return []
}
