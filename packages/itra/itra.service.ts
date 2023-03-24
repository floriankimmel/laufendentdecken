import { ItraRunner } from './itra.interfaces';
import axios, {AxiosHeaders, RawAxiosRequestHeaders} from 'axios';
import * as cheerio from 'cheerio';

export const getItraScore = async (itraRunner: ItraRunner, options: { url: string, header?: RawAxiosRequestHeaders }): Promise<number> => {
    const response = await axios(`${options.url}/RunnerSpace/${itraRunner.lastName}.${itraRunner.firstName}/${itraRunner.runnerId}`, {
        method: 'GET',
        headers: {
            "upgrade-insecure-requests": "1",
            "authority": "itra.run",
            "accept": "*/*",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            ...options.header
        },
    })
    if (response.status == 200) {
        const $ = cheerio.load(response.data);
        const itraScore = $('span.bg-dark').text().replace('Performance Index | ', '')
        return Number(itraScore)
    }

    return -1
}

export const getRunnersId = async (itraRunner: ItraRunner, options: { url: string, header?: RawAxiosRequestHeaders }): Promise<string> => {
    axios.defaults.withCredentials = true;

    const body = new URLSearchParams({
            'name': `${itraRunner.firstName} ${itraRunner.lastName}`,
            'start': '1',
            'count': '1',
            echoToken: Math.random().toString()
        }).toString()

    const response = await axios(`${options.url}/api/runner/find`, {
        method: 'POST',
        headers: {
            "upgrade-insecure-requests": "1",
            "authority": "itra.run",
            "accept": "*/*",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            ...options.header
        },
        data: body,
    });
    const data = await response.data

    if (response.status == 200) {
        const results = data.results
        if (results.length == 1) {
            return data.results[0].runnerId.toString()
        }
    }
    return ''
}
