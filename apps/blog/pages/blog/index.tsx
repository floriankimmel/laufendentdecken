import React from 'react'
import { Stack } from '@mui/material'

import { Episode } from '../../components/episodes'
import { useFetchEpisodes } from '../../hooks/useFetchEpisodes'

export default function App() {
    const episodes = useFetchEpisodes()

    return (
        <Stack sx={{ width: '100%' }}>
            <Stack sx={{ width: '700px', margin: '0 auto' }}>
                <Stack justifyContent="space-between" direction="column" gap={4}>
                    {episodes.map((item: Episode) => (<Episode episode={item} key={item.id}/>))}
                </Stack>
            </Stack>
        </Stack>
    )
}
