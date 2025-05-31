import React from 'react';
import {
    Skeleton,
    Paper,
    Grid,
    Avatar,
    Box,
    Stack,
    Button,
} from '@mui/material';

export default function ProfileSkeleton() {
    return (
        <section className="vh-90" style={{ backgroundColor: '#ffffff' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, width: '100%' }}>
                    <Grid container spacing={2}>
                        {/* Avatar Skeleton */}
                        <Grid item xs={12} sm={4} container justifyContent="center">
                            <Skeleton variant="circular" width={80} height={80} />
                        </Grid>

                        {/* Profile Details Skeleton */}
                        <Grid item xs={12} sm={8}>
                            <Skeleton variant="text" width="50%" height={32} />

                            <Grid container spacing={1} sx={{ mt: 2 }}>
                                {[...Array(4)].map((_, i) => (
                                    <Grid item xs={12} key={i}>
                                        <Skeleton variant="text" width="30%" height={20} />
                                        <Skeleton variant="text" width="100%" height={25} />
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Buttons Skeleton */}
                            <Stack spacing={2} direction="row" sx={{ mt: 3 }}>
                                <Skeleton variant="rectangular" width={100} height={36} />
                                <Skeleton variant="rectangular" width={100} height={36} />
                            </Stack>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </section>
    );
}
