import React from 'react'

import { Episode, useFetchEpisodes } from '../../components/episodes';
import { Stack } from '@mui/material';

export default function App() {
    const episodes = useFetchEpisodes();

    return (
        <Stack
            sx={{
                width: '100%',
            }}  
        >
            <Stack
                sx={{
                    width: '700px',
                    margin: '0 auto',
                }}
            >
                <Stack justifyContent="space-between" direction="column" gap={4}>
                    {episodes.map((item) => (
                        <Episode episode={item} key={item.id} />
                    ))}
                </Stack>
            </Stack>
        </Stack>
    )
}
