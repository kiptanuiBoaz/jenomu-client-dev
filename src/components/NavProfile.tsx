import { useState } from 'react';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Box, IconButton, Menu, MenuItem, DialogContent, Avatar, Typography } from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

interface User {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
}

interface NavProfileProps {
    user: User;
}

const NavProfile = ({ user }: NavProfileProps) => {
    const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
    const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
    const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

    const dispatch = useDispatch();

    const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
        setNotificationsAnchor(event.currentTarget);
    };

    const handleNotificationsClose = () => {
        setNotificationsAnchor(null);
    };

    const handleProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
        setProfileAnchor(event.currentTarget);
    };

    const handleProfileClose = () => {
        setProfileAnchor(null);
    };

    const openProfileDialog = () => {
        setIsProfileDialogOpen(true);
        setProfileAnchor(null); // Close the profile menu when dialog opens
    };

    const closeProfileDialog = () => {
        setIsProfileDialogOpen(false);
    };

    return (
        <Box>
            {/* Notifications Button */}
            <IconButton edge="end" aria-label="notifications" onClick={handleNotificationsOpen}>
                <NotificationsNoneOutlinedIcon fontSize="large" sx={{ width: 30, height: 30, color: "#fff" }} />
            </IconButton>
            <Menu anchorEl={notificationsAnchor} open={Boolean(notificationsAnchor)} onClose={handleNotificationsClose}>
                <MenuItem>
                    Notification 1
                    <TrendingFlatIcon fontSize="small" />
                </MenuItem>
                <MenuItem>
                    Notification 2
                    <TrendingFlatIcon fontSize="small" />
                </MenuItem>
                <MenuItem>
                    Notification 3
                    <TrendingFlatIcon fontSize="small" />
                </MenuItem>
            </Menu>

            {/* Profile Button */}
            <IconButton edge="end" aria-label="profile" onClick={handleProfileOpen}>
                <Avatar src={user.avatar} sx={{ width: 30, height: 30 }} />
            </IconButton>
            <Menu anchorEl={profileAnchor} open={Boolean(profileAnchor)} onClose={handleProfileClose}>
                <DialogContent>
                    <Box sx={{ flexDirection: "column", display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Avatar src={user.avatar} sx={{ width: 100, height: 100 }} />
                        <Box sx={{ justifyContent: "center" }}>
                            <Typography textAlign={"center"} variant="subtitle1">
                                {user.first_name} {user.last_name}
                            </Typography>
                            <Typography textAlign={"center"} variant="body2" color="textSecondary">
                                {user.email}
                            </Typography>
                        </Box>
                    </Box>
                    <MenuItem onClick={closeProfileDialog}>
                        <SettingsIcon fontSize="small" sx={{ marginRight: 2 }} />
                        Settings
                    </MenuItem>
                    <MenuItem onClick={closeProfileDialog}>
                        <EditIcon fontSize="small" sx={{ marginRight: 2 }} />
                        Edit Profile
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(logout())}>
                        <LogoutIcon fontSize="small" sx={{ marginRight: 2 }} />
                        Log Out
                    </MenuItem>
                </DialogContent>
            </Menu>
        </Box>
    );
};

export default NavProfile;
