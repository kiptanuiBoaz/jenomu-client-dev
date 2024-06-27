import { Box, LinearProgress } from '@mui/material'

const LoadingScreen = () => {
    return (
        <Box sx={{ padding: "20%", marginX: "auto" }}>
            <LinearProgress color="primary" />;
        </Box>
    )
}

export default LoadingScreen