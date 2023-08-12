import { useEffect, useState } from 'react'
import React from "react"
import axios from 'axios'
import he from 'he' 
import { Img } from 'react-image'

import './episodes.module.css'
import { Box, Divider, Stack, Typography } from '@mui/material';

interface Props {
    episode: Episode
}
export function Episode({ episode } : Props) {
    const [featureMedia, setFeatureMedia] = useState<string>('');

    const getImage = () => {
        axios
            .get(episode.featureMedia)
            .then((response) => {
                setFeatureMedia(response.data.source_url)
            });
    };

    useEffect(() => {
        getImage()
    })

    return (
        <>
            <Stack justifyContent="space-between" direction="row" gap={2}>
                <Stack justifyContent="flex-start" direction="column" width={500} gap={2}>
                    <Typography component="h1" variant='h5'>
                        {he.decode(episode.title)}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {episode.excerpt}
                    </Typography>
                </Stack>
                <Box 
                    justifyContent="center" 
                    display="flex" 
                    alignItems="center"
                    sx={{
                        height: 230,
                        width: 230,
                    }}
                >
                    {featureMedia && <Img 
                        src={featureMedia} 
                        alt={episode.title} 
                        style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                        }}
                    /> 
                    }
                </Box>
            </Stack>
            <Divider />
        </>
    );
}
