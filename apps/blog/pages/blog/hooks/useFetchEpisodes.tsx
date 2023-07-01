import { useEffect, useState } from 'react'
import axios from 'axios'

export const useFetchEpisodes = () => {
    const [episodes, setEpisodes] = useState<Array<Episode>>([]);

    const fetchEpisodes = () => {
        axios
            .get("https://laufendentdecken-podcast.at/wp-json/wp/v2/episodes")
            .then((res) => {
                setEpisodes(res.data.map((item: any) => {
                    return {
                        id: item.id,
                        title: item.title.rendered,
                        excerpt: item.yoast_head_json.og_description,
                        featureMedia: item._links["wp:featuredmedia"][0]?.href,
                    }
                }))
            });
    }


    useEffect(() => {
        fetchEpisodes()
    }, [])

    return episodes
}
