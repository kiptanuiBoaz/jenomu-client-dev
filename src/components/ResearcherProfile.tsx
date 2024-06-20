import { Box, Avatar, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { HOST_API_KEY } from '../config-global';
import EditProfileModal from './EditProfileModal';

const ResearcherProfile = ({ user: userInfo }: any) => {
    const { user, profile } = userInfo;
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ backgroundColor: "#fff" }} p={2}>
            <Avatar
                alt={user.first_name}
                src={`${HOST_API_KEY}${profile.image}`}
                sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h6">{user.first_name} {user.last_name}</Typography>
            <Typography variant="body2">{user.email}</Typography>
            <Typography variant="body2">{user.phone_number}</Typography>
            <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mt: 2 }}>
                Edit Profile
            </Button>
            <EditProfileModal open={open} handleClose={handleClose} userInfo={userInfo} />
        </Box>
    );
};

export default ResearcherProfile;
