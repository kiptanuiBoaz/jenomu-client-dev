import { Box, Typography, Button } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { resetFilterFields } from '../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

const NoJobFound = () => {
    const dispatch = useDispatch();
    return (
        <Box>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                p={3}
            >
                <SearchOffIcon color="error" style={{ fontSize: 80 }} />
                <Typography variant="h5" gutterBottom>
                    No Results Found
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    We couldn't find any results matching your search. Please try again with different keywords.
                </Typography>
                <Button variant="contained" color="primary" onClick={() => dispatch(resetFilterFields())}>
                    Clear filter
                </Button>
            </Box>
        </Box>
    )
}

export default NoJobFound